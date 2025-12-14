// lib/readinessScore.ts

export type Goal = "fhb" | "refinance" | "upgrade" | "invest";
export type EmploymentType =
  | "payg_full"
  | "payg_part"
  | "contractor"
  | "self_employed"
  | "gig";
export type HousingStatus = "renting" | "own_home" | "living_with_family";
export type ExpenseBand = "2.5-3.5" | "3.5-4.5" | "4.5-5.5" | "5.5plus";

export type ReadinessInput = {
  goal: Goal;
  householdIncome: number; // annual
  employmentType: EmploymentType;
  housingStatus: HousingStatus;
  rentWeekly: number | null;
  loanBalance: number | null;
  loanRepaymentMonthly: number | null;
  creditCardLimits: number;
  personalLoanRepayments: number;
  hasHecs: boolean;
  expenseBand: ExpenseBand;
};

export type ReadyBand = "not_ready" | "almost_there" | "ready" | "very_ready";

export type ReadinessResult = {
  score: number;
  band: ReadyBand;
  strengths: string[];
  focusAreas: string[];
  readyMoves: string[];
};

function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

function bandFromScore(score: number): ReadyBand {
  if (score < 50) return "not_ready";
  if (score < 70) return "almost_there";
  if (score < 85) return "ready";
  return "very_ready";
}

