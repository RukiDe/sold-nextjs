"use client";

import { useMemo, useState } from "react";
import { ButtonPill } from "@/components/ButtonPill";

const TRAIL_RATE = 0.0015; // 0.15% p.a.
const MIN = 100_000;
const MAX = 2_000_000;
const STEP = 25_000;

// Optional: show a “Book a quick call” button after email is sent
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "";

const fmt0 = (n: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);

const validEmail = (e: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim().toLowerCase());

export default function OwnersEstimate() {
  const [hasMortgage, setHasMortgage] = useState<"" | "yes" | "no">("");
  const [loan, setLoan] = useState(500_000);

  // Treat "touched" as “user has confirmed they want an estimate”.
  // We set it true immediately on “Yes” so the estimate appears right away.
  const [touched, setTouched] = useState(false);

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const annual = useMemo(() => Math.round(loan * TRAIL_RATE), [loan]);
  const quarterly = useMemo(() => Math.round(annual / 4), [annual]);

  const showEstimate = hasMortgage === "yes" && touched;

  const quickSet = (val: number) => {
    setLoan(val);
    setTouched(true);
    setSent(false);
    setErr("");
  };

  async function submit() {
    setErr("");

    if (!showEstimate) return setErr("Select ‘Yes’ to see an estimate.");
    if (!validEmail(email)) return setErr("Please enter a valid email.");

    setSubmitting(true);

    try {
      const payload = {
        email: email.trim(),
        attributes: {
          OFFSETESTIMATE: true,
          OFFSETESTIMATE_LOAN: loan,
          OFFSETESTIMATE_ANNUAL: annual,
          OFFSETESTIMATE_QUARTERLY: quarterly,
          OFFSETESTIMATE_RATE: TRAIL_RATE,
          OFFSETESTIMATE_PAGE: "/buildings/levy-offsets/for-owners/estimate",
        },
      };

      const r = await fetch("/api/brevo/levy-offset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: any = null;
      const ct = r.headers.get("content-type") || "";
      if (ct.includes("application/json")) data = await r.json();
      else data = { error: await r.text() };

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
          {/* Mortgage toggle */}
          <div>
            <p className="text-sm font-medium text-gray-900 mb-3">
              Do you currently have a mortgage?
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setHasMortgage("yes");
                  setTouched(true); // show estimate immediately
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
                  setTouched(false);
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
                No worries. This particular offset is driven by an owner’s
                mortgage, so it won’t apply here.
              </p>
            )}
          </div>

          {/* Loan slider + estimate */}
          {hasMortgage === "yes" && (
            <div>
              <div className="flex items-end justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">
                  Roughly how much is your loan?
                </p>
                <p className="text-sm text-gray-900 font-semibold">
                  {fmt0(loan)}
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
                <span>{fmt0(MIN)}</span>
                <span>{fmt0(MAX)}</span>
              </div>

              {/* Quick presets */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[250_000, 400_000, 600_000, 800_000, 1_000_000].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => quickSet(v)}
                    className="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-900 hover:border-gray-300"
                  >
                    {fmt0(v)}
                  </button>
                ))}
              </div>

              {showEstimate && (
                <div className="mt-6 border border-gray-200 rounded-xl bg-gray-50 p-4 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        Your estimated levy offset
                      </p>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">
                        {fmt0(annual)} / year
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        About {fmt0(quarterly)} per quarter (roughly).
                      </p>
                    </div>

                    <div className="hidden sm:block text-right">
                      <p className="text-xs text-gray-500">Indicative rate</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {(TRAIL_RATE * 100).toFixed(2)}% p.a.
                      </p>
                    </div>
                  </div>

                  {/* “Why” block */}
                  <div className="border border-gray-200 rounded-xl bg-white p-4">
                    <p className="text-sm text-gray-900 font-medium mb-1">
                      How this works (in plain English)
                    </p>
                    <p className="text-sm text-gray-700">
                      Sold offers a voluntary mortgage review. If (and only if)
                      a better loan exists, a lender rebate{" "}
                      <span className="font-medium">may</span> be credited
                      against your levy. If it doesn’t stack up, nothing
                      changes.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      No credit checks. No obligation.
                    </p>
                  </div>

                  {/* Email capture */}
                  <div className="border border-gray-200 rounded-xl bg-white p-4">
                    {sent ? (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-700">
                          Sent. Check your inbox for next steps.
                        </p>

                        {BOOKING_URL ? (
                          <div className="space-y-2">
                            <a
                              href={BOOKING_URL}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center px-5 py-3 rounded-full border text-sm font-medium bg-black text-white border-black hover:opacity-95"
                            >
                              Book a quick call
                            </a>
                            <p className="text-xs text-gray-500">
                              Optional. If you’d rather not chat, just reply to
                              the email with any questions.
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500">
                            (Optional) Add{" "}
                            <span className="font-mono">
                              NEXT_PUBLIC_BOOKING_URL
                            </span>{" "}
                            to show a “Book a call” button here.
                          </p>
                        )}
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-gray-700 mb-3">
                          Want the breakdown and next steps? Email it to
                          yourself.
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

                        {BOOKING_URL && (
                          <div className="mt-3">
                            <a
                              href={BOOKING_URL}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-500"
                            >
                              Or book a 10-min call
                            </a>
                            <p className="text-xs text-gray-500 mt-1">
                              Totally optional. No pressure.
                            </p>
                          </div>
                        )}

                        <p className="text-xs text-gray-500 mt-3">
                          No spam. Unsubscribe anytime.
                        </p>
                      </>
                    )}

                    {err && <p className="text-xs text-red-600 mt-2">{err}</p>}
                  </div>

                  <p className="text-xs text-gray-500">
                    Indicative estimate only. Offsets aren’t guaranteed and
                    depend on lender terms and eligibility at the time of
                    review.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
