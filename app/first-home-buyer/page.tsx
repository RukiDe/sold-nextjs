// app/first-home-buyer/page.tsx
"use client";

import { Suspense, useEffect, useRef, useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";

type FhbFormState = {
  email: string;
  preferredName: string;
  isJoint: "solo" | "joint";
  partnerName: string;
  partnerEmail: string;
  depositSaved: string;
  combinedIncome: string;

  // NEW FHB attributes
  fhbSchemeEligibility: string; // ELIGIBLEFIRSTHOMESCHEME
  incomeSource: string; // EMPLOYMENTTYPE
  existingDebts: string[]; // EXISTINGDEBTS
  loanRange: string; // LOANRANGE
  buyingTimeframe: string; // BUYINGTIMEFRAME
  preferredSuburb: string; // PREFERREDSUBURBS
};

function FirstHomeBuyerInner() {
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
      console.error("[FHB] Failed to mark DIGITAL_FACT_FIND_SENT:", err);
    });
  }, [emailFromUrl]);

  const [form, setForm] = useState<FhbFormState>({
    email: emailFromUrl,
    preferredName: "",
    isJoint: "solo",
    partnerName: "",
    partnerEmail: "",
    depositSaved: "",
    combinedIncome: "",

    fhbSchemeEligibility: "",
    incomeSource: "",
    existingDebts: [],
    loanRange: "",
    buyingTimeframe: "",
    preferredSuburb: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = <K extends keyof FhbFormState>(
    field: K,
    value: FhbFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMultiSelect = (field: "existingDebts", value: string) => {
    setForm((prev) => {
      const current = prev[field];
      const exists = current.includes(value);
      return {
        ...prev,
        [field]: exists
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/first-home-buyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        console.error("[/api/first-home-buyer] error:", data);
        throw new Error(data?.error || "Something went wrong");
      }

      // Zapier/Brevo/Jotform flow picks up from here
      window.location.href = "/first-home-buyer2-success";
    } catch (err: any) {
      console.error("FHB submit error:", err);
      setErrorMessage(
        "Something went wrong submitting your details. Please try again or email connect@sold.financial."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const incomeOptions = [
    "<$80k",
    "$80k–$120k",
    "$120k–$180k",
    "$180k–$250k",
    "$250k+",
  ];

  const fhbSchemeOptions = ["Yes", "No", "Not sure"];
  const incomeSourceOptions = ["PAYG", "Self employed", "Casual", "Other"];
  const existingDebtOptions = [
    "Credit card",
    "HECS",
    "Car loan",
    "Investment property",
  ];
  const loanRangeOptions = [
    "<$500k",
    "$500k–$750k",
    "$750k–$1.25m",
    "$1.25m+",
  ];
  const buyingTimeframeOptions = [
    "ASAP",
    "1–3 months",
    "3–6 months",
    "6+ months",
  ];

  const isJoint = form.isJoint === "joint";

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl sm:text-5xl font-black mb-6">
        First home buyer fact find
      </h1>

      <p className="text-lg text-neutral-700 max-w-3xl leading-relaxed">
        This helps us understand your borrowing power, grants eligibility and
        lender appetite — without a credit check.
      </p>

      <ul className="list-disc ml-6 mt-4 text-neutral-700 space-y-2">
        <li>Sense-check your budget against current lending settings.</li>
        <li>Work out what you might access in grants or shared-equity schemes.</li>
        <li>
          Get honest advice — we work for you, not lenders. We only recommend a
          move if it puts you ahead and you feel comfy.
        </li>
      </ul>

      <form
        onSubmit={handleSubmit}
        className="mt-12 space-y-8 bg-white border border-neutral-200 rounded-3xl p-8"
      >
        {/* JOINT APPLICATION TOGGLE (match refinance styling) */}
        <div>
          <p className="block font-semibold text-lg mb-3">Application type</p>
          <div className="inline-flex rounded-full border border-neutral-300 bg-white p-1">
            <button
              type="button"
              onClick={() => updateField("isJoint", "solo")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                form.isJoint === "solo"
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-neutral-800"
              }`}
            >
              Single
            </button>
            <button
              type="button"
              onClick={() => updateField("isJoint", "joint")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                form.isJoint === "joint"
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-neutral-800"
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
              placeholder="player1@gmail.com"
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
                placeholder="Sandy"
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
                placeholder="player2@gmail.com"
                value={form.partnerEmail}
                onChange={(e) => updateField("partnerEmail", e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* DEPOSIT SAVED */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            How much have you saved for your deposit (approx) *
          </label>
          <input
            type="text"
            placeholder="$50,000"
            value={form.depositSaved}
            onChange={(e) => updateField("depositSaved", e.target.value)}
            required
            className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
          />
          <p className="mt-1 text-xs text-neutral-500">
            Cash in the bank you&apos;re planning to use towards the purchase.
          </p>
        </div>

        {/* INCOME PILL SELECT */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            What&apos;s your gross (pre-tax) annual household income? *
          </label>
          <p className="text-xs text-neutral-500 mb-3">
            If two of you are applying, add your incomes together.
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

        {/* FHB scheme eligibility */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            Do you qualify for the First Home Buyer Scheme? *
          </label>
          <div className="flex flex-wrap gap-2">
            {fhbSchemeOptions.map((option) => {
              const selected = form.fhbSchemeEligibility === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField("fhbSchemeEligibility", option)}
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

        {/* Income source */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            Where does your income come from? *
          </label>
          <div className="flex flex-wrap gap-2">
            {incomeSourceOptions.map((option) => {
              const selected = form.incomeSource === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField("incomeSource", option)}
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

        {/* Existing debts (multi-select) */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            Do you have any of these loans? *
          </label>
          <div className="flex flex-wrap gap-2">
            {existingDebtOptions.map((option) => {
              const selected = form.existingDebts.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleMultiSelect("existingDebts", option)}
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

        {/* Loan size */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            What loan size are you after? *
          </label>
          <p className="text-xs text-neutral-500 mb-3">
            After accounting for your deposit.
          </p>
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

        {/* Timeframe */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            When do you need the loan? *
          </label>
          <div className="flex flex-wrap gap-2">
            {buyingTimeframeOptions.map((option) => {
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

        {/* Preferred suburb */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            What&apos;s your preferred suburb? *
          </label>
          <input
            type="text"
            placeholder="e.g. Coburg, Reservoir, Preston"
            value={form.preferredSuburb}
            onChange={(e) => updateField("preferredSuburb", e.target.value)}
            required
            className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
          />
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

export default function FirstHomeBuyerPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-neutral-500">Loading your fact find…</div>
      }
    >
      <FirstHomeBuyerInner />
    </Suspense>
  );
}
