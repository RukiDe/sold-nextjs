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

function RefiInner() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  // Prevent double-fires
  const hasUpdatedBrevoRef = useRef(false);

  // 🔒 Mark DIGITAL_FACT_FIND_SENT = true in Brevo
  // This only runs when we have an email in the URL (i.e. from Brevo email links)
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

  const updateField = <K extends keyof RefiFormState>(
    field: K,
    value: RefiFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMultiselect = (
    field: "refinancingFor" | "loanType",
    value: string
  ) => {
    setForm((prev) => {
      const arr = prev[field];
      const exists = arr.includes(value);
      return {
        ...prev,
        [field]: exists ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await fetch("/api/refinance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    window.location.href = "/refinance2-success";
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl sm:text-5xl font-black mb-6">
        Refinance your loan
      </h1>

      <p className="text-lg text-neutral-700 max-w-3xl leading-relaxed">
        This is your digital fact find — a quick way for us to sense-check
        your current rate, repayments and loan position against what&apos;s
        available on the market today.
      </p>

      <ul className="list-disc ml-6 mt-4 text-neutral-700 space-y-2">
        <li>No credit check at this stage.</li>
        <li>Honest advice — we work for you, not lenders.</li>
        <li>We only recommend a move if it puts you ahead and you feel comfy.</li>
      </ul>

      <form
        onSubmit={handleSubmit}
        className="mt-12 space-y-8 bg-white border border-neutral-200 rounded-3xl p-8"
      >
        {/* EMAIL + PREFERRED NAME */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-lg mb-2">
              Preferred name *
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
              Email *
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>
        </div>

        {/* CURRENT LENDER */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            Who is your current lender *
          </label>
          <input
            type="text"
            placeholder="e.g. Commonwealth Bank"
            value={form.currentLender}
            onChange={(e) => updateField("currentLender", e.target.value)}
            required
            className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
          />
        </div>

        {/* PURPOSE */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            Are you refinancing for an *
          </label>

          <div className="space-y-3">
            {["Owner Occupier", "Investment Property"].map((label) => (
              <label key={label} className="flex items-center gap-3">
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
            What type of loan do you currently have *
          </label>

          <div className="space-y-3">
            {["Fixed", "Variable", "Split"].map((label) => (
              <label key={label} className="flex items-center gap-3">
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

        {/* NUMERIC / TEXT FIELDS */}
        <div className="space-y-6">
          <div>
            <label className="block font-semibold text-lg mb-2">
              What is your current interest rate?
            </label>
            <input
              type="text"
              placeholder="e.g. 6.10%"
              value={form.rate}
              onChange={(e) => updateField("rate", e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">
              What is your approximate loan balance?
            </label>
            <input
              type="text"
              placeholder="e.g. $500,000"
              value={form.balance}
              onChange={(e) => updateField("balance", e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">
              What are your current monthly repayments?
            </label>
            <input
              type="text"
              placeholder="e.g. $2,450"
              value={form.repayments}
              onChange={(e) => updateField("repayments", e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">
              How many years are left on your loan term?
            </label>
            <input
              type="text"
              placeholder="e.g. 25"
              value={form.termRemaining}
              onChange={(e) => updateField("termRemaining", e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">
              What is your property&apos;s estimated value?
            </label>
            <input
              type="text"
              placeholder="e.g. $850,000"
              value={form.propertyValue}
              onChange={(e) => updateField("propertyValue", e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="inline-block bg-[#0B0F1B] text-white font-semibold text-[17px]
              rounded-full px-8 py-3.5 transition-all border border-[#0B0F1B]
              hover:bg-white hover:text-black hover:border-black text-center w-full sm:w-auto"
          >
            I&apos;m ready for the next steps
          </button>
        </div>
      </form>
    </main>
  );
}

export default function RefinancePage() {
  return (
    <Suspense fallback={<div className="p-8 text-neutral-500">Loading…</div>}>
      <RefiInner />
    </Suspense>
  );
}
