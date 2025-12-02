"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
  FormEvent,
} from "react";
import { useSearchParams } from "next/navigation";

type InvestorFormState = {
  email: string;
  preferredName: string;
  isJoint: "solo" | "joint";
  partnerName: string;
  partnerEmail: string;

  investorPlan: string; // Refinancing / New loan
  loanRange: string; // <$500k etc
  loanType: string; // Fixed / Variable / Split
  ownershipStructure: string; // Personal / Joint / Trust / Company
  mainInvestmentGoal: string; // Cashflow / Growth / Diversification / SMSF

  monthlyRentalIncome: string; // free-text, we’ll convert to annual in API
  combinedIncome: string; // COMBINEDANNUALINCOME
  monthlyLivingExpenses: string; // MONTHLYLIVINGEXPENSES
  buyingTimeframe: string; // BUYINGTIMEFRAME
};

function InvestmentInner() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  // Prevent double Brevo updates
  const hasUpdatedBrevoRef = useRef(false);

  // When they land via a Brevo link with ?email=, mark DIGITAL_FACT_FIND_SENT in Brevo
  useEffect(() => {
    if (hasUpdatedBrevoRef.current) return;
    if (!emailFromUrl || !emailFromUrl.includes("@")) return;

    hasUpdatedBrevoRef.current = true;

    fetch("/api/brevo/update-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailFromUrl,
        attributes: {
          DIGITAL_FACT_FIND_SENT: true,
        },
      }),
    }).catch((err) => {
      console.error("[Investment] Failed to mark DIGITAL_FACT_FIND_SENT:", err);
    });
  }, [emailFromUrl]);

  const [form, setForm] = useState<InvestorFormState>({
    email: emailFromUrl,
    preferredName: "",
    isJoint: "solo",
    partnerName: "",
    partnerEmail: "",

    investorPlan: "",
    loanRange: "",
    loanType: "",
    ownershipStructure: "",
    mainInvestmentGoal: "",

    monthlyRentalIncome: "",
    combinedIncome: "",
    monthlyLivingExpenses: "",
    buyingTimeframe: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = <K extends keyof InvestorFormState>(
    field: K,
    value: InvestorFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/investment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        console.error("[/api/investment] error:", data);
        throw new Error(data?.error || "Something went wrong");
      }

      // Brevo / Zapier flow takes over from here (privacy + booking / OB)
      window.location.href = "/investment2-success";
    } catch (err: any) {
      console.error("Investment submit error:", err);
      setErrorMessage(
        "Something went wrong submitting your details. Please try again or email connect@sold.financial."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isJoint = form.isJoint === "joint";

  const loanRangeOptions = ["<$500k", "$500k–$750k", "$750k–$1.25m", "+$1.25m"];

  const loanTypeOptions = ["Fixed", "Variable", "Split"];

  const ownershipStructureOptions = [
    "Personal",
    "Joint",
    "Trust",
    "Company",
  ];

  const investmentGoalOptions = [
    "Cashflow",
    "Growth",
    "Diversification",
    "SMSF",
  ];

  const incomeOptions = [
    "<$80k",
    "$80k–$120k",
    "$120k–$180k",
    "$180k–$250k",
    "+$250k",
  ];

  const livingExpenseOptions = [
    "<$2k",
    "$2k–$4k",
    "$4k–$8k",
    "$8k–$12k",
    "+$12k",
  ];

  const timeframeOptions = ["ASAP", "1–3 months", "3–6 months", "+6 months"];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl sm:text-5xl font-black mb-6">
        Investment property fact find
      </h1>

      <p className="text-lg text-neutral-700 max-w-3xl leading-relaxed">
        A few quick questions so we can understand your portfolio, borrowing
        power and the type of investment you&apos;re aiming for – without any
        credit check.
      </p>

      <ul className="list-disc ml-6 mt-4 text-neutral-700 space-y-2">
        <li>Sense-check whether your next move stacks up on the numbers.</li>
        <li>
          Match your strategy – cashflow, growth or diversification – to lender
          appetite.
        </li>
        <li>
          Get honest advice – we work for you, not lenders. If it doesn&apos;t
          put you ahead, we&apos;ll say so.
        </li>
      </ul>

      <form
        onSubmit={handleSubmit}
        className="mt-12 space-y-8 bg-white border border-neutral-200 rounded-3xl p-8"
      >
        {/* APPLICATION TYPE TOGGLE */}
        <div>
          <p className="block font-semibold text-lg mb-3">
            Are you applying by yourself or with someone else?
          </p>
          <div className="inline-flex rounded-full border border-neutral-300 bg-neutral-50 p-1">
            <button
              type="button"
              onClick={() => updateField("isJoint", "solo")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                form.isJoint === "solo"
                  ? "bg-black text-white border border-black shadow-sm"
                  : "text-neutral-700"
              }`}
            >
              Single
            </button>
            <button
              type="button"
              onClick={() => updateField("isJoint", "joint")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                form.isJoint === "joint"
                  ? "bg-black text-white border border-black shadow-sm"
                  : "text-neutral-700"
              }`}
            >
              Joint
            </button>
          </div>
        </div>

        {/* PRIMARY + PARTNER DETAILS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-lg mb-2">
              Your preferred name *
            </label>
            <input
              type="text"
              placeholder="e.g. Ruki"
              value={form.preferredName}
              onChange={(e) => updateField("preferredName", e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">
              Your email *
            </label>
            <input
              type="email"
              placeholder="you@gmail.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>
        </div>

        {isJoint && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-lg mb-2">
                Co-applicant preferred name
              </label>
              <input
                type="text"
                placeholder="e.g. Sam"
                value={form.partnerName}
                onChange={(e) => updateField("partnerName", e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-lg mb-2">
                Co-applicant email
              </label>
              <input
                type="email"
                placeholder="partner@gmail.com"
                value={form.partnerEmail}
                onChange={(e) => updateField("partnerEmail", e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* WHAT CATEGORY OF INVESTMENT LOAN */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            What category of investment loan are you after? *
          </label>
          <div className="flex flex-wrap gap-2">
            {["Refinancing", "New loan"].map((option) => {
              const selected = form.investorPlan === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField("investorPlan", option)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* LOAN SIZE */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            What size loan are you looking for? *
          </label>
          <div className="flex flex-wrap gap-2">
            {loanRangeOptions.map((option) => {
              const selected = form.loanRange === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField("loanRange", option)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* LOAN TYPE */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            What type of loan are you after? *
          </label>
          <div className="flex flex-wrap gap-2">
            {loanTypeOptions.map((option) => {
              const selected = form.loanType === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField("loanType", option)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* OWNERSHIP STRUCTURE */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            What ownership structure will the loan be held in? *
          </label>
          <div className="flex flex-wrap gap-2">
            {ownershipStructureOptions.map((option) => {
              const selected = form.ownershipStructure === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField("ownershipStructure", option)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN INVESTMENT GOAL */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            What category of investment loan are you after? *
          </label>
          <p className="text-xs text-neutral-500 mb-2">
            Choose the option that best matches your main investment goal.
          </p>
          <div className="flex flex-wrap gap-2">
            {investmentGoalOptions.map((option) => {
              const selected = form.mainInvestmentGoal === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField("mainInvestmentGoal", option)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* CURRENT RENTAL INCOME */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            What is your current rental income per month?
          </label>
          <input
            type="text"
            placeholder="e.g. 2500"
            value={form.monthlyRentalIncome}
            onChange={(e) => updateField("monthlyRentalIncome", e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
          />
          <p className="mt-1 text-xs text-neutral-500">
            Enter 0 if none. We&apos;ll convert this to an annual figure in the
            background.
          </p>
        </div>

        {/* INCOME */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            What is your gross (pre-tax) income? *
          </label>
          <p className="text-xs text-neutral-500 mb-2">
            If it&apos;s a joint loan, please combine amounts.
          </p>
          <div className="flex flex-wrap gap-2">
            {incomeOptions.map((option) => {
              const selected = form.combinedIncome === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField("combinedIncome", option)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* MONTHLY LIVING EXPENSES */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            Roughly what are your monthly living expenses?
          </label>
          <div className="flex flex-wrap gap-2">
            {livingExpenseOptions.map((option) => {
              const selected = form.monthlyLivingExpenses === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    updateField("monthlyLivingExpenses", option)
                  }
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* TIMEFRAME */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            What time period do you need the loan? *
          </label>
          <div className="flex flex-wrap gap-2">
            {timeframeOptions.map((option) => {
              const selected = form.buyingTimeframe === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField("buyingTimeframe", option)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {errorMessage}
          </p>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-block bg-[#0B0F1B] text-white font-semibold text-[17px]
              rounded-full px-8 py-3.5 transition-all border border-[#0B0F1B]
              hover:bg-white hover:text-black hover:border-black text-center w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Sending your details…"
              : "I’m ready for the next steps"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default function InvestmentPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-neutral-500">
          Loading your investment fact find…
        </div>
      }
    >
      <InvestmentInner />
    </Suspense>
  );
}
