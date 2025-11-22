"use client";

import { useState } from "react";
import { ButtonPill } from "@/components/ButtonPill";

export default function RefinanceConsent() {
  const [preferredName, setPreferredName] = useState("");
  const [email, setEmail] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please add your email so we know where to send the form.");
      return;
    }

    try {
      setSubmitting(true);

      // ⬇️ TODO: Wire this to Brevo (Zapier or /api endpoint)
      // For now this just logs locally so the UI works.
      console.log("Refi consent submit", { preferredName, email });

      // After wiring to Brevo, you might redirect to the “thanks” page:
      // window.location.href = "/success";
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // Header & Footer come from the layout – don’t repeat them here.
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <section className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-black mb-6">
          Refinance your loan, properly.
        </h1>

        <p className="text-lg text-neutral-700 max-w-3xl leading-relaxed">
          This is the first step in giving your home loan a health check — without
          the pressure of sitting in a branch or being sold to. We’ll sense-check
          your current rate and repayments against what’s available on the market
          today.
        </p>

        <ul className="list-disc ml-6 mt-4 text-neutral-700 space-y-2">
          <li>No credit check at this stage.</li>
          <li>Honest advice — we work for you, not lenders.</li>
          <li>
            We only recommend a move if it actually puts you ahead and you’re
            feeling comfy.
          </li>
        </ul>
      </section>

      {/* Consent form card */}
      <section className="mt-10 bg-white border border-neutral-200 rounded-3xl p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Preferred name */}
          <div>
            <input
              type="text"
              placeholder="Preferred name"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
            <p className="mt-2 text-sm text-neutral-500">
              We’ll send your privacy and consent form here (check your spam
              folder too).
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-600 pt-2">
              {error}
            </p>
          )}

          {/* CTA button using ButtonPill styling */}
          <div className="pt-4">
            <ButtonPill href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto"
              >
                {submitting ? "Sending…" : "I'm ready for the next steps"}
              </button>
            </ButtonPill>
          </div>
        </form>
      </section>
    </main>
  );
}
