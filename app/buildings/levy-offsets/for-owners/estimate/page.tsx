"use client";

import { useMemo, useState } from "react";
import { ButtonPill } from "@/components/ButtonPill";

const TRAIL_RATE = 0.0015; // 0.15% p.a.
const MIN = 100_000;
const MAX = 2_000_000;
const STEP = 25_000;

const fmt = (n: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);

const validEmail = (e: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim().toLowerCase());

export default function OwnersEstimatePage() {
  const [hasMortgage, setHasMortgage] = useState<"" | "yes" | "no">("");
  const [loan, setLoan] = useState(500_000);
  const [touched, setTouched] = useState(false);

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const annual = useMemo(() => Math.round(loan * TRAIL_RATE), [loan]);
  const show = hasMortgage === "yes" && touched;

  async function submit() {
    setErr("");

    if (!show) return setErr("Move the slider to see your estimate.");
    if (!validEmail(email)) return setErr("Please enter a valid email.");

    setSubmitting(true);

    try {
      const payload = {
        email: email.trim(),
        attributes: {
          OFFSETESTIMATE: true,
          OFFSETESTIMATE_LOAN: loan,
          OFFSETESTIMATE_ANNUAL: annual,
          OFFSETESTIMATE_RATE: TRAIL_RATE,
          OFFSETESTIMATE_PAGE: "/buildings/levy-offsets/for-owners/estimate",
        },
      };

      const r = await fetch("/api/brevo/levy-offset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Prefer JSON errors when available
      let data: any = null;
      const ct = r.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        data = await r.json();
      } else {
        const text = await r.text();
        data = { error: text };
      }

      if (!r.ok) {
        throw new Error(data?.error || "Couldn’t send right now. Please try again.");
      }

      setSent(true);
    } catch (e: any) {
      setSent(false);
      setErr(e?.message || "Couldn’t send right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <section className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
          Levy offsets for apartment owners
        </p>
        <h1 className="text-3xl font-semibold mb-4">
          Estimate your levy offset in seconds
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          If you have a mortgage, you <span className="font-medium">may</span>{" "}
          be able to offset part of your apartment levy. Quick estimate only. No
          credit checks.
        </p>

        <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-900 mb-3">
              Do you currently have a mortgage?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setHasMortgage("yes");
                  setSent(false);
                  setErr("");
                }}
                className={[
                  "px-4 py-2 rounded-full border text-sm font-medium",
                  hasMortgage === "yes"
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-900 border-gray-200 hover:border-gray-300",
                ].join(" ")}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => {
                  setHasMortgage("no");
                  setTouched(true);
                  setSent(false);
                  setErr("");
                }}
                className={[
                  "px-4 py-2 rounded-full border text-sm font-medium",
                  hasMortgage === "no"
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-900 border-gray-200 hover:border-gray-300",
                ].join(" ")}
              >
                No
              </button>
            </div>

            {hasMortgage === "no" && (
              <p className="mt-4 text-sm text-gray-700">
                No worries. This specific offset is driven by an owner’s
                mortgage, so it won’t apply here.
              </p>
            )}
          </div>

          {hasMortgage === "yes" && (
            <div>
              <div className="flex items-end justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">
                  Roughly how much is your loan?
                </p>
                <p className="text-sm text-gray-900 font-semibold">
                  {fmt(loan)}
                </p>
              </div>

              <input
                type="range"
                min={MIN}
                max={MAX}
                step={STEP}
                value={loan}
                onChange={(e) => {
                  setLoan(Number(e.target.value));
                  setTouched(true);
                  setSent(false);
                  setErr("");
                }}
                className="w-full"
                aria-label="Loan amount"
              />

              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{fmt(MIN)}</span>
                <span>{fmt(MAX)}</span>
              </div>

              {show && (
                <div className="mt-5 border border-gray-200 rounded-xl bg-gray-50 p-4 space-y-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Your estimate
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {fmt(annual)} / year
                  </p>
                  <p className="text-sm text-gray-700">
                    Based on an indicative{" "}
                    <span className="font-medium">0.15% p.a.</span> ongoing
                    lender trail on a {fmt(loan)} loan. Rates vary by lender.
                  </p>

                  <div className="mt-3 border border-gray-200 rounded-xl bg-white p-4">
                    {sent ? (
                      <p className="text-sm text-gray-700">
                        Sent ✅ Check your inbox for next steps (including booking
                        a call).
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-700 mb-3">
                          Want the details and next steps? Enter your email.
                        </p>
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
                            {submitting ? "Sending..." : "Email me the details"}
                          </button>
                        </div>
                      </>
                    )}

                    {err && <p className="text-xs text-red-600 mt-2">{err}</p>}
                    {!sent && (
                      <p className="text-xs text-gray-500 mt-3">
                        No spam. Unsubscribe anytime.
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-gray-500">
                    Indicative estimate only. Offsets aren’t guaranteed and depend
                    on lender terms and eligibility at the time of review.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8">
          <ButtonPill
            href="/buildings/levy-offsets/for-owners"
            variant="secondary"
          >
            Back
          </ButtonPill>
        </div>
      </section>
    </main>
  );
}
