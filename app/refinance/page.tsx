"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ButtonPill } from "@/components/ButtonPill";

function RefiInner() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [form, setForm] = useState({
    currentLender: "",
    refinancingFor: [] as string[],
    loanType: [] as string[],
    rate: "",
    balance: "",
    repayments: "",
    termRemaining: "",
    propertyValue: "",
    email,
  });

  const updateField = (field: string, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const toggleMultiselect = (field: string, value: string) => {
    setForm((f) => {
      const exists = f[field as keyof typeof f] as string[];
      return {
        ...f,
        [field]: exists.includes(value)
          ? exists.filter((v) => v !== value)
          : [...exists, value],
      };
    });
  };

  const handleSubmit = async (e: any) => {
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
        This is your digital fact find — a quick way for us to sense-check your
        current rate, repayments and loan position against what’s available on
        the market today.
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
        <input type="hidden" value={email} />

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
            className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20"
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

        {/* NUMERIC FIELDS */}
        <div className="space-y-6">
          {[
            { id: "rate", label: "What is your current interest rate?", placeholder: "e.g. 6.10%" },
            { id: "balance", label: "What is your approximate loan balance?", placeholder: "e.g. $500,000" },
            { id: "repayments", label: "What are your current monthly repayments?", placeholder: "e.g. $2,450" },
            { id: "termRemaining", label: "How many years are left on your loan term?", placeholder: "e.g. 25" },
            { id: "propertyValue", label: "What is your property's estimated value.?", placeholder: "e.g. $850,000" },
          ].map((f) => (
            <div key={f.id}>
              <label className="block font-semibold text-lg mb-2">
                {f.label}
              </label>
              <input
                type="text"
                placeholder={f.placeholder}
                value={(form as any)[f.id]}
                onChange={(e) => updateField(f.id, e.target.value)}
                required
                className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20"
              />
            </div>
          ))}
        </div>

        {/* FIXED SUBMIT BUTTON USING BUTTONPILL STYLE */}
        <div className="pt-4">
          <button
            type="submit"
            className="inline-block bg-[#0B0F1B] text-white font-semibold text-[17px] 
            rounded-full px-8 py-3.5 transition-all border border-[#0B0F1B] 
            hover:bg-white hover:text-black hover:border-black text-center w-full sm:w-auto"
          >
            I'm ready for the next steps
          </button>
        </div>
      </form>
    </main>
  );
}

export default function Refinance() {
  return (
    <Suspense fallback={<div className="p-8 text-neutral-500">Loading…</div>}>
      <RefiInner />
    </Suspense>
  );
}
