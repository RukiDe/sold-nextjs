import type { ReactNode } from "react";
// TODO: replace this with a CouncilRatesEstimatePage when ready
import OwnersEstimatePage from "./OwnersEstimate";
import { PdfExplainerCta } from "@/components/PdfExplainerCta";
import { WebinarSignupCta } from "@/components/WebinarSignupCta";

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

function Step({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="border border-gray-200 rounded-2xl p-5 bg-white">
      <div className="flex items-start gap-3">
        <div className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-900">
          {n}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-sm text-gray-700">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function CouncilRateOffsetsPage() {
  return (
    <main className="bg-white">
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* HERO */}
        <header className="space-y-5">
          <div className="space-y-3 max-w-3xl">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Managing the cost of ownership • Houses
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
              A voluntary council rate offset for homeowners
            </h1>
            <p className="text-lg text-gray-700">
              Some homeowners with mortgages may be able to reduce their net
              household costs over time, in a way that can be applied against
              council rates. This page explains how a council rate offset works,
              when it doesn’t, and the optional ways you can explore whether
              it’s relevant for you.
            </p>
            <p className="text-lg text-gray-700">
              In some cases, the right outcome is simply confirmation that your setup already makes sense.
            </p>  
          </div>

          {/* Jump bar */}
          <div className="flex flex-wrap gap-2 pt-2">
            <JumpPill href="#estimate">Get an estimate</JumpPill>
            <JumpPill href="#pdf">Read the explainer</JumpPill>
            <JumpPill href="#webinar">Join the webinar</JumpPill>
            <JumpPill href="#chat">Book a chat</JumpPill>
          </div>

          {/* Trust strip */}
          <p className="text-xs text-gray-500">
            No credit checks • No obligation • You stay in control • Unsubscribe
            anytime
          </p>
        </header>

        {/* MONEY SHOT (optional) */}
        <section className="space-y-3">
          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
            <div className="flex justify-center px-3 py-4">
              <img
                src="/Council-Rates-Offset-Sold Financial.jpg"
                alt="Illustrative council rates notice showing how an offset could be applied"
                className="w-full max-w-md md:max-w-lg h-auto"
              />
            </div>
          </div>

          <p className="text-sm text-gray-500 max-w-3xl">
            Illustrative example only. Council rates are set and collected by
            councils as usual. If you proceed with an eligible option, any
            offset will appear as a credit. Figures shown are
            indicative only.
          </p>
        </section>

        {/* WHAT THIS IS / ISN'T */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <h2 className="text-lg font-semibold mb-3 text-gray-900">
              What this helps with
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>A voluntary mortgage review for individual homeowners</li>
              <li>
                A way to check whether a lender rebate could reduce your net
                household costs (and be applied against council rates)
              </li>
              <li>Owner-initiated and optional</li>
              <li>
                Separate from council budgets, policy, and billing systems
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <h2 className="text-lg font-semibold mb-3 text-gray-900">
              What this doesn’t require
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Not a council rebate, concession, or discount scheme</li>
              <li>Not a requirement to refinance</li>
              <li>Not guaranteed</li>
              <li>Not something you’re automatically opting into</li>
            </ul>
          </div>
        </section>

        {/* WHY NOW */}
        <section className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Why are council rate offsets being discussed now?
          </h2>
          <p className="text-gray-700">
            Council rates are one of the most “mortgage-like” household charges:
            they’re unavoidable, tied to the property, and tend to rise over
            time.
          </p>
          <p className="text-gray-700">
            At the same time, many homeowners haven’t reviewed their mortgage in
            several years. In some cases, lender rebates attached to a mortgage
            can be redirected back to the owner{" "}
            <span className="font-medium">
              but only if a genuinely better loan exists
            </span>
            .
          </p>
          <p className="text-gray-700">
            This page exists to help homeowners understand whether it’s worth
            exploring, or whether it’s not relevant in their case. For house owners, council rates are often the most visible ongoing cost, which makes them a practical place to start.
          </p>
        </section>

        {/* HOW IT WORKS STRIP */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">How it works</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Step
              n="1"
              title="Check your estimate"
              desc="A quick indication of what an offset might look like. No credit checks."
            />
            <Step
              n="2"
              title="If it stacks up, we review options"
              desc="A voluntary mortgage review to see if a genuinely better loan exists."
            />
            <Step
              n="3"
              title="If you proceed, you receive an offset payment"
              desc="A separate credit you control, which you can apply against rates or other property costs."
            />
          </div>
        </section>

        {/* CHOICE ARCHITECTURE */}
        <section className="space-y-10">
          <header className="space-y-2 max-w-3xl">
            <h2 className="text-2xl font-semibold text-gray-900">
              Choose how you’d like to explore this
            </h2>
            <p className="text-gray-700">
              Different homeowners want different levels of detail. All of the
              options below are optional.
            </p>
          </header>

          {/* OPTION A — ESTIMATE (recommended) */}
          <section id="estimate" className="space-y-4 scroll-mt-24">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Get a quick estimate
              </h3>
              <span className="text-xs font-medium px-2 py-1 rounded-full border border-gray-300 text-gray-700 bg-white">
                Recommended
              </span>
            </div>

            <p className="text-gray-700 max-w-3xl">
              Use the tool below to get a rough indication of what a council
              rate offset <em>might</em> look like in your case.
            </p>

            <div className="border border-gray-300 rounded-2xl p-6 bg-gray-50">
              {/* TODO: swap component when ready */}
              <OwnersEstimatePage />
            </div>

            <p className="text-sm text-gray-500 max-w-3xl">
              Indicative only. No credit checks. Nothing changes unless you
              choose to proceed.
            </p>
          </section>

          {/* OPTION B — PDF */}
          <section id="pdf" className="scroll-mt-24">
            <div className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-white space-y-3">
              <PdfExplainerCta />
            </div>
          </section>

          {/* OPTION C — WEBINAR */}
          <section id="webinar" className="scroll-mt-24">
            <div className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-white space-y-3">
              <WebinarSignupCta pagePath="/rates/council/offsets" />
            </div>
          </section>

          {/* OPTION D — 1:1 */}
          <section
            id="chat"
            className="border border-dashed border-gray-300 rounded-2xl p-6 md:p-8 space-y-3 scroll-mt-24 bg-white"
          >
            <div className="space-y-2 max-w-3xl">
              <h3 className="text-lg font-semibold text-gray-900">
                Prefer to sanity-check this for your situation?
              </h3>
              <p className="text-gray-700">
                If you’re already confident this might be relevant, you can book
                a short, no-obligation conversation.
              </p>
            </div>

            <a
              href="https://calendly.com/rukid-sold/30min"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-gray-300 text-sm font-medium hover:border-gray-400 transition"
            >
              Book a short chat
            </a>

            <p className="text-sm text-gray-500 max-w-3xl">
              A 15-minute sanity check. No applications, no pressure.
            </p>
          </section>
        </section>

        {/* WHO IT'S FOR */}
        <section className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Who this tends to be most relevant for
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Homeowners with a mortgage</li>
            <li>Loans taken out or last reviewed 2+ years ago</li>
            <li>Variable or expiring fixed rates</li>
            <li>People who prefer predictable, low-effort savings</li>
          </ul>
          <p className="text-gray-700">
            If your loan is very new or already highly optimised, this may not
            stack up, and we’ll say so.
          </p>

          <p className="text-sm text-gray-500">
            Council rates are set and collected independently by local
            government. This page describes an optional, privately-funded
            approach to reducing net household costs.
          </p>
        </section>
      </section>
    </main>
  );
}
