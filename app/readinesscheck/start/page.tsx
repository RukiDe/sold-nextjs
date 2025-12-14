"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ButtonPill } from "@/components/ButtonPill";
import {
  Goal,
  EmploymentType,
  HousingStatus,
  ExpenseBand,
  ReadinessInput,
} from "@/lib/readinessScore";

export default function ReadinessCheckStartPage() {
  const router = useRouter();

  const [goal, setGoal] = useState<Goal>("fhb");
  const [householdIncome, setHouseholdIncome] = useState("");
  const [employmentType, setEmploymentType] =
    useState<EmploymentType>("payg_full");
  const [housingStatus, setHousingStatus] =
    useState<HousingStatus>("renting");
  const [rentWeekly, setRentWeekly] = useState("");
  const [loanBalance, setLoanBalance] = useState("");
  const [loanRepaymentMonthly, setLoanRepaymentMonthly] = useState("");
  const [creditCardLimits, setCreditCardLimits] = useState("");
  const [personalLoanRepayments, setPersonalLoanRepayments] = useState("");
  const [hasHecs, setHasHecs] = useState<"yes" | "no">("no");
  const [expenseBand, setExpenseBand] =
    useState<ExpenseBand>("3.5-4.5");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanNumber = (val: string): number =>
      Number(val.replace(/,/g, "")) || 0;

    const payload: ReadinessInput & { source: string } = {
      goal,
      householdIncome: cleanNumber(householdIncome),
      employmentType,
      housingStatus,
      rentWeekly:
        housingStatus === "renting" ? Number(rentWeekly) || 0 : null,
      loanBalance:
        housingStatus === "own_home" ? cleanNumber(loanBalance) : null,
      loanRepaymentMonthly:
        housingStatus === "own_home"
          ? cleanNumber(loanRepaymentMonthly)
          : null,
      creditCardLimits: cleanNumber(creditCardLimits),
      personalLoanRepayments: cleanNumber(personalLoanRepayments),
      hasHecs: hasHecs === "yes",
      expenseBand,
      source: "readiness_v1_web",
    };

    try {
      const res = await fetch("/api/readinesscheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Error from /api/readinesscheck", await res.text());
        setIsSubmitting(false);
        return;
      }

      const data = await res.json();
      // Airtable record id becomes your sessionId
      router.push(`/readinesscheck/result?sessionId=${data.id}`);
    } catch (err) {
      console.error("Error submitting ReadinessCheck", err);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full flex flex-col items-center">
      <section className="w-full max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-semibold mb-2">
          Quick ReadinessCheck
        </h1>
        <p className="text-gray-600 mb-8">
          Answer a few questions about your situation. We&apos;ll estimate
          your ReadyScore and highlight the key areas helping or holding you
          back.
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Goal */}
          <div>
            <h2 className="text-lg font-semibold mb-2">
              What are you trying to do?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGoal("fhb")}
                className={`border rounded-lg px-4 py-3 text-left text-sm ${
                  goal === "fhb"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                Buy my first home
              </button>
              <button
                type="button"
                onClick={() => setGoal("refinance")}
                className={`border rounded-lg px-4 py-3 text-left text-sm ${
                  goal === "refinance"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                Refinance my current loan
              </button>
              <button
                type="button"
                onClick={() => setGoal("upgrade")}
                className={`border rounded-lg px-4 py-3 text-left text-sm ${
                  goal === "upgrade"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                Upgrade / move home
              </button>
              <button
                type="button"
                onClick={() => setGoal("invest")}
                className={`border rounded-lg px-4 py-3 text-left text-sm ${
                  goal === "invest"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                Explore investment options
              </button>
            </div>
          </div>

          {/* Income */}
          <div>
            <h2 className="text-lg font-semibold mb-2">
              What&apos;s your household income (before tax)?
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Include you and your partner if you&apos;re buying together.
            </p>
            <input
              type="text"
              inputMode="numeric"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="e.g. 150000"
              value={householdIncome}
              onChange={(e) => setHouseholdIncome(e.target.value)}
              required
            />
          </div>

          {/* Employment type */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Employment</h2>
            <select
              value={employmentType}
              onChange={(e) =>
                setEmploymentType(e.target.value as EmploymentType)
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="payg_full">PAYG full-time</option>
              <option value="payg_part">PAYG part-time</option>
              <option value="contractor">Contractor</option>
              <option value="self_employed">Self-employed</option>
              <option value="gig">Gig / mixed income</option>
            </select>
          </div>

          {/* Housing status */}
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Current housing situation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setHousingStatus("renting")}
                className={`border rounded-lg px-4 py-3 text-left text-sm ${
                  housingStatus === "renting"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                Renting
              </button>
              <button
                type="button"
                onClick={() => setHousingStatus("own_home")}
                className={`border rounded-lg px-4 py-3 text-left text-sm ${
                  housingStatus === "own_home"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                Own a home
              </button>
              <button
                type="button"
                onClick={() =>
                  setHousingStatus("living_with_family")
                }
                className={`border rounded-lg px-4 py-3 text-left text-sm ${
                  housingStatus === "living_with_family"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                Living with family
              </button>
            </div>

            {housingStatus === "renting" && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  How much is your rent per week?
                </label>
                <input
                  type="number"
                  min={0}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="e.g. 650"
                  value={rentWeekly}
                  onChange={(e) => setRentWeekly(e.target.value)}
                />
              </div>
            )}

            {housingStatus === "own_home" && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Approximate loan balance
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g. 480000"
                    value={loanBalance}
                    onChange={(e) => setLoanBalance(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current monthly repayment
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g. 2800"
                    value={loanRepaymentMonthly}
                    onChange={(e) =>
                      setLoanRepaymentMonthly(e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* Other debts */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Other debts</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Total credit card limits
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="e.g. 15000"
                  value={creditCardLimits}
                  onChange={(e) => setCreditCardLimits(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Monthly repayments on personal / car loans
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="e.g. 600"
                  value={personalLoanRepayments}
                  onChange={(e) =>
                    setPersonalLoanRepayments(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="mt-4">
              <span className="block text-sm font-medium mb-2">
                Do you have HECS / HELP?
              </span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setHasHecs("yes")}
                  className={`border rounded-lg px-4 py-2 text-sm ${
                    hasHecs === "yes"
                      ? "border-black bg-gray-50"
                      : "border-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHasHecs("no")}
                  className={`border rounded-lg px-4 py-2 text-sm ${
                    hasHecs === "no"
                      ? "border-black bg-gray-50"
                      : "border-gray-200"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Roughly how much do you spend each month?
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              A ballpark is fine. This helps us estimate your surplus.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setExpenseBand("2.5-3.5")}
                className={`border rounded-lg px-4 py-3 text-sm ${
                  expenseBand === "2.5-3.5"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                $2.5k–$3.5k
              </button>
              <button
                type="button"
                onClick={() => setExpenseBand("3.5-4.5")}
                className={`border rounded-lg px-4 py-3 text-sm ${
                  expenseBand === "3.5-4.5"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                $3.5k–$4.5k
              </button>
              <button
                type="button"
                onClick={() => setExpenseBand("4.5-5.5")}
                className={`border rounded-lg px-4 py-3 text-sm ${
                  expenseBand === "4.5-5.5"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                $4.5k–$5.5k
              </button>
              <button
                type="button"
                onClick={() => setExpenseBand("5.5plus")}
                className={`border rounded-lg px-4 py-3 text-sm ${
                  expenseBand === "5.5plus"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                $5.5k+
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-gray-500 max-w-sm">
              This is an estimate only and doesn&apos;t constitute approval or advice.
              It&apos;s a guide to help you see how close you might be.
            </p>

            <ButtonPill
              as="button"
              type="submit"
              className={isSubmitting ? "opacity-70 pointer-events-none" : ""}
            >
              {isSubmitting ? "Calculating..." : "See my ReadyScore"}
            </ButtonPill>
          </div>
        </form>
      </section>
    </main>
  );
}
