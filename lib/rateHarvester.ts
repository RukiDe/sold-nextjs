// lib/rateHarvester.ts
import "server-only";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export type RawProductIndexItem = {
  brandCode: string;
  brandName: string;
  productExternalId: string;
  prdUrl: string;
  lastModified?: string | undefined;
};

export type RawProductDetail = {
  brandCode: string;
  productExternalId: string;
  name: string;
  source: string;
  fetchedAt: string;
  type: string;
  raw: unknown;
  rates: unknown[];
};

export type RateTier = {
  lvrMax?: number;
  rateType: string;
  annualRate: number;
  comparisonRate?: number;
  fixedTermMonths?: number;
  revertAnnualRate?: number;
};

export type NormalisedProduct = {
  brandCode: string;
  productExternalId: string;
  name: string;
  channel: string;
  purpose: string[];
  ownerTypes: string[];
  repaymentTypes: string[];
  tiers: RateTier[];
  meta: Record<string, unknown>;
};

/* ------------------------------------------------------------------ */
/* Source registry                                                     */
/* ------------------------------------------------------------------ */

type RegisterSource = {
  id: string;
  name: string;
  baseUrl: string;
  brandCode: string;
  brandName: string;
  productCategory?: string;
};

const SOURCES: RegisterSource[] = [
  {
    id: "amp_myamp",
    name: "AMP - My AMP",
    baseUrl: "https://api.cdr-api.amp.com.au",
    brandCode: "AMP_MYAMP",
    brandName: "AMP - My AMP",
    productCategory: "RESIDENTIAL_MORTGAGES",
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function sha256(input: unknown): string {
  return crypto.createHash("sha256").update(JSON.stringify(input)).digest("hex");
}

// v3 for list, v4 for detail (AMP behaves like this)
function inferCdrXV(url: string): string {
  // match /banking/products/{id} with optional querystring
  const isDetail = /\/banking\/products\/[^/?#]+/.test(url);
  return isDetail ? "4" : "3";
}

async function fetchJson<T>(url: string, source: RegisterSource): Promise<T> {
  const xV = inferCdrXV(url);

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-v": xV,
      "x-min-v": "1",
    },
    // (optional) CDR endpoints can be slow-ish; leaving default is fine
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`${source.id} ${res.status} ${res.statusText} (x-v=${xV})`, body);
    throw new Error(`Failed to fetch ${url} (${res.status} ${res.statusText})`);
  }

  return (await res.json()) as T;
}

/* ------------------------------------------------------------------ */
/* Index fetch                                                        */
/* ------------------------------------------------------------------ */

async function fetchProductIndex(source: RegisterSource): Promise<RawProductIndexItem[]> {
  const url = new URL(`${source.baseUrl}/cds-au/v1/banking/products`);
  if (source.productCategory) {
    url.searchParams.set("product-category", source.productCategory);
  }
  url.searchParams.set("page-size", "1000");

  type Resp = {
    data?: {
      products?: {
        productId: string;
        lastUpdated?: string;
      }[];
    };
    links?: { next?: string | null };
  };

  const items: RawProductIndexItem[] = [];
  let next: string | null | undefined = url.toString();

  while (next) {
    const json: Resp = await fetchJson<Resp>(next, source);

    for (const p of json.data?.products ?? []) {
      if (!p?.productId) continue;

      const productId = p.productId;

      items.push({
        brandCode: source.brandCode,
        brandName: source.brandName,
        productExternalId: productId,
        prdUrl: `${source.baseUrl}/cds-au/v1/banking/products/${encodeURIComponent(productId)}`,
        lastModified: p.lastUpdated ?? undefined,
      });
    }

    next = json.links?.next ?? null;
  }

  return items;
}

/* ------------------------------------------------------------------ */
/* Product detail                                                     */
/* ------------------------------------------------------------------ */

async function fetchProductDetail(
  source: RegisterSource,
  item: RawProductIndexItem,
): Promise<RawProductDetail> {
  const resp = await fetchJson<{ data?: any }>(item.prdUrl, source);
  const data = resp.data ?? {};

  return {
    brandCode: item.brandCode,
    productExternalId: item.productExternalId,
    name: data?.name ?? item.productExternalId,
    source: source.id,
    fetchedAt: new Date().toISOString(),
    type: "RESIDENTIAL_MORTGAGE",
    raw: data,
    rates: data?.lendingRates ?? data?.rates ?? data?.depositRates ?? [],
  };
}

/* ------------------------------------------------------------------ */
/* Parsing                                                            */
/* ------------------------------------------------------------------ */

