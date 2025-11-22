"use client";

import React, { useEffect, useState } from "react";

export default function RefinancePage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    currentLender: "",
    refinancingFor: [] as string[],
    loanType: [] as string[],
    rate: "",
    balance: "",
    repayments: "",
    termRemaining: "",
    propertyValue: "",
  });

  // Read ?email= from the URL on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const emailFromUrl = params.get("email") || "";
      setEmail(emailFromUrl);
    }
  }, []);

  const updateField = (field: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMultiselect = (field: "refinancingFor" | "loanType", value: string) => {
    setForm((prev) => {
      const list = prev[field];
      const exists = list.includes(value);
      return {
        ...prev,
        [field]: exists ? list.filter((v) => v !== value) : [...list, value],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await fetch("/api/refinance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, email }),
      });

      window.location.href = "/refinance2-success";
    } catch (err) {
      console.error("Error submitting refinance fact find", err);
      setIsSubmitting(false);
      alert("Something went wrong submitting your details. Please try again.");
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header copy */}
      <h1 className="text-4xl sm:text-5xl font-black mb-6">
        Refinance your loan, properly.
      </h1>

      <p className="text-lg text-neutral-700 max-w-3xl leading-relaxed">
        This is the first step in giving your home loan a health check
        without the pressure of sitting in a branch or being sold to. We'll
        sense-check your current rate and repayments against what's available
        on the market today.
      </p>

      <ul className="list-disc ml-6 mt-4 text-neutral-700 space-y-2">
        <li>No credit check at this stage.</li>
        <li>Honest advice, we work for you not lenders.</li>
        <li>
          We only recommend a move if it actually puts you ahead and you're
          feeling comfy.
        </li>
      </ul>

      {/* Fact find form */}
      <form
        onSubmit={handleSubmit}
        className="mt-12 space-y-8 bg-white border border-neutral-200 rounded-3xl p-8"
      >
        {/* Hidden email just for debugging / clarity */}
        {email && (
          <p className="text-sm text-neutral-500 mb-2">
            Continuing for: <span className="font-medium">{email}</span>
          </p>
        )}

        {/* CURRENT LENDER */}
        <div>
          <label className="block font-semibold text-lg mb-2">
            Who is your current lender? *
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
            What type of loan do you currently have? *
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
          {[
            {
              id: "rate",
              label: "What is your current interest rate?",
              placeholder: "e.g. 6.10%",
            },
            {
              id: "balance",
              label: "What is your approximate loan balance?",
              placeholder: "e.g. $500,000",
            },
            {
              id: "repayments",
              label: "What are your current monthly repayments?",
              placeholder: "e.g. $2,450",
            },
            {
              id: "termRemaining",
              label: "How many years are left on your loan term?",
              placeholder: "e.g. 25",
            },
            {
              id: "propertyValue",
              label: "What is your property's estimated value?",
              placeholder: "e.g. $850,000",
            },
          ].map((field) => (
            <div key={field.id}>
              <label className="block font-semibold text-lg mb-2">
                {field.label}
              </label>
              <input
                type="text"
                placeholder={field.placeholder}
                value={(form as any)[field.id]}
                onChange={(e) =>
                  updateField(field.id as keyof typeof form, e.target.value)
                }
                required
                className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20"
              />
            </div>
          ))}
        </div>

        {/* SUBMIT CTA – styled like ButtonPill */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-block bg-[#0B0F1B] text-white font-semibold text-[17px]
                       rounded-full px-8 py-3.5 transition-all border border-[#0B0F1B]
                       hover:bg-white hover:text-black hover:border-black text-center
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending your details..." : "I'm ready for the next steps"}
          </button>
        </div>
      </form>
    </main>
  );
}
