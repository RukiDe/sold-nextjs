// lib/airtable.ts

/* ========================================================================== */
/*                               CONFIG SETUP                                 */
/* ========================================================================== */

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;

// Refinance (your existing setup)
const AIRTABLE_REFI_BASE_ID =
  process.env.AIRTABLE_REFI_BASE_ID || process.env.AIRTABLE_BASE_ID;
const AIRTABLE_REFI_TABLE_NAME =
  process.env.AIRTABLE_REFI_TABLE_NAME || "Refinance";

// ReadinessCheck (new)
const AIRTABLE_READINESS_BASE_ID =
  process.env.AIRTABLE_READINESS_BASE_ID ||
  AIRTABLE_REFI_BASE_ID || // fallback to the same base
  process.env.AIRTABLE_BASE_ID;

const AIRTABLE_READINESS_TABLE_NAME =
  process.env.AIRTABLE_READINESS_TABLE_NAME || "ReadinessChecks";

/* ========================================================================== */
/*                           SHARED CONFIG CHECKERS                            */
/* ========================================================================== */

function airtableConfigured(): boolean {
  const configured =
    !!AIRTABLE_API_TOKEN &&
    !!AIRTABLE_REFI_BASE_ID &&
    !!AIRTABLE_REFI_TABLE_NAME;

  if (!configured) {
    console.warn("[Airtable] Missing Refinance config", {
      hasToken: !!AIRTABLE_API_TOKEN,
      baseId: AIRTABLE_REFI_BASE_ID,
      table: AIRTABLE_REFI_TABLE_NAME,
    });
  }

  return configured;
}

function readinessConfigured(): boolean {
  const configured =
    !!AIRTABLE_API_TOKEN &&
    !!AIRTABLE_READINESS_BASE_ID &&
    !!AIRTABLE_READINESS_TABLE_NAME;

  if (!configured) {
    console.warn("[Airtable] Missing Readiness config", {
      hasToken: !!AIRTABLE_API_TOKEN,
      baseId: AIRTABLE_READINESS_BASE_ID,
      table: AIRTABLE_READINESS_TABLE_NAME,
    });
  }

  return configured;
}

/* ========================================================================== */
/*                       TYPES: REFINANCE (YOUR EXISTING CODE)                */
/* ========================================================================== */

type OptionKey = "A" | "B" | "C";
type BestOptionKey = OptionKey | "none";

export type RefinanceFactFindRecord = {
  email: string;

  preferredName?: string | null;
  goal?: string | string[] | null;

  currentLoanBalance?: number | string;
  balance?: number | string;

  currentMonthlyRepayments?: number | string | null;
  repayments?: number | string | null;

  currentInterestRatePercent?: number | string;
  currentInterestRate?: number | string;

  remainingTermYears?: number | string;
  yearsRemaining?: number | string;

  propertyValue?: number | string | null;

  ownerOrInvestor?: "OO" | "INV" | string | string[] | null;
  purpose?: string | string[] | null;

  loanTypes?: string[] | string | null;
  loanType?: string[] | string | null;

  currentLender?: string | null;
  source?: string | null;

  applicationType?: string | null;
  partnerName?: string | null;
  partnerEmail?: string | null;
};

export type RefinanceFactFindStored = {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
};

/* ========================================================================== */
/*                        CREATE REFINANCE FACT-FIND ROW                      */
/* ========================================================================== */

