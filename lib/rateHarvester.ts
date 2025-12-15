// lib/rateHarvester.ts
import crypto from "crypto";
import { prisma } from "./prisma";
import type {
  RawProductIndexItem,
  RawProductDetail,
  NormalisedProduct,
  RateTier,
} from "./rateTypes";

type RegisterSource = {
  id: string;
  name: string;
  type: "cdr-products";
  // Base for the data holder, eg: https://api.cdr-api.amp.com.au
  baseUrl: string;

  // How you want this lender represented in your DB
  brandCode: string;
  brandName: string;

  // optional: narrow the products list
  productCategory?: string; // e.g. "RESIDENTIAL_MORTGAGES"
};

const SOURCES: RegisterSource[] = [
  {
    id: "amp_myamp",
    name: "AMP - My AMP",
    type: "cdr-products",
    baseUrl: "https://api.cdr-api.amp.com.au",
    brandCode: "AMP_MYAMP",
    brandName: "AMP - My AMP",
    productCategory: "RESIDENTIAL_MORTGAGES",
  },
];

function sha256(input: unknown): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(input))
    .digest("hex");
}

// CDR endpoint versioning differs by endpoint.
// Get Products: v3
// Get Product Detail: v4
function inferCdrXV(url: string): string {
  // crude but effective: if it ends with /products/{id} then it's detail
  const isDetail = /\/banking\/products\/[^/?#]+/.test(url);
  return isDetail ? "4" : "3";
}

async function fetchJson<T>(
  url: string,
  source: RegisterSource,
): Promise<T> {
  const xV = inferCdrXV(url);

  const headers: Record<string, string> = {
    Accept: "application/json",
    "x-v": xV,
    // Safe floor. Data holder should respond with highest supported between x-min-v and x-v.
    "x-min-v": "1",
  };

  const res = await fetch(url, { headers });

  if (!res.ok) {
    let bodyText = "";
    try {
      bodyText = await res.text();
    } catch {
      // ignore
    }

    console.error(
      `${source.id} fetch error ${res.status} ${res.statusText} (x-v=${xV}): ${bodyText}`,
    );

    throw new Error(
      `Failed to fetch ${url} for ${source.id}: ${res.status} ${res.statusText}`,
    );
  }

  return (await res.json()) as T;
}

async function fetchProductIndex(
  source: RegisterSource,
): Promise<RawProductIndexItem[]> {
  // CDR “Get Products”
  const url = new URL(`${source.baseUrl}/cds-au/v1/banking/products`);
  if (source.productCategory) {
    url.searchParams.set("product-category", source.productCategory);
  }
  // optional: larger page size to reduce paging pain
  url.searchParams.set("page-size", "1000");

  type CdrProductsResponse = {
    data?: {
      products?: Array<{
        productId: string;
        lastUpdated?: string;
        name?: string;
        brand?: string;
      }>;
    };
    links?: { next?: string | null };
  };

  const out: RawProductIndexItem[] = [];
  let nextUrl: string | null = url.toString();

  while (nextUrl) {
    const json = await fetchJson<CdrProductsResponse>(nextUrl, source);

    const products = json.data?.products ?? [];
    for (const p of products) {
      if (!p?.productId) continue;

      out.push({
        brandCode: source.brandCode,
        brandName: source.brandName,
        productExternalId: p.productId,
        prdUrl: `${source.baseUrl}/cds-au/v1/banking/products/${encodeURIComponent(p.productId)}`,
        lastModified: p.lastUpdated ?? null,
      });
    }

    nextUrl = json.links?.next ?? null;
  }

  return out;
}

async function upsertProductIndexAndFindChanges(
  items: RawProductIndexItem[],
): Promise<RawProductIndexItem[]> {
  const toRefresh: RawProductIndexItem[] = [];

  for (const item of items) {
    const hash = sha256(item);

    // IMPORTANT:
    // Your schema compound unique name might differ.
    // Replace this `where` with whatever Prisma generated in your schema.
    //
    // Common pattern is: brandCode_productExternalId OR brand_product_external_unique
    //
    // We’ll do a safer lookup using findFirst to avoid name mismatch.
    const existing = await prisma.productIndex.findFirst({
      where: {
        brandCode: item.brandCode,
        productExternalId: item.productExternalId,
      },
      orderBy: { lastSeenAt: "desc" },
    });

    // Upsert brand (simple)
    await prisma.brand.upsert({
      where: { code: item.brandCode },
      create: {
        code: item.brandCode,
        name: item.brandName,
        sourceType: "api",
        status: "active",
      },
      update: { name: item.brandName },
    });

    if (!existing || existing.lastHash !== hash) {
      // Upsert index entry (again: avoid compound unique name surprises)
      if (existing) {
        await prisma.productIndex.update({
          where: { id: existing.id },
          data: {
            brandName: item.brandName,
            prdUrl: item.prdUrl,
            lastModified: item.lastModified,
            lastHash: hash,
            lastSeenAt: new Date(),
          },
        });
      } else {
        await prisma.productIndex.create({
          data: {
            brandCode: item.brandCode,
            brandName: item.brandName,
            productExternalId: item.productExternalId,
            prdUrl: item.prdUrl,
            lastModified: item.lastModified,
            lastHash: hash,
            lastSeenAt: new Date(),
          },
        });
      }

      toRefresh.push(item);
    } else {
      await prisma.productIndex.update({
        where: { id: existing.id },
        data: { lastSeenAt: new Date() },
      });
    }
  }

  return toRefresh;
}

async function fetchProductDetail(
  source: RegisterSource,
  item: RawProductIndexItem,
): Promise<RawProductDetail> {
  // CDR “Get Product Detail”
  type CdrProductDetailResponse = {
    data?: any;
  };

  const json = await fetchJson<CdrProductDetailResponse>(item.prdUrl, source);
  const data = json.data ?? {};

  // Shape it into your internal RawProductDetail
  const detail: RawProductDetail = {
    brandCode: item.brandCode,
    productExternalId: item.productExternalId,
    name: data?.name ?? item.productExternalId,
    source: source.id,
    fetchedAt: new Date().toISOString(),

    // Keep the raw payload bits you care about
    // (this is intentionally permissive)
    rates:
      data?.lendingRates ??
      data?.rates ??
      data?.depositRates ??
      [],
    raw: data,
  } as any;

  return detail;
}

async function storeRawProduct(detail: RawProductDetail): Promise<boolean> {
  const payloadHash = sha256(detail);

  const existing = await prisma.rawProduct.findFirst({
    where: {
      brandCode: detail.brandCode,
      productExternalId: detail.productExternalId,
    },
    orderBy: { fetchedAt: "desc" },
  });

  if (existing && existing.hash === payloadHash) return false;

  await prisma.rawProduct.create({
    data: {
      brandCode: detail.brandCode,
      productExternalId: detail.productExternalId,
      source: detail.source,
      payload: detail as unknown as any,
      hash: payloadHash,
    },
  });

  return true;
}

function parseRateTiers(detail: RawProductDetail): RateTier[] {
  const raw = (detail as any)?.raw ?? {};
  const lendingRates = Array.isArray(raw?.lendingRates) ? raw.lendingRates : [];
  const fallbackRates = Array.isArray((detail as any)?.rates) ? (detail as any).rates : [];

  const arr = lendingRates.length ? lendingRates : fallbackRates;

  // Extremely “v1” parser: just try to capture an annual rate where possible.
  // CDR lendingRates objects vary; we defensively scan.
  const tiers: RateTier[] = arr
    .map((r: any) => {
      const annualRate =
        r?.rate != null ? Number(r.rate) :
        r?.annualRate != null ? Number(r.annualRate) :
        r?.value != null ? Number(r.value) :
        null;

      if (annualRate == null || !isFinite(annualRate)) return null;

      const rateType =
        (r?.rateType ?? r?.lendingRateType ?? "VARIABLE") as RateTier["rateType"];

      return {
        lvrMax: 0.8,
        rateType,
        annualRate,
        comparisonRate:
          r?.comparisonRate != null ? Number(r.comparisonRate) : undefined,
        fixedTermMonths:
          r?.fixedTerm != null ? Number(r.fixedTerm) :
          r?.fixedTermMonths != null ? Number(r.fixedTermMonths) :
          undefined,
        revertAnnualRate:
          r?.revertRate != null ? Number(r.revertRate) :
          r?.revertAnnualRate != null ? Number(r.revertAnnualRate) :
          undefined,
      } as RateTier;
    })
    .filter(Boolean) as RateTier[];

  return tiers;
}

function normaliseProduct(detail: RawProductDetail): NormalisedProduct {
  const nowIso = new Date().toISOString();

  return {
    brandCode: detail.brandCode,
    productExternalId: detail.productExternalId,
    name: detail.name ?? detail.productExternalId,
    channel: "BROKER",
    purpose: ["PURCHASE", "REFINANCE"],
    ownerTypes: ["OO", "INV"],
    repaymentTypes: ["P&I"],
    tiers: parseRateTiers(detail),
    meta: {
      source: detail.source,
      lastFetchedAt: (detail as any).fetchedAt ?? nowIso,
    },
  };
}

async function upsertNormalisedProduct(
  normalised: NormalisedProduct,
): Promise<void> {
  const brand = await prisma.brand.findUnique({
    where: { code: normalised.brandCode },
  });

  if (!brand) {
    throw new Error(`Brand ${normalised.brandCode} not found`);
  }

  const existing = await prisma.product.findFirst({
    where: {
      brandId: brand.id,
      externalId: normalised.productExternalId,
    },
  });

  const purposeStr = normalised.purpose.join(",");
  const ownerTypesStr = normalised.ownerTypes.join(",");
  const repaymentTypesStr = normalised.repaymentTypes.join(",");

  const product = existing
    ? await prisma.product.update({
        where: { id: existing.id },
        data: {
          name: normalised.name,
          channel: normalised.channel,
          purpose: purposeStr,
          ownerTypes: ownerTypesStr,
          repaymentTypes: repaymentTypesStr,
          isActive: true,
        },
      })
    : await prisma.product.create({
        data: {
          brandId: brand.id,
          externalId: normalised.productExternalId,
          name: normalised.name,
          channel: normalised.channel,
          purpose: purposeStr,
          ownerTypes: ownerTypesStr,
          repaymentTypes: repaymentTypesStr,
          isActive: true,
        },
      });

  // Close existing “live” rates
  await prisma.productRate.updateMany({
    where: { productId: product.id, effectiveTo: null },
    data: { effectiveTo: new Date() },
  });

  // Insert fresh tiers (if we have any)
  for (const tier of normalised.tiers) {
    await prisma.productRate.create({
      data: {
        productId: product.id,
        lvrMax: tier.lvrMax,
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

export async function runRatesHarvest(opts?: {
  forceRefresh?: boolean;
}): Promise<void> {
  const forceRefresh = opts?.forceRefresh === true;

  for (const source of SOURCES) {
    try {
      console.log(`Starting harvest for source ${source.id} (${source.name})`);

      const indexItems = await fetchProductIndex(source);
      console.log(`Fetched ${indexItems.length} index items`);

      const toRefresh = forceRefresh
        ? indexItems
        : await upsertProductIndexAndFindChanges(indexItems);

      console.log(`${toRefresh.length} products need PRD refresh`);

      const concurrency = 5;
      let i = 0;

      while (i < toRefresh.length) {
        const batch = toRefresh.slice(i, i + concurrency);
        i += concurrency;

        await Promise.all(
          batch.map(async (item) => {
            try {
              const detail = await fetchProductDetail(source, item);
              const changed = await storeRawProduct(detail);
              if (!changed && !forceRefresh) return;

              const normalised = normaliseProduct(detail);
              await upsertNormalisedProduct(normalised);

              console.log(
                `Updated product ${normalised.brandCode}/${normalised.productExternalId} (tiers=${normalised.tiers.length})`,
              );
            } catch (err) {
              console.error("Error processing item", item, err);
            }
          }),
        );
      }
    } catch (err) {
      console.error(`Harvest failed for source ${source.id}`, err);
    }
  }

  console.log("Rates harvest completed");
}
