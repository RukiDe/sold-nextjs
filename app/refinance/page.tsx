"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function RefiInner() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  // IMPORTANT: match EXACTLY what route.ts expects
  const [form, setForm] = useState({
    email,
    preferredName: "",

    currentLender: "",
    refinancingFor: [] as string[],      // OWNERORINVESTOR
    loanType: [] as string[],            // LOANTYPE

    rate: "",                            // CURRENTRATE
    balance: "",                         // CURRENTLOANBALANCE
    repayments: "",                      // MONTHLYREPAYMENTS
    termRemaining: "",                   // YEARSREMAININGONLOAN
    propertyValue: "",                   // PROPERTYVALUE
  });

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMultiselect = (field: string, value: string) => {
    setForm((prev) => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
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
        current rate, repayments and loan position against available lender
        options.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-12 space-y-8 bg-white border border-neutral-200 rounded-3xl p-8"
      >
        <input type="hidden" value={email} />

        {/* PREFERRED NAME */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            Preferred name
          </label>
          <input
            type="text"
            value={form.preferredName}
            onChange={(e) => updateField("preferredName", e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-neutral-300"
          />
        </div>

        {/* CURRENT LENDER */}
        <div>
          <label className="block font-semibold text-lg mb-3">
            Who is your current lender *
          </label>
          <input
            type="text"
            value={form.currentLender}
            onChange={(e) => updateField("currentLender", e.target.value)}
            required
            className="w-full px-4 py-3 rounded-full border border-neutral-300"
          />
        </div>

        {/* OWNER OR INVESTOR */}
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
          <NumericField
            id="rate"
            label="What is your current interest rate?"
            placeholder="e.g. 6.10%"
            form={form}
            updateField={updateField}
          />

          <NumericField
            id="balance"
            label="What is your approximate loan balance?"
            placeholder="$500,000"
            form={form}
            updateField={updateField}
          />

          <NumericField
            id="repayments"
            label="What are your current monthly repayments?"
            placeholder="$2,450"
            form={form}
            updateField={updateField}
          />

          <NumericField
            id="termRemaining"
            label="How many years are left on your loan term?"
            placeholder="25"
            form={form}
            updateField={updateField}
          />

          <NumericField
            id="propertyValue"
            label="What is your property's estimated value?"
            placeholder="$850,000"
            form={form}
            updateField={updateField}
          />
        </div>

        {/* SUBMIT */}
        <div className="pt-4">
          <button
            type="submit"
            className="inline-block bg-[#0B0F1B] text-white font-semibold text-[17px] 
              rounded-full px-8 py-3.5 transition-all border border-[#0B0F1B] 
              hover:bg-white hover:text-black hover:border-black w-full sm:w-auto"
          >
            I'm ready for the next steps
          </button>
        </div>
      </form>
    </main>
  );
}

/* SMALL COMPONENT FOR NUMERIC INPUTS */
function NumericField({ id, label, placeholder, form, updateField }: any) {
  return (
    <div>
      <label className="block font-semibold text-lg mb-2">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={form[id]}
        onChange={(e) => updateField(id, e.target.value)}
        required
        className="w-full px-4 py-3 rounded-full border border-neutral-300"
      />
    </div>
  );
}

export default function Refinance() {
  return (
    <Suspense fallback={<div className="p-8 text-neutral-500">Loading…</div>}>
      <RefiInner />
    </Suspense>
  );
}
