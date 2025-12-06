// lib/airtable.ts

export type RefinanceFactFindRecord = {
  email: string;
  preferredName?: string | null;
  goal?: string | null;
  currentLoanBalance: number;
  currentMonthlyRepayments?: number | null;
  currentInterestRatePercent: number;
  remainingTermYears: number;
  propertyValue?: number | null;
  ownerOrInvestor?: "OO" | "INV" | null;
  loanType?: "P&I" | "IO" | null;
  currentLender?: string | null;
  source?: string | null;
};

export type RefinanceFactFindStored = {
  recordId: string;
  email: string;
  currentLoanBalance: number;
  currentInterestRatePercent: number;
  remainingTermYears: number;
  propertyValue?: number | null;
  ownerOrInvestor?: "OO" | "INV" | null;
  loanType?: "P&I" | "IO" | null;
  currentMonthlyFromForm?: number | null;
};

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_REFI_TABLE_NAME =
  process.env.AIRTABLE_REFI_TABLE_NAME || "Refinance";

function airtableConfigured() {
  return !!(AIRTABLE_API_TOKEN && AIRTABLE_BASE_ID && AIRTABLE_REFI_TABLE_NAME);
}

// Debug on server start
console.log("=== Airtable ENV DEBUG ===");
console.log("AIRTABLE_API_TOKEN:", AIRTABLE_API_TOKEN ? "LOADED" : "MISSING");
console.log("AIRTABLE_BASE_ID:", AIRTABLE_BASE_ID);
console.log("AIRTABLE_REFI_TABLE_NAME:", AIRTABLE_REFI_TABLE_NAME);
console.log("==========================");

/* -------------------------------------------------------------------------- */
/*                               CREATE RECORD                                */
/* -------------------------------------------------------------------------- */

export async function createRefinanceFactFindRecord(
  data: RefinanceFactFindRecord
): Promise<void> {
  if (!airtableConfigured()) {
    console.warn("[Airtable] Not configured — skipping createRefinanceFactFindRecord");
    return;
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
    AIRTABLE_REFI_TABLE_NAME!
  )}`;

  const fields: Record<string, any> = {
    Email: data.email,
    "Preferred Name": data.preferredName || "",
    "Current Loan Balance": data.currentLoanBalance,
    "Current Interest Rate %": data.currentInterestRatePercent,
    "Remaining Term (years)": data.remainingTermYears,
  };

  if (data.propertyValue != null) {
    fields["Property Value"] = data.propertyValue;
  }

  if (data.ownerOrInvestor) {
    fields["Owner / Investor"] = data.ownerOrInvestor;
  }

  if (data.loanType) {
    fields["Loan Types"] = data.loanType;
  }

  if (data.currentLender) {
    fields["Current Lender"] = data.currentLender;
  }

  if (data.source) {
    fields["Source"] = data.source;
  }

  if (data.currentMonthlyRepayments != null) {
    fields["Current Monthly (form)"] = data.currentMonthlyRepayments;
  }

  console.log("[Airtable] Creating record in Refinance", fields);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records: [{ fields }] }),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("[Airtable] Failed to create record", res.status, text);
    } else {
      console.log("[Airtable] Record created OK", text);
    }
  } catch (err) {
    console.error("[Airtable] Network error creating record", err);
    // Swallow error — don’t break user flow
  }
}

/* -------------------------------------------------------------------------- */
/*                                 READ RECORD                                */
/* -------------------------------------------------------------------------- */

export async function getRefinanceFactFindByEmail(
  email: string
): Promise<RefinanceFactFindStored | null> {
  if (!airtableConfigured()) {
    console.warn("[Airtable] Not configured — skipping getRefinanceFactFindByEmail");
    return null;
  }

  const filter = `{Email} = "${email.replace(/"/g, '\\"')}"`;

  const url =
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_REFI_TABLE_NAME!
    )}` +
    `?maxRecords=1&filterByFormula=${encodeURIComponent(filter)}`;

  console.log("[Airtable] Fetching by email from Refinance", email);

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const json = await res.json().catch(() => ({} as any));

    if (!res.ok) {
      console.error("[Airtable] Failed to fetch record", res.status, json);
      return null;
    }

    const record = json.records?.[0];
    if (!record) {
      console.log("[Airtable] No record found for email", email);
      return null;
    }

    const f = record.fields || {};

    return {
      recordId: record.id,
      email: String(f.Email || "").toLowerCase(),
      currentLoanBalance: Number(f["Current Loan Balance"] || 0),
      currentInterestRatePercent: Number(f["Current Interest Rate %"] || 0),
      remainingTermYears: Number(f["Remaining Term (years)"] || 30),
      propertyValue:
        f["Property Value"] != null ? Number(f["Property Value"]) : null,
      ownerOrInvestor:
        (f["Owner / Investor"] as "OO" | "INV" | undefined) || null,
      loanType: (f["Loan Types"] as "P&I" | "IO" | undefined) || null,
      currentMonthlyFromForm:
        f["Current Monthly (form)"] != null
          ? Number(f["Current Monthly (form)"])
          : null,
    };
  } catch (err) {
    console.error("[Airtable] Network error fetching record", err);
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                         UPDATE OPTION A/B/C LENDERS                        */
/* -------------------------------------------------------------------------- */

export async function updateRefinanceOptionLenders(input: {
  recordId: string;
  optionALenderName: string;
  optionBLenderName: string;
  optionCLenderName: string;
}) {
  if (!airtableConfigured()) return;

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
    AIRTABLE_REFI_TABLE_NAME!
  )}/${input.recordId}`;

  const fields: Record<string, any> = {
    "Option A Lender": input.optionALenderName,
    "Option B Lender": input.optionBLenderName,
    "Option C Lender": input.optionCLenderName,
  };

  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("[Airtable] Failed to update option lenders", res.status, text);
    } else {
      console.log("[Airtable] Updated option lenders", text);
    }
  } catch (err) {
    console.error("[Airtable] Network error updating option lenders", err);
  }
}
