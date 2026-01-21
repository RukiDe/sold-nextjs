"use client";

import type { ReactNode } from "react";
// TODO: swap this to a HousesEstimatePage when you have it
import OwnersEstimatePage from "./OwnersEstimate";
import { PdfExplainerCta } from "@/components/PdfExplainerCta";

function JumpPill({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-900 hover:border-gray-300 transition"
    >
      {children}
    </a>
  );
}

function ShellCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "border border-gray-200 rounded-3xl bg-white shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function HousesPage() {
  return (
    <main className="bg-white">
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-16 space-y-14">
        {/* HERO */}
        <header className="space-y-6">
          {/* subtle editorial frame */}
          <div className="border-t border-gray-100 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: hero copy */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3 max-w-3xl">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Houses • Mortgage rebates to rates
                  </p>

                  <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">
                    Rebate your mortgage commission into relief
                  </h1>

                  <p className="text-lg md:text-xl text-gray-700">
                    If you refinance through Sold, any ongoing trail commissions
                    are returned to you over time.
                  </p>

                  <p className="text-lg md:text-xl text-gray-700">
                    For houses, that relief can be applied to your council rates (via
                    BPAY) or paid straight to your bank account. Your choice.
                  </p>
                </div>

                <p className="text-xs text-gray-500">
                  No credit checks • Voluntary • You stay in control
                </p>

                {/* Flow line as a “system label” */}
                <div className="inline-flex rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="mt-4 text-sm font-medium text-gray-700">
                    Mortgage → Refinance → Ongoing rebate → Automatically directed to levies, cash, or investments
                  </p>
                </div>
              </div>

              {/* Right: destination rail */}
              <div className="lg:col-span-5">
                <ShellCard className="p-6 md:p-7 relative overflow-hidden">
                  {/* micro-ornament (dot grid) */}
                  <div
                    className="absolute -top-10 -right-10 h-40 w-40 opacity-[0.18]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.25) 1px, transparent 0)",
                      backgroundSize: "10px 10px",
                    }}
                  />

                  <div className="relative space-y-4">
                    <div className="text-sm font-semibold text-gray-900">
                      Where the rebate can go
                    </div>

                    <div className="relative space-y-3">
                      {/* connector line */}
                      <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200" />

                      <div className="pl-6">
                        <div className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3 bg-white">
                          <span className="text-sm text-gray-800">
                            Council rates BPAY reference
                          </span>
                          <span className="text-xs text-gray-500 rounded-full border border-gray-200 px-2 py-1">
                            automatic
                          </span>
                        </div>
                      </div>

                      <div className="pl-6">
                        <div className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3 bg-white">
                          <span className="text-sm text-gray-800">Bank account</span>
                          <span className="text-xs text-gray-500 rounded-full border border-gray-200 px-2 py-1">
                            automatic
                          </span>
                        </div>
                      </div>

                      <div className="pl-6">
                        <div className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3 bg-white">
                          <span className="text-sm text-gray-800">
                            Investment account
                          </span>
                          <span className="text-xs text-gray-500 rounded-full border border-gray-200 px-2 py-1">
                            automatic
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Jump bar (kept near hero visually) */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        <JumpPill href="#preview">Check my options</JumpPill>
                        <JumpPill href="#timeline">See the pattern</JumpPill>
                        <JumpPill href="#pdf">Read the explainer</JumpPill>
                        <JumpPill href="#chat">Talk it through</JumpPill>
                      </div>
                    </div>
                  </div>
                </ShellCard>
              </div>
            </div>
          </div>
        </header>

        {/* HOW IT WORKS */}
        <section className="max-w-5xl">
          <ShellCard className="p-6 md:p-8 bg-gray-50">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                How it works (houses)
              </h2>

              <ol className="space-y-3 text-gray-700 list-decimal pl-5">
                <li>
                  We check whether refinancing your mortgage produces a genuinely
                  better outcome (rate, structure, offsets, total cost).
                </li>
                <li>
                  If you choose to proceed, Sold receives an ongoing trail
                  commission from the lender.
                </li>
                <li>
                  We rebate that commission back to you over time, as either:
                  <ul className="list-disc pl-5 mt-1">
                    <li>credits to your council rates BPAY reference, or</li>
                    <li>direct payments to your bank account.</li>
                    <li>direct payments to your investment account.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </ShellCard>
        </section>

        {/* WHAT THIS IS / ISN'T */}
        <section className="max-w-5xl">
          <ShellCard className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  What this helps with
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Reducing your net household costs over time</li>
                  <li>Directing bill relief to rates or cash (your choice)</li>
                  <li>Getting a clear, plain-English refinance recommendation</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  What this isn’t
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Not a council discount, concession, or government rebate</li>
                  <li>Not a requirement to refinance</li>
                  <li>Not guaranteed</li>
                  <li>Not something you’re automatically opting into</li>
                </ul>
              </div>
            </div>
          </ShellCard>
        </section>

        {/* CTA LADDER */}
        <section className="space-y-6">
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Primary */}
            <section
              id="preview"
              className="lg:col-span-7 space-y-4 scroll-mt-24"
            >
              <ShellCard className="p-6 md:p-8 border-gray-300 shadow-md">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Check if my mortgage can create rates relief
                  </h3>

                  <p className="text-gray-700 max-w-3xl">
                    Connect securely and we’ll assess whether a refinance is worthwhile,
                    and what ongoing bill relief could look like for you.
                  </p>

                  <div className="border border-gray-300 rounded-2xl p-6 bg-gray-50">
                    <OwnersEstimatePage />
                  </div>

                  <p className="text-sm text-gray-500">
                    Indicative only. Read-only. No credit checks. Nothing changes unless
                    you choose to proceed.
                  </p>
                </div>
              </ShellCard>
            </section>

            {/* Secondary stack */}
            <div className="lg:col-span-5 space-y-6">
              <section id="pdf" className="scroll-mt-24">
                <ShellCard className="p-6 md:p-8">
                  <div className="space-y-3">
                    <PdfExplainerCta />
                  </div>
                </ShellCard>
              </section>

              <section id="chat" className="scroll-mt-24">
                <ShellCard className="p-6 md:p-8">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Prefer to talk it through?
                    </h3>
                    <p className="text-gray-700">
                      If you want a quick sanity check first, book a short, no-pressure chat.
                    </p>

                    <a
                      href="https://calendly.com/rukid-sold/30min"
                      className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-gray-300 text-sm font-medium hover:border-gray-400 transition"
                    >
                      Book a short chat
                    </a>

                    <p className="text-sm text-gray-500">
                      15 minutes. No applications, no obligation.
                    </p>
                  </div>
                </ShellCard>
              </section>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
