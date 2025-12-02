"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
  FormEvent,
} from "react";
import { useSearchParams } from "next/navigation";

type ApplicationType = "solo" | "joint";

type OwnerOccFormState = {
  email: string;
  preferredName: string;
  isJoint: ApplicationType;
  partnerName: string;
  partnerEmail: string;

  // Fact-find fields
  reasonsForMoving: string[];        // REASONFORMOVING
  loanTypes: string[];               // LOANTYPE
  buyingTimeframe: string;           // BUYINGTIMEFRAME
  currentLoanBalance: string;        // CURRENTLOANBALANCE
  targetPropertyValue: string;       // PROPERTYVALUE
  depositSaved: string;              // DEPOSITSAVED
  loanRange: string;                 // LOANRANGE
  planForCurrentProperty: string;    // PLANFORCURRENTPROPERTY
  employmentTypes: string[];         // EMPLOYMENTTYPE
  combinedIncomeBand: string;        // COMBINEDANNUALINCOME
};

const reasonOptions = [
  "More space",
  "Lifestyle",
  "School zone",
  "Work",
  "Investment",
  "Downsize",
];

const loanTypeOptions = ["Fixed", "Variable", "Split"];

const timeframeOptions = [
  "ASAP",
  "1–3 months",
  "3–6 months",
  "+6 months",
];

const loanRangeOptions = [
  "<$500k",
  "$500k–$750k",
  "$750k–$1.25m",
  "+$1.25m",
];

const planCurrentPropertyOptions = [
  "Sell",
  "Rent it out",
  "I am renting",
];

const employmentOptions = ["PAYG", "Self employed", "Casual", "Other"];

const incomeBandOptions = [
  "<$80k",
  "$80k–$120k",
  "$120k–$180k",
  "$180k–$250k",
  "$250k+",
];

