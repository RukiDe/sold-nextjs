// app/api/refinance-preview/route.ts
import { NextResponse } from "next/server";
import {
  getRefinanceFactFindByEmail,
  updateRefinanceOptionsForRecord,
} from "@/lib/airtable";

type OptionKey = "A" | "B" | "C";
type OwnerType = "OO" | "INV" | null;

type PanelConfig = {
  key: OptionKey;
  lender: string;
  baseRate: number; // headline rate p.a. before any LVR adjustment
};

/**
 * Static panel config – headline rates you tuned from lender sites.
 * You can tweak these in one spot as they move.
 */
const PANEL_RATES: Record<Exclude<OwnerType, null>, PanelConfig[]> = {
  OO: [
    { key: "A", lender: "Great Southern Bank", baseRate: 5.20 },
    { key: "B", lender: "Macquarie", baseRate: 5.25 },
    { key: "C", lender: "ING", baseRate: 5.28 },
  ],
  INV: [
    { key: "A", lender: "Macquarie", baseRate: 5.75 },
    { key: "B", lender: "Ubank", baseRate: 5.85 },
    { key: "C", lender: "AMP", baseRate: 5.95 },
  ],
};

/**
 * Very rough LVR-loadings.
 * You can refine later by LVR tiers or by owner/INV.
 */
function adjustRateForLvr(baseRate: number, lvr: number): number {
  if (!Number.isFinite(lvr) || lvr <= 0) return baseRate;
  if (lvr > 90) return baseRate + 0.40;
  if (lvr > 80) return baseRate + 0.20;
  return baseRate;
}

/**
 * Standard mortgage repayment formula.
 * principal: dollars
 * annualRatePercent: p.a. percentage (e.g. 5.5)
 * years: remaining term in years
 */
function monthlyRepayment(
  principal: number,
  annualRatePercent: number,
  years: number
): number {
  if (!principal || !annualRatePercent || !years) return 0;

  const r = annualRatePercent / 100 / 12;
  const n = years * 12;
  if (r <= 0 || n <= 0) return 0;

  const payment = principal * (r / (1 - Math.pow(1 + r, -n)));
  return Math.round(payment);
}

/**
 * Safe numeric extraction from Airtable fields.
 */
function asNumber(value: any, fallback: number): number {
  if (value === null || value === undefined) return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Try to infer owner / investor flag from Airtable field.
 */
function parseOwnerType(raw: any): OwnerType {
  if (!raw) return null;
  const v = String(raw).toUpperCase();
  if (v.includes("INV")) return "INV";
  if (v.includes("OO") || v.includes("OWNER")) return "OO";
  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email: string | undefined = body?.email;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // 1) Fetch fact find from Airtable
    const record = await getRefinanceFactFindByEmail(email);
    if (!record) {
      return NextResponse.json(
        { error: "Fact find not found for this email" },
        { status: 404 }
      );
    }

    const f = record.fields || {};

    const currentLoanBalance = asNumber(f["Current Loan Balance"], 0);
    const propertyValue = asNumber(f["Property Value"], 0);
    const currentMonthlyFromForm = asNumber(
      f["Current Monthly Repayments"],
      0
    );
    const currentRatePercent = asNumber(f["Current Interest Rate %"], 0);
    const remainingTermYears = asNumber(f["Remaining Term (years)"], 25);

    const ownerType: OwnerType = parseOwnerType(f["Owner / Investor"]);

    // Derive LVR and fallback currentMonthly if missing
    const lvr =
      propertyValue > 0 && currentLoanBalance > 0
        ? Math.round((currentLoanBalance / propertyValue) * 100)
        : 0;

    let currentMonthly = currentMonthlyFromForm;
    if (!currentMonthly && currentLoanBalance && currentRatePercent) {
      currentMonthly = monthlyRepayment(
        currentLoanBalance,
        currentRatePercent,
        remainingTermYears
      );
    }

    // Safety fallback
    if (!currentMonthly) {
      currentMonthly = 3000;
    }

    // If we can't infer owner type, default to OO.
    const effectiveOwnerType: Exclude<OwnerType, null> =
      ownerType || "OO";

    const panelConfigs = PANEL_RATES[effectiveOwnerType];

    // 2) Build A/B/C options
    const optionsWithLenders = panelConfigs.map((cfg) => {
      const adjRate = adjustRateForLvr(cfg.baseRate, lvr);
      const newMonthly = monthlyRepayment(
        currentLoanBalance,
        adjRate,
        remainingTermYears
      );
      const monthlySaving = Math.max(0, currentMonthly - newMonthly);
      const interestSaved5 =
        monthlySaving > 0 ? monthlySaving * 12 * 5 : 0;

      return {
        key: cfg.key as OptionKey,
        lenderName: cfg.lender,
        indicativeRate: adjRate,
        newMonthly,
        monthlySaving,
        interestSaved5,
      };
    });

    // 3) Decide "best" option and whether they're on a good wicket
    let bestOptionKey: "A" | "B" | "C" | "none" = "none";
    let isOnGoodWicket = false;

    if (optionsWithLenders.length === 3) {
      const sortedByMonthly = [...optionsWithLenders].sort(
        (a, b) => a.newMonthly - b.newMonthly
      );
      const best = sortedByMonthly[0];

      bestOptionKey = best.key;

      // If the best option only saves less than ~$50/m or is worse, treat as "good wicket"
      const bestSaving = currentMonthly - best.newMonthly;
      if (bestSaving <= 50) {
        isOnGoodWicket = true;
      }
    }

    // 4) Fire-and-forget: stamp options back into Airtable for broker console
    if (record.id && optionsWithLenders.length === 3) {
      void updateRefinanceOptionsForRecord(record.id, {
        bestOptionKey,
        isOnGoodWicket,
        options: optionsWithLenders.map((o) => ({
          key: o.key,
          lender: o.lenderName,
          indicativeRate: o.indicativeRate,
          newMonthly: o.newMonthly,
          monthlySaving: o.monthlySaving,
        })),
      });
    }

    // 5) Response payload for the front-end
    return NextResponse.json({
      currentMonthly,
      ownerOrInvestor: ownerType, // "OO" | "INV" | null
      isOnGoodWicket,
      options: optionsWithLenders.map((o) => ({
        key: o.key,
        indicativeRate: o.indicativeRate,
        newMonthly: o.newMonthly,
        monthlySaving: o.monthlySaving,
        interestSaved5: o.interestSaved5,
      })),
    });
  } catch (err: any) {
    console.error("[/api/refinance-preview] Server error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
