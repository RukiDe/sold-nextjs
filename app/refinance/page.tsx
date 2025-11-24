// app/refinance/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, FormEvent } from "react";

type RefiFormState = {
  email: string;
  preferredName: string;
  currentLender: string;
  refinancingFor: string[];
  loanType: string[];
  rate: string;
  balance: string;
  repayments: string;
  termRemaining: string;
  propertyValue: string;
};

const REFINANCING_FOR_OPTIONS = [
  "Lower my repayments",
  "Pay my loan off sooner",
  "Access equity / cash out",
  "Switch to a better lender",
];

const LOAN_TYPE_OPTIONS = [
  "Owner occupier",
  "Investor",
  "Principal & interest",
  "Interest only",
];

function RefiInner() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";
  const hasUpdatedBrevoRef = useRef(false);

  // 🔒 Mark DIGITAL_FACT_FIND_SENT = "Yes" in Brevo when they land here
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
          DIGITAL_FACT_FIND_SENT: "Yes",
        },
      }),
    }).catch((err) => {
      console.error("Failed to mark DIGITAL_FACT_FIND_SENT:", err);
    });
  }, [emailFromUrl]);

  const [form, setForm] = useState<RefiFormState>({
    email: emailFromUrl,
    preferredName: "",
    currentLender: "",
    refinancingFor: [],
    loanType: [],
    rate: "",
    balance: "",
    repayments: "",
    termRemaining: "",
    propertyValue: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMultiselect = (field: keyof Pick<RefiFormState, "refinancingFor" | "loanType">, value: string) => {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // TODO: next step – POST this data back to Brevo or your backend
    console.log("Refinance form submitted", form);
  };

  return (
    <main className="min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10"
      >
        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Refinance digital fact find
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-xl">
            A few quick questions so we can understand your current setup and
            what you’re aiming for. No credit checks at this stage.
          </p>
        </header>

        {/* EMAIL (read-only if coming from URL) */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-base"
            required
            readOnly={!!emailFromUrl}
          />
          {emailFromUrl && (
            <p className="mt-1 text-xs text-neutral-500">
              Pulled from the link in your email.
            </p>
          )}
        </div>

        {/* PREFERRED NAME */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            What should we call you?
          </label>
          <input
            type="text"
            name="preferredName"
            value={form.preferredName}
            onChange={handleInputChange}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-base"
            placeholder="e.g. Ruki"
          />
        </div>

        {/* CURRENT LENDER */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            Who is your current lender?
          </label>
          <input
            type="text"
            name="currentLender"
            value={form.currentLender}
            onChange={handleInputChange}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-base"
            placeholder="e.g. CBA, ANZ, Macquarie"
          />
        </div>

        {/* REFINANCING FOR */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            What are you looking to achieve by refinancing?
          </label>
          <div className="grid sm:grid-cols-2 gap-2">
            {REFINANCING_FOR_OPTIONS.map((label) => (
              <label
                key={label}
                className="flex items-center gap-2 text-sm sm:text-base"
              >
                <input
                  type="checkbox"
                  checked={form.refinancingFor.includes(label)}
                  onChange={() => toggleMultiselect("refinancingFor", label)}
                  className="w-5 h-5 rounded border-neutral-400"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* LOAN TYPE */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            What describes your loan best?
          </label>
          <div className="grid sm:grid-cols-2 gap-2">
            {LOAN_TYPE_OPTIONS.map((label) => (
              <label
                key={label}
                className="flex items-center gap-2 text-sm sm:text-base"
              >
                <input
                  type="checkbox"
                  checked={form.loanType.includes(label)}
                  onChange={() => toggleMultiselect("loanType", label)}
                  className="w-5 h-5 rounded border-neutral-400"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* RATE */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            What’s your current interest rate? (approximate is fine)
          </label>
          <input
            type="text"
            name="rate"
            value={form.rate}
            onChange={handleInputChange}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-base"
            placeholder="e.g. 5.89%"
          />
        </div>

        {/* BALANCE */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            Approximate loan balance
          </label>
          <input
            type="text"
            name="balance"
            value={form.balance}
            onChange={handleInputChange}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-base"
            placeholder="e.g. 620000"
          />
        </div>

        {/* REPAYMENTS */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            Monthly repayments (approximate)
          </label>
          <input
            type="text"
            name="repayments"
            value={form.repayments}
            onChange={handleInputChange}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-base"
            placeholder="e.g. 3200"
          />
        </div>

        {/* TERM REMAINING */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            Roughly how many years are left on your loan term?
          </label>
          <input
            type="text"
            name="termRemaining"
            value={form.termRemaining}
            onChange={handleInputChange}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-base"
            placeholder="e.g. 23"
          />
        </div>

        {/* PROPERTY VALUE */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            Estimated property value
          </label>
          <input
            type="text"
            name="propertyValue"
            value={form.propertyValue}
            onChange={handleInputChange}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-base"
            placeholder="e.g. 900000"
          />
        </div>

        {/* SUBMIT */}
        <div className="pt-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-black text-white px-8 py-3 text-base font-semibold hover:bg-white hover:text-black border border-black transition-colors"
          >
            Submit details
          </button>
        </div>
      </form>
    </main>
  );
}

export default function RefinancePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-neutral-500">Loading&hellip;</div>
      }
    >
      <RefiInner />
    </Suspense>
  );
}