export async function createRefinanceFactFindRecord(
  payload: RefinanceFactFindRecord
): Promise<void> {
  if (!airtableConfigured()) {
    console.warn(
      "[Airtable] Not configured — skipping createRefinanceFactFindRecord"
    );
    return;
  }

  // Normalise numeric inputs
  const currentLoanBalanceRaw =
    payload.currentLoanBalance ?? payload.balance ?? null;
  const currentLoanBalance =
    currentLoanBalanceRaw != null ? Number(currentLoanBalanceRaw) : null;

  const currentMonthlyRepaymentsRaw =
    payload.currentMonthlyRepayments ?? payload.repayments ?? null;
  const currentMonthlyRepayments =
    currentMonthlyRepaymentsRaw != null
      ? Number(currentMonthlyRepaymentsRaw)
      : null;

  const currentInterestRatePercentRaw =
    payload.currentInterestRatePercent ?? payload.currentInterestRate ?? null;
  const currentInterestRatePercent =
    currentInterestRatePercentRaw != null
      ? Number(currentInterestRatePercentRaw)
      : null;

  const remainingTermYearsRaw =
    payload.remainingTermYears ?? payload.yearsRemaining ?? null;
  const remainingTermYears =
    remainingTermYearsRaw != null ? Number(remainingTermYearsRaw) : null;

  const propertyValueRaw = payload.propertyValue ?? null;
  const propertyValue =
    propertyValueRaw != null ? Number(propertyValueRaw) : null;

  // Owner / Investor
  let ownerOrInvestor: string | null = null;
  const ownerRaw = payload.ownerOrInvestor ?? payload.purpose;

  if (Array.isArray(ownerRaw)) {
    const joined = ownerRaw.join(" ").toUpperCase();
    if (joined.includes("INV")) ownerOrInvestor = "INV";
    else if (joined.includes("OO") || joined.includes("OWNER"))
      ownerOrInvestor = "OO";
  } else if (typeof ownerRaw === "string") {
    const v = ownerRaw.toUpperCase();
    if (v.includes("INV")) ownerOrInvestor = "INV";
    else if (v.includes("OO") || v.includes("OWNER")) ownerOrInvestor = "OO";
  }

  // Loan Types → multi-select
  let loanTypes: string[] | null = null;
  const loanTypesRaw = payload.loanTypes ?? payload.loanType;

  if (Array.isArray(loanTypesRaw)) {
    loanTypes = loanTypesRaw
      .map((v) => String(v).trim())
      .filter((v) => v.length > 0);
    if (!loanTypes.length) loanTypes = null;
  } else if (typeof loanTypesRaw === "string" && loanTypesRaw.trim()) {
    loanTypes = [loanTypesRaw.trim()];
  }

  // Goal → multi-select
  let goalValue: string[] | null = null;
  if (Array.isArray(payload.goal)) {
    goalValue = payload.goal
      .map((v) => String(v).trim())
      .filter((v) => v.length > 0);
    if (!goalValue.length) goalValue = null;
  } else if (payload.goal && String(payload.goal).trim()) {
    goalValue = [String(payload.goal).trim()];
  }

  const fields: Record<string, any> = {
    Email: payload.email,
    "Preferred Name": payload.preferredName ?? null,

    "Current Loan Balance": currentLoanBalance,
    "Current Monthly Repayments": currentMonthlyRepayments,
    "Current Interest Rate %": currentInterestRatePercent,
    "Remaining Term (years)": remainingTermYears,
    "Property Value": propertyValue,

    "Owner / Investor": ownerOrInvestor,
    "Loan Types": loanTypes,

    "Current Lender": payload.currentLender ?? null,
    Source: payload.source ?? "refinance2-form",
  };

  if (goalValue) fields["Goal"] = goalValue;

  console.log("[Airtable] Creating record in", AIRTABLE_REFI_TABLE_NAME, fields);

  const url = `https://api.airtable.com/v0/${AIRTABLE_REFI_BASE_ID}/${encodeURIComponent(
    AIRTABLE_REFI_TABLE_NAME!
  )}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("[Airtable] Failed to create record", res.status, data);
  }
}

/* ========================================================================== */
/*                     READ REFINANCE RECORD BY EMAIL                         */
/* ========================================================================== */

export async function getRefinanceFactFindByEmail(
  email: string
): Promise<RefinanceFactFindStored | null> {
  if (!airtableConfigured()) {
    console.warn(
      "[Airtable] Not configured — skipping getRefinanceFactFindByEmail"
    );
    return null;
  }

  const lower = email.trim().toLowerCase();
  const formula = `LOWER({Email}) = '${lower.replace(/'/g, "\\'")}'`;

  console.log(
    "[Airtable] Fetching by email from",
    AIRTABLE_REFI_TABLE_NAME,
    lower
  );

  const url = `https://api.airtable.com/v0/${AIRTABLE_REFI_BASE_ID}/${encodeURIComponent(
    AIRTABLE_REFI_TABLE_NAME!
  )}?maxRecords=1&filterByFormula=${encodeURIComponent(formula)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${AIRTABLE_API_TOKEN}` },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error(
      "[Airtable] Error fetching fact find by email:",
      res.status,
      data
    );
    return null;
  }

  if (!data.records || data.records.length === 0) {
    console.log("[Airtable] No record found for email", lower);
    return null;
  }

  const record = data.records[0];

  return {
    id: record.id,
    fields: record.fields || {},
    createdTime: record.createdTime,
  };
}

