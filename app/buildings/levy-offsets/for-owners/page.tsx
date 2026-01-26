// app/buildings/levy-offsets/for-owners/page.tsx
"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import OwnersEstimatePage from "@/app/apartments/OwnersEstimate";
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
      className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition"
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

export default function ForOwnersLevyOffsetsPage() {
  return (
    <main className="bg-white">
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-16 space-y-14">
        {/* HERO */}
        <header className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: hero copy */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3 max-w-3xl">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Buildings • Levy offsets • For owners
                  </p>

                  <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">
                    See what a levy credit looks like in real life
                  </h1>

                  <p className="text-lg md:text-xl text-gray-700">
                    If you refinance through Sold, any ongoing trail commissions
                    are returned to you over time.
                  </p>

                  <p className="text-lg md:text-xl text-gray-700">
                    For owners in participating buildings, that relief can be
                    credited directly to{" "}
                    <span className="font-medium text-gray-900">
                      your individual levy BPAY reference or paid straight to your
                      bank account
                    </span>
                    . Not pooled. Not shared. Your choice.
                  </p>
                </div>

                <p className="text-xs text-gray-500">
                  No credit checks • Voluntary • You stay in control
                </p>

                {/* Flow line */}
                <div className="rounded-2xl border border-gray-300 bg-white px-5 py-4">
                  <p className="text-[13px] font-semibold text-gray-800 tracking-tight">
                    Mortgage → Refinance → Ongoing rebate → Automatically credited
                    (quarterly)
                  </p>
                </div>
              </div>

              {/* Right: image rail */}
              <div className="lg:col-span-5">
                <ShellCard className="p-6 md:p-7 relative overflow-hidden lg:sticky lg:top-24">
                  {/* dot grid ornament */}
                  <div
                    className="absolute -top-10 -right-10 h-40 w-40 opacity-[0.16]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.25) 1px, transparent 0)",
                      backgroundSize: "10px 10px",
                    }}
                  />

                  <div className="relative space-y-4">
                    <div className="text-sm font-semibold text-gray-900">
                      Example: levy notice with a credit
                    </div>

                    <p className="text-sm text-gray-700">
                      Levies don’t change. This is simply a credit applied to{" "}
                      <span className="font-medium text-gray-900">your</span>{" "}
                      levy account reference.
                    </p>

                    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                      <div className="relative w-full aspect-[4/5] bg-white">
                        <Image
                          src="/strata-levy-offset-example.png"
                          alt="Example levy notice showing a broker rebate levy offset"
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 420px"
                          priority
                        />
                      </div>
                    </div>

                    {/* Jump bar */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        <JumpPill href="#preview">Check my options</JumpPill>
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

        {/* SECTION DIVIDER */}
        <div className="border-t border-gray-100" />

        {/* HOW IT WORKS */}
        <section className="max-w-5xl">
          <ShellCard className="p-6 md:p-10 bg-white">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                How it works (for owners)
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
                <li>We rebate that commission back to you.</li>
              </ol>

              <p className="text-sm text-gray-600">
                Note: This is an individual decision.
              </p>
            </div>
          </ShellCard>
        </section>

        {/* WHAT THIS DOESN’T CHANGE / REQUIRES */}
        <section className="max-w-5xl">
          <ShellCard className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  What this doesn’t change
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Owners Corporation budgets or decisions</li>
                  <li>Levy amounts or schedules</li>
                  <li>Other owners’ outcomes</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  What it requires
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>An individual mortgage</li>
                  <li>Your consent to explore options</li>
                  <li>A genuinely better loan outcome (or we’ll say so)</li>
                </ul>
              </div>
            </div>
          </ShellCard>
        </section>

        {/* ESTIMATOR + CTAs */}
        <section className="space-y-10 max-w-5xl">
          {/* Estimator */}
          <section id="preview" className="space-y-4 scroll-mt-24">
            <div className="border border-gray-300 rounded-2xl p-6 bg-gray-50 overflow-hidden">
              <OwnersEstimatePage />
            </div>
          </section>

          {/* Secondary CTAs */}
          <div className="grid gap-6 lg:grid-cols-2">
            <section id="pdf" className="scroll-mt-24">
              <ShellCard className="p-6 md:p-8 h-full">
                <div className="space-y-3">
                  <div className="[&_*]:max-w-full">
                    <PdfExplainerCta />
                  </div>
                </div>
              </ShellCard>
            </section>

            <section id="chat" className="scroll-mt-24">
              <ShellCard className="p-6 md:p-8 h-full">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Prefer to talk it through?
                  </h3>
                  <p className="text-gray-700">
                    If you want a quick sanity check first, book a short,
                    no-pressure chat.
                  </p>

                  <a
                    href="https://calendly.com/rukid-sold/30min"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-gray-300 text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition"
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
        </section>
      </section>
    </main>
  );
}
