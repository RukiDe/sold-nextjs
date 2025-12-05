// lib/loanCalculator.ts

export type LoanInput = {
  currentBalance: number;
  currentRate: number;  // percent p.a.
  remainingYears: number;
};

export type Scenario = {
  id: string;
  label: string;
  description: string;
  newRate: number; // percent p.a.
};

export type ScenarioResult = {
  id: string;
  label: string;
  description: string;
  newRate: number;
  currentMonthly: number;
  newMonthly: number;
  monthlySaving: number;
  fiveYearSaving: number;
  disclaimer: string;
};

const MONTHS_IN_YEAR = 12;

export function calcMonthlyRepayment(
  balance: number,
  annualRatePercent: number,
  termYears: number
): number {
  const r = (annualRatePercent / 100) / MONTHS_IN_YEAR;
  const n = termYears * MONTHS_IN_YEAR;

  if (r === 0) return balance / n;

  const factor = Math.pow(1 + r, n);
  return (balance * r * factor) / (factor - 1);
}

export function calcFiveYearInterest(
  balance: number,
  annualRatePercent: number,
  termYears: number
): number {
  const r = (annualRatePercent / 100) / MONTHS_IN_YEAR;
  const nTotal = termYears * MONTHS_IN_YEAR;
  const nFiveYears = Math.min(5 * MONTHS_IN_YEAR, nTotal);
  const monthly = calcMonthlyRepayment(balance, annualRatePercent, termYears);

  let remaining = balance;
  let interestPaid = 0;

  for (let i = 0; i < nFiveYears; i++) {
    const interest = remaining * r;
    const principal = monthly - interest;
    interestPaid += interest;
    remaining -= principal;
    if (remaining <= 0) break;
  }

  return interestPaid;
}

export function buildScenarioResults(
  input: LoanInput,
  scenarios: Scenario[]
): ScenarioResult[] {
  const currentMonthly = calcMonthlyRepayment(
    input.currentBalance,
    input.currentRate,
    input.remainingYears
  );
  const currentFiveYearInterest = calcFiveYearInterest(
    input.currentBalance,
    input.currentRate,
    input.remainingYears
  );

  return scenarios.map((scenario) => {
    const newMonthly = calcMonthlyRepayment(
      input.currentBalance,
      scenario.newRate,
      input.remainingYears
    );
    const newFiveYearInterest = calcFiveYearInterest(
      input.currentBalance,
      scenario.newRate,
      input.remainingYears
    );

    const monthlySaving = Math.max(0, currentMonthly - newMonthly);
    const fiveYearSaving = Math.max(
      0,
      currentFiveYearInterest - newFiveYearInterest
    );

    return {
      id: scenario.id,
      label: scenario.label,
      description: scenario.description,
      newRate: scenario.newRate,
      currentMonthly,
      newMonthly,
      monthlySaving,
      fiveYearSaving,
      disclaimer:
        "Illustrative only, based on what you shared. Final numbers depend on full credit assessment.",
    };
  });
}