/* ========================================================================== */
/*                      UPDATE REFINANCE OPTIONS SNAPSHOT                     */
/* ========================================================================== */

export async function updateRefinanceOptionsForRecord(
  recordId: string,
  payload: {
    bestOptionKey: BestOptionKey;
    isOnGoodWicket: boolean;
    options: {
      key: OptionKey;
      lender: string;
      indicativeRate: number;
      newMonthly: number;
      monthlySaving: number;
    }[];
  }
) {
  if (!airtableConfigured()) {
    console.warn(
      "[Airtable] Not configured — skipping updateRefinanceOptionsForRecord"
    );
    return;
  }

  const { bestOptionKey, isOnGoodWicket, options } = payload;

  const fields: Record<string, any> = {
    "Best Option": bestOptionKey === "none" ? "" : bestOptionKey,
    "Is On Good Wicket": isOnGoodWicket,
  };

  for (const opt of options) {
    const prefix = `Option ${opt.key}`;
    fields[`${prefix} Lender`] = opt.lender;
    fields[`${prefix} Rate %`] = opt.indicativeRate ?? null;
    fields[`${prefix} New Monthly`] = opt.newMonthly ?? null;
    fields[`${prefix} Monthly Saving`] =
      opt.monthlySaving > 0 ? opt.monthlySaving : 0;
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_REFI_BASE_ID}/${encodeURIComponent(
    AIRTABLE_REFI_TABLE_NAME!
  )}/${recordId}`;

  console.log(
    "[Airtable] Updating refinance options for record",
    recordId,
    fields
  );

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error(
      "[Airtable] Error updating refinance options:",
      res.status,
      data
    );
  }

  return data;
}

/* ========================================================================== */
/*                        READINESSCHECK — TYPES                              */
/* ========================================================================== */

export type ReadinessCheckCreatePayload = {
  goal: string;
  householdIncome: number;
  employmentType: string;
  housingStatus: string;
  rentWeekly: number | null;
  loanBalance: number | null;
  loanRepaymentMonthly: number | null;
  creditCardLimits: number;
  personalLoanRepayments: number;
  hasHecs: boolean;
  expenseBand: string;

  score: number;
  band: string;
  strengths: string[];
  focusAreas: string[];
  readyMoves: string[];

  email?: string | null;
  source?: string | null;
};

export type ReadinessCheckStored = {
  id: string;
  createdTime: string;
  input: {
    goal: string;
    householdIncome: number;
    employmentType: string;
    housingStatus: string;
    rentWeekly: number | null;
    loanBalance: number | null;
    loanRepaymentMonthly: number | null;
    creditCardLimits: number;
    personalLoanRepayments: number;
    hasHecs: boolean;
    expenseBand: string;
  };
  result: {
    score: number;
    band: string;
    strengths: string[];
    focusAreas: string[];
    readyMoves: string[];
  };
  email?: string | null;
  source?: string | null;
};

/* ========================================================================== */
/*                     CREATE READINESSCHECK RECORD                            */
/* ========================================================================== */

export async function createReadinessCheckRecord(
  payload: ReadinessCheckCreatePayload
): Promise<{ id: string } | null> {
  if (!readinessConfigured()) {
    console.warn(
      "[Airtable] Not configured — skipping createReadinessCheckRecord"
    );
    return null;
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_READINESS_BASE_ID}/${encodeURIComponent(
    AIRTABLE_READINESS_TABLE_NAME!
  )}`;

  const fields: Record<string, any> = {
    goal: payload.goal,
    householdIncome: payload.householdIncome,
    employmentType: payload.employmentType,
    housingStatus: payload.housingStatus,
    rentWeekly: payload.rentWeekly,
    loanBalance: payload.loanBalance,
    loanRepaymentMonthly: payload.loanRepaymentMonthly,
    creditCardLimits: payload.creditCardLimits,
    personalLoanRepayments: payload.personalLoanRepayments,
    hasHecs: payload.hasHecs,
    expenseBand: payload.expenseBand,

    score: payload.score,
    band: payload.band,
    strengths: payload.strengths.join("\n"),
    focusAreas: payload.focusAreas.join("\n"),
    readyMoves: payload.readyMoves.join("\n"),

    email: payload.email ?? "",
    source: payload.source ?? "readiness_v1_web",
  };

  console.log(
    "[Airtable] Creating ReadinessCheck in",
    AIRTABLE_READINESS_TABLE_NAME,
    fields
  );

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error(
      "[Airtable] Failed to create ReadinessCheck record",
      res.status,
      data
    );
    return null;
  }

  return { id: data.id };
}

