// lib/airtable.ts

export type RefinanceFactFindRecord = {
  email: string;
  currentLoanBalance: number;
  currentInterestRatePercent: number;
  remainingTermYears: number;
  propertyValue?: number | null;
  purpose?: "OO" | "INV" | null;
  repaymentType?: "P&I" | "IO" | null;
  source?: string | null;
};

export type RefinanceFactFindStored = {
  email: string;
  currentLoanBalance: number;
  currentInterestRatePercent: number;
  remainingTermYears: number;
  propertyValue?: number | null;
  purpose?: "OO" | "INV" | null;
  repaymentType?: "P&I" | "IO" | null;
};

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_REFI_TABLE_NAME = process.env.AIRTABLE_REFI_TABLE_NAME;

if (!AIRTABLE_API_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_REFI_TABLE_NAME) {
  console.warn(
    "[Airtable] Missing env vars. Set AIRTABLE_API_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_REFI_TABLE_NAME."
  );
}

/**
 * 1) CREATE record (write fact find into Airtable)
 */
export async function createRefinanceFactFindRecord(
  data: RefinanceFactFindRecord
): Promise<void> {
  if (!AIRTABLE_API_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_REFI_TABLE_NAME) {
    return;
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
    AIRTABLE_REFI_TABLE_NAME
  )}`;

  const fields: Record<string, any> = {
    Email: data.email,
    "Current Loan Balance": data.currentLoanBalance,
    "Current Interest Rate %": data.currentInterestRatePercent,
    "Remaining Term (years)": data.remainingTermYears,
  };

  if (data.propertyValue != null) {
    fields["Property Value"] = data.propertyValue;
  }
  if (data.purpose) {
    fields["Purpose"] = data.purpose;
  }
  if (data.repaymentType) {
    fields["Repayment Type"] = data.repaymentType;
  }
  if (data.source) {
    fields["Source"] = data.source;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [{ fields }],
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[Airtable] Failed to create record", res.status, text);
  }
}

/**
 * 2) READ the most recent fact find for an email
 */
export async function getRefinanceFactFindByEmail(
  email: string
): Promise<RefinanceFactFindStored | null> {
  if (!AIRTABLE_API_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_REFI_TABLE_NAME) {
    console.warn("[Airtable] Env vars missing, cannot read records");
    return null;
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
    AIRTABLE_REFI_TABLE_NAME
  )}?maxRecords=1&sort[0][field]=Created%20At&sort[0][direction]=desc&filterByFormula=${encodeURIComponent(
    `{Email} = "${email}"`
  )}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[Airtable] Failed to fetch record", res.status, text);
    return null;
  }

  const json = await res.json();
  const record = json.records?.[0];
  if (!record) return null;

  const f = record.fields || {};

  return {
    email: String(f.Email || "").toLowerCase(),
    currentLoanBalance: Number(f["Current Loan Balance"] || 0),
    currentInterestRatePercent: Number(f["Current Interest Rate %"] || 0),
    remainingTermYears: Number(f["Remaining Term (years)"] || 30),
    propertyValue:
      f["Property Value"] != null ? Number(f["Property Value"]) : null,
    purpose: (f["Purpose"] as "OO" | "INV" | undefined) || null,
    repaymentType: (f["Repayment Type"] as "P&I" | "IO" | undefined) || null,
  };
}
