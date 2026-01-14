"use client";

import { useState } from "react";

const validEmail = (e: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim().toLowerCase());

export function PdfExplainerCta() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  async function submit() {
    setErr("");
    if (!validEmail(email)) return setErr("Please enter a valid email.");

    setSubmitting(true);
    try {
      const payload = {
        email: email.trim(),
        flow: "pdf_explainer",
        attributes: {
          LEVYOFFSETS_PDF_REQUESTED: true,
          LEVYOFFSETS_SOURCE: "for-owners page",
          LEVYOFFSETS_PAGE: "/buildings/levy-offsets/for-owners",
        },
      };

      const r = await fetch("/api/brevo/levy-offset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const ct = r.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await r.json() : { error: await r.text() };

      if (!r.ok) throw new Error(data?.error || "Couldn’t send right now. Please try again.");

      setSent(true);
    } catch (e: any) {
      setSent(false);
      setErr(e?.message || "Couldn’t send right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">
        Prefer to read this properly?
      </h2>

      <p className="text-gray-700 mb-5">
        We’ll email you a short explainer PDF (2–3 mins) that walks through:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-6">
        <li>how levy offsets work</li>
        <li>when they don’t</li>
        <li>risks and limitations</li>
        <li>common questions from apartment owners</li>
      </ul>

      {sent ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
          Sent. Check your inbox for the PDF.
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className={[
                "px-5 py-3 rounded-full border text-sm font-medium transition",
                submitting
                  ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
                  : "bg-black text-white border-black hover:opacity-95",
              ].join(" ")}
            >
              {submitting ? "Sending..." : "Email me the explainer (PDF)"}
            </button>
          </div>

          {err && <p className="text-xs text-red-600 mt-2">{err}</p>}

          <p className="text-xs text-gray-500 mt-3">
            We’ll only email you what you request. Unsubscribe anytime.
          </p>
        </>
      )}
    </div>
  );
}