/* ========================================================================== */
/*                   FETCH READINESSCHECK RECORD BY ID                        */
/* ========================================================================== */

export async function getReadinessCheckById(
  id: string
): Promise<ReadinessCheckStored | null> {
  if (!readinessConfigured()) {
    console.warn(
      "[Airtable] Not configured — skipping getReadinessCheckById"
    );
    return null;
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_READINESS_BASE_ID}/${encodeURIComponent(
    AIRTABLE_READINESS_TABLE_NAME!
  )}/${id}`;

  console.log(
    "[Airtable] Fetching ReadinessCheck by id from",
    AIRTABLE_READINESS_TABLE_NAME,
    id
  );

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${AIRTABLE_API_TOKEN}` },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error(
      "[Airtable] Error fetching ReadinessCheck by id:",
      res.status,
      data
    );
    return null;
  }

  const fields = data.fields || {};

  return {
    id: data.id,
    createdTime: data.createdTime,
    input: {
      goal: fields.goal ?? "",
      householdIncome: fields.householdIncome ?? 0,
      employmentType: fields.employmentType ?? "",
      housingStatus: fields.housingStatus ?? "",
      rentWeekly: fields.rentWeekly ?? null,
      loanBalance: fields.loanBalance ?? null,
      loanRepaymentMonthly: fields.loanRepaymentMonthly ?? null,
      creditCardLimits: fields.creditCardLimits ?? 0,
      personalLoanRepayments: fields.personalLoanRepayments ?? 0,
      hasHecs: Boolean(fields.hasHecs),
      expenseBand: fields.expenseBand ?? "",
    },
    result: {
      score: fields.score ?? 0,
      band: fields.band ?? "",
      strengths: String(fields.strengths || "").split("\n").filter(Boolean),
      focusAreas: String(fields.focusAreas || "")
        .split("\n")
        .filter(Boolean),
      readyMoves: String(fields.readyMoves || "").split("\n").filter(Boolean),
    },
    email: fields.email ?? null,
    source: fields.source ?? null,
  };
}