function OwnerOccInner() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  // Avoid double DIGITAL_FACT_FIND_SENT updates
  const hasUpdatedBrevoRef = useRef(false);

  useEffect(() => {
    if (hasUpdatedBrevoRef.current) return;
    if (!emailFromUrl || !emailFromUrl.includes("@")) return;

    hasUpdatedBrevoRef.current = true;

    // Same helper as refi/FHB – marks DIGITAL_FACT_FIND_SENT true when they land
    fetch("/api/brevo/update-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailFromUrl,
        attributes: { DIGITAL_FACT_FIND_SENT: true },
      }),
    }).catch((err) => {
      console.error("[OwnerOcc] Failed to mark DIGITAL_FACT_FIND_SENT:", err);
    });
  }, [emailFromUrl]);

  const [form, setForm] = useState<OwnerOccFormState>({
    email: emailFromUrl,
    preferredName: "",
    isJoint: "solo",
    partnerName: "",
    partnerEmail: "",
    reasonsForMoving: [],
    loanTypes: [],
    buyingTimeframe: "",
    currentLoanBalance: "",
    targetPropertyValue: "",
    depositSaved: "",
    loanRange: "",
    planForCurrentProperty: "",
    employmentTypes: [],
    combinedIncomeBand: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleInArray = (field: keyof OwnerOccFormState, value: string) => {
    setForm((prev) => {
      const current = prev[field] as string[];
      if (!Array.isArray(current)) return prev;
      const exists = current.includes(value);
      const next = exists
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  };

  const updateField = <K extends keyof OwnerOccFormState>(
    field: K,
    value: OwnerOccFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/owner-occupier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        console.error("[/api/owner-occupier] error:", data);
        throw new Error(data?.error || "Something went wrong");
      }

      // Brevo automation (list + FACT_FIND_COMPLETE) will handle next email
      window.location.href = "/owner-occupier-success";
    } catch (err: any) {
      console.error("OwnerOcc submit error:", err);
      setErrorMessage(
        "Something went wrong submitting your details. Please try again or email connect@sold.financial."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isJoint = form.isJoint === "joint";

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl sm:text-5xl font-black mb-6">
        Owner occupier fact find
      </h1>

      <p className="text-lg text-neutral-700 max-w-3xl leading-relaxed">
        A few quick questions — no credit checks, just enough to understand your
        direction and timing so we can shape the right path.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-12 space-y-8 bg-white border border-neutral-200 rounded-3xl p-8"
      >
        {/* Application type toggle */}
        <div>
          <p className="block font-semibold text-lg mb-3">Application type</p>
          <div className="inline-flex rounded-full bg-black text-white p-1">
            <button
              type="button"
              onClick={() => updateField("isJoint", "solo")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                form.isJoint === "solo"
                  ? "bg-white text-black"
                  : "bg-transparent text-white/70"
              }`}
            >
              Single
            </button>
            <button
              type="button"
              onClick={() => updateField("isJoint", "joint")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                form.isJoint === "joint"
                  ? "bg-white text-black"
                  : "bg-transparent text-white/70"
              }`}
            >
              Joint
            </button>
          </div>
        </div>

        {/* Primary + co-applicant details */}
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
              placeholder="you@email.com"
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
                placeholder="Partner name"
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
                placeholder="partner@email.com"
                value={form.partnerEmail}
                onChange={(e) => updateField("partnerEmail", e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* What's driving the move */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            What’s driving the move? *
          </label>
          <div className="flex flex-wrap gap-2">
            {reasonOptions.map((reason) => {
              const selected = form.reasonsForMoving.includes(reason);
              return (
                <button
                  key={reason}
                  type="button"
                  onClick={() => toggleInArray("reasonsForMoving", reason)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {reason}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loan type */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            What type of loan are you after? *
          </label>
          <div className="flex flex-wrap gap-2">
            {loanTypeOptions.map((lt) => {
              const selected = form.loanTypes.includes(lt);
              return (
                <button
                  key={lt}
                  type="button"
                  onClick={() => toggleInArray("loanTypes", lt)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {lt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeframe */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            When do you need the loan? *
          </label>
          <div className="flex flex-wrap gap-2">
            {timeframeOptions.map((tf) => {
              const selected = form.buyingTimeframe === tf;
              return (
                <button
                  key={tf}
                  type="button"
                  onClick={() => updateField("buyingTimeframe", tf)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {tf}
                </button>
              );
            })}
          </div>
        </div>

        {/* Balances + property value + deposit */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-lg mb-2">
              What are your current home loan balances (if any)?
            </label>
            <input
              type="text"
              placeholder="e.g. 650000"
              value={form.currentLoanBalance}
              onChange={(e) =>
                updateField("currentLoanBalance", e.target.value)
              }
              className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">
              Roughly what is the property valuation you&apos;re looking at? *
            </label>
            <input
              type="text"
              placeholder="e.g. 900000"
              value={form.targetPropertyValue}
              onChange={(e) =>
                updateField("targetPropertyValue", e.target.value)
              }
              required
              className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">
              How much do you have saved for a deposit? *
            </label>
            <input
              type="text"
              placeholder="e.g. 120000"
              value={form.depositSaved}
              onChange={(e) => updateField("depositSaved", e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>
        </div>

        {/* Loan size */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            What loan size are you after? *
          </label>
          <div className="flex flex-wrap gap-2">
            {loanRangeOptions.map((opt) => {
              const selected = form.loanRange === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateField("loanRange", opt)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Plan for current property */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            What is the plan for your current property? *
          </label>
          <div className="flex flex-wrap gap-2">
            {planCurrentPropertyOptions.map((opt) => {
              const selected = form.planForCurrentProperty === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateField("planForCurrentProperty", opt)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Employment type */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            How do you get paid? *
          </label>
          <div className="flex flex-wrap gap-2">
            {employmentOptions.map((opt) => {
              const selected = form.employmentTypes.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleInArray("employmentTypes", opt)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Income band */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            What&apos;s your current gross (pre-tax) income? *
          </label>
          <p className="text-xs text-neutral-500 mb-3">
            If you&apos;re applying jointly, combine both incomes.
          </p>
          <div className="flex flex-wrap gap-2">
            {incomeBandOptions.map((opt) => {
              const selected = form.combinedIncomeBand === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateField("combinedIncomeBand", opt)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {opt}
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
            {isSubmitting ? "Sending your details…" : "I’m ready for the next steps"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default function OwnerOccPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-neutral-500">Loading your fact find…</div>
      }
    >
      <OwnerOccInner />
    </Suspense>
  );
}
