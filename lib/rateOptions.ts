// lib/rateOptions.ts
import type { Scenario } from "./loanCalculator";

export const baseScenarios: Scenario[] = [
  {
    id: "option-a",
    label: "Option A",
    description: "Focus on lower monthly repayments.",
    newRate: 5.89,
  },
  {
    id: "option-b",
    label: "Option B",
    description: "Balance of rate & flexibility.",
    newRate: 6.09,
  },
  {
    id: "option-c",
    label: "Option C",
    description: "Keep flexibility, still improve your rate.",
    newRate: 6.29,
  },
];