function parseRateTiers(detail: RawProductDetail): RateTier[] {
  const raw: any = detail.raw;

  // AMP uses lendingRates for mortgages
  const arr = Array.isArray(raw?.lendingRates) ? raw.lendingRates : [];

  return arr
    .map((r: any) => {
      const rateCandidate = r?.rate ?? r?.annualRate ?? r?.value;
      const rate = Number(rateCandidate);
      if (!isFinite(rate)) return null;

      const fixedTermCandidate = r?.fixedTerm ?? r?.fixedTermMonths;
      const fixedTermMonths =
        fixedTermCandidate != null && fixedTermCandidate !== ""
          ? Number(fixedTermCandidate)
          : undefined;

      const comparisonCandidate = r?.comparisonRate;
      const comparisonRate =
        comparisonCandidate != null && comparisonCandidate !== ""
          ? Number(comparisonCandidate)
          : undefined;

      // NOTE: CDR payloads vary by bank; keep it permissive.
      const rateType = String(r?.lendingRateType ?? r?.rateType ?? "VARIABLE");

      // LVR isn’t always present in CDR product feeds.
      // We store a fallback so Prisma schema requirements are satisfied.
      const lvrMaxCandidate = r?.lvrMax ?? r?.maxLvr ?? r?.lvr;
      const lvrMax =
        lvrMaxCandidate != null && isFinite(Number(lvrMaxCandidate))
          ? Number(lvrMaxCandidate)
          : 1;

      return {
        lvrMax,
        rateType,
        annualRate: rate,
        comparisonRate,
        fixedTermMonths,
      } satisfies RateTier;
    })
    .filter(Boolean) as RateTier[];
}

/* ------------------------------------------------------------------ */
/* Normalisation                                                      */
/* ------------------------------------------------------------------ */

function normaliseProduct(detail: RawProductDetail): NormalisedProduct {
  return {
    brandCode: detail.brandCode,
    productExternalId: detail.productExternalId,
    name: detail.name,
    channel: "BROKER",
    purpose: ["PURCHASE", "REFINANCE"],
    ownerTypes: ["OO", "INV"],
    repaymentTypes: ["P&I"],
    tiers: parseRateTiers(detail),
    meta: {
      source: detail.source,
      fetchedAt: detail.fetchedAt,
      hash: sha256(detail.raw),
    },
  };
}

/* ------------------------------------------------------------------ */
/* Persistence                                                        */
/* ------------------------------------------------------------------ */

async function upsertNormalisedProduct(p: NormalisedProduct): Promise<void> {
  const brand = await prisma.brand.findUnique({
    where: { code: p.brandCode },
  });
  if (!brand) throw new Error(`Brand ${p.brandCode} missing`);

  const existing = await prisma.product.findFirst({
    where: { brandId: brand.id, externalId: p.productExternalId },
  });

  const product = existing
    ? await prisma.product.update({
        where: { id: existing.id },
        data: {
          name: p.name,
          channel: p.channel,
          purpose: p.purpose.join(","),
          ownerTypes: p.ownerTypes.join(","),
          repaymentTypes: p.repaymentTypes.join(","),
          isActive: true,
        },
      })
    : await prisma.product.create({
        data: {
          brandId: brand.id,
          externalId: p.productExternalId,
          name: p.name,
          channel: p.channel,
          purpose: p.purpose.join(","),
          ownerTypes: p.ownerTypes.join(","),
          repaymentTypes: p.repaymentTypes.join(","),
          isActive: true,
        },
      });

  // Close existing live rates
  await prisma.productRate.updateMany({
    where: { productId: product.id, effectiveTo: null },
    data: { effectiveTo: new Date() },
  });

  // Insert new tiers
  for (const tier of p.tiers) {
    await prisma.productRate.create({
      data: {
        productId: product.id,
        lvrMax: tier.lvrMax ?? 1, // required by schema
        rateType: tier.rateType,
        annualRate: tier.annualRate,
        comparisonRate: tier.comparisonRate ?? null,
        fixedTermMonths: tier.fixedTermMonths ?? null,
        revertAnnualRate: tier.revertAnnualRate ?? null,
        effectiveFrom: new Date(),
      },
    });
  }
}

/* ------------------------------------------------------------------ */
/* Orchestrator                                                       */
/* ------------------------------------------------------------------ */

export async function runRatesHarvest(opts?: { forceRefresh?: boolean }): Promise<void> {
  const force = opts?.forceRefresh === true;

  for (const source of SOURCES) {
    console.log(`Harvesting ${source.id} (${source.name})`);

    const index = await fetchProductIndex(source);

    // If you later re-add “rawProduct” hashing, you’ll use this:
    // - force: refresh all
    // - else: only refresh changed PRDs
    // For now: keep it simple and refresh all when force=1, otherwise refresh all too.
    // (Because AMP index lastUpdated can be unreliable across endpoints.)
    const toFetch = force ? index : index;

    for (const item of toFetch) {
      try {
        const detail = await fetchProductDetail(source, item);
        const normalised = normaliseProduct(detail);
        await upsertNormalisedProduct(normalised);
      } catch (e) {
        console.error("Product failed", item.productExternalId, e);
      }
    }
  }

  console.log("Rates harvest completed");
}