export function computeReadinessScore(input: ReadinessInput): ReadinessResult {
  const {
    householdIncome,
    employmentType,
    housingStatus,
    rentWeekly,
    loanBalance,
    loanRepaymentMonthly,
    creditCardLimits,
    personalLoanRepayments,
    hasHecs,
    expenseBand,
  } = input;

  // --- Basic derived numbers ---
  const monthlyIncome = householdIncome / 12;

  let estimatedExpenses = 4000;
  if (expenseBand === "2.5-3.5") estimatedExpenses = 3000;
  if (expenseBand === "3.5-4.5") estimatedExpenses = 4000;
  if (expenseBand === "4.5-5.5") estimatedExpenses = 5000;
  if (expenseBand === "5.5plus") estimatedExpenses = 6000;

  const rentMonthly =
    housingStatus === "renting" && rentWeekly != null ? rentWeekly * 52 / 12 : 0;

  const homeLoanRepay =
    housingStatus === "own_home" && loanRepaymentMonthly != null
      ? loanRepaymentMonthly
      : 0;

  const totalDebtRepayMonthly = homeLoanRepay + personalLoanRepayments;

  // Very rough HECS repayment estimate (just to get a number in the mix)
  let hecsMonthly = 0;
  if (hasHecs && householdIncome > 48000) {
    hecsMonthly = (householdIncome * 0.03) / 12; // 3% ballpark
  }

  const totalFixedOutgoings =
    estimatedExpenses + rentMonthly + totalDebtRepayMonthly + hecsMonthly;

  const surplus = monthlyIncome - totalFixedOutgoings;

  const totalDebtExcludingHECS =
    (loanBalance || 0) + creditCardLimits + personalLoanRepayments * 12;
  const dti =
    totalDebtExcludingHECS > 0 ? totalDebtExcludingHECS / householdIncome : 0;

  // --- Sub-scores (0–1) based on earlier design ---

  // Serviceability (30%)
  let serviceabilityScore = 0;
  const surplusPctOfIncome = surplus / (monthlyIncome || 1);

  if (surplus <= 0) serviceabilityScore = 0;
  else if (surplusPctOfIncome < 0.05) serviceabilityScore = 0.2;
  else if (surplusPctOfIncome < 0.1) serviceabilityScore = 0.4;
  else if (surplusPctOfIncome < 0.2) serviceabilityScore = 0.7;
  else serviceabilityScore = 1;

  // Surplus (20%)
  let surplusScore = 0;
  if (surplus < 150) surplusScore = 0;
  else if (surplus < 400) surplusScore = 0.2;
  else if (surplus < 800) surplusScore = 0.4;
  else if (surplus < 1500) surplusScore = 0.7;
  else surplusScore = 1;

  // Debt profile (20%)
  let debtScore = 1;
  if (dti >= 8) debtScore = 0;
  else if (dti >= 7) debtScore = 0.2;
  else if (dti >= 6) debtScore = 0.4;
  else if (dti >= 5) debtScore = 0.6;
  else if (dti >= 4) debtScore = 0.8;
  else debtScore = 1;

  if (creditCardLimits > 20000) debtScore -= 0.2;
  else if (creditCardLimits > 15000) debtScore -= 0.1;

  if (personalLoanRepayments > 800) debtScore -= 0.15;
  else if (personalLoanRepayments > 400) debtScore -= 0.05;

  debtScore = clamp(debtScore, 0, 1);

  // LVR / deposit proxy (15%) – super rough for now
  let lvrScore = 0.5; // neutral default
  if (housingStatus === "own_home" && loanBalance != null && loanBalance > 0) {
    // no property value yet, assume medium LVR → keep neutral
    lvrScore = 0.5;
  }
  if (housingStatus !== "own_home") {
    // for renters / living with family, treat as neutral until you add property price & deposit
    lvrScore = 0.5;
  }

  // Stability (10%)
  let stabilityScore = 0.6; // optimistic default
  if (employmentType === "gig") stabilityScore = 0.3;
  if (employmentType === "contractor") stabilityScore = 0.4;
  if (employmentType === "self_employed") stabilityScore = 0.4;

  if (housingStatus === "living_with_family") {
    stabilityScore += 0.1;
  }

  stabilityScore = clamp(stabilityScore, 0, 1);

  // Conduct (5%) – until OB, assume neutral-ish based on debt / surplus health
  let conductScore = 0.6;
  if (surplus < 0) conductScore = 0.2;
  else if (surplus < 150) conductScore = 0.4;
  if (dti >= 7) conductScore -= 0.2;
  conductScore = clamp(conductScore, 0, 1);

  // Weighting
  const scoreRaw =
    serviceabilityScore * 30 +
    surplusScore * 20 +
    debtScore * 20 +
    lvrScore * 15 +
    stabilityScore * 10 +
    conductScore * 5;

  const score = Math.round(clamp(scoreRaw, 0, 100));
  const band = bandFromScore(score);

  // --- Narrative bits (strengths / focus areas / moves) ---

  const strengths: string[] = [];
  const focusAreas: string[] = [];
  const readyMoves: string[] = [];

  if (serviceabilityScore >= 0.7) {
    strengths.push(
      "Your income versus your current commitments looks broadly in line with typical lender ranges."
    );
  } else if (serviceabilityScore <= 0.4) {
    focusAreas.push(
      "Your current commitments leave limited room in your budget, which can make serviceability tight with some lenders."
    );
    readyMoves.push(
      "Look for ways to reduce fixed repayments or increase income so there is more monthly buffer."
    );
  }

  if (surplusScore >= 0.7) {
    strengths.push("Your estimated monthly surplus is a clear positive for lenders.");
  } else if (surplusScore <= 0.4) {
    focusAreas.push(
      "Your estimated surplus is on the low side, which may limit how much you can borrow comfortably."
    );
    readyMoves.push(
      "Aim to increase your surplus by around $250 per month through either higher income or slightly lower spending."
    );
  }

  if (debtScore >= 0.7) {
    strengths.push("Your overall debt profile looks manageable relative to your income.");
  } else if (debtScore <= 0.4) {
    focusAreas.push(
      "Your existing debts and credit limits are doing a lot of the heavy lifting in this result."
    );
    readyMoves.push(
      "Consider reducing your total credit card limits and paying down personal loans where possible."
    );
  }

  if (creditCardLimits > 15000) {
    readyMoves.push(
      "Reducing your total credit card limits below about $10,000 can make a noticeable difference to your borrowing position."
    );
  }

  if (housingStatus === "renting" && rentMonthly > 0) {
    focusAreas.push(
      "Your rent is a meaningful part of your monthly outgoings, which lenders factor into serviceability."
    );
  }

  if (readyMoves.length === 0) {
    readyMoves.push(
      "Keep your existing debts low, maintain on-time repayments and continue building savings — you’re generally on a good path."
    );
  }

  return {
    score,
    band,
    strengths: Array.from(new Set(strengths)),
    focusAreas: Array.from(new Set(focusAreas)),
    readyMoves: Array.from(new Set(readyMoves)),
  };
}
