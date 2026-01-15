import OwnersEstimatePage from "./estimate/OwnersEstimate";
import { PdfExplainerCta } from "@/components/PdfExplainerCta";
import { WebinarSignupCta } from "@/components/WebinarSignupCta";

export default function LevyOffsetsForOwnersPage() {
  return (
    <main className="bg-white">
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* HERO */}
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Levy offsets for apartment owners
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            A voluntary levy offset for apartment owners
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Some apartment owners with mortgages may be able to offset part of
            their individual Owners Corporation levy. This page explains how
            levy offsets work, when they don’t, and the optional ways you can
            explore whether it’s relevant for you.
          </p>
        </header>

        {/* MONEY SHOT */}
        <section className="space-y-3">
          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
            <img
            src="/levy-offset-notice.png"
            alt="Illustrative levy notice showing levy offset"
            className="w-full h-auto"
            />
          </div>
          <p className="text-sm text-gray-500">
            An illustrative example of how a levy offset <em>might</em> appear
            on a levy notice if a refinance proceeds. Figures shown are
            indicative only.
          </p>
        </section>

        {/* WHAT THIS IS / ISN'T */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">
              What this is
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• A voluntary mortgage review for individual apartment owners</li>
              <li>• A way to check whether a lender rebate could offset part of your levy</li>
              <li>• Owner-initiated and optional</li>
              <li>• Separate from the Owners Corporation budget and administration</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">
              What this isn’t
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Not a requirement to refinance</li>
              <li>• Not guaranteed</li>
              <li>• Not tied to the building or other owners</li>
              <li>• Not something you’re automatically opting into</li>
            </ul>
          </div>
        </section>

        {/* WHY NOW */}
        <section className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Why are levy offsets being discussed now?
          </h2>
          <p className="text-gray-700">
            Apartment levies have risen as buildings age and maintenance costs
            increase. At the same time, many owners haven’t reviewed their
            mortgage in several years.
          </p>
          <p className="text-gray-700">
            In some cases, lender rebates attached to a mortgage can be
            redirected to offset part of an owner’s levy{" "}
            <span className="font-medium">
              but only if a genuinely better loan exists
            </span>
            .
          </p>
          <p className="text-gray-700">
            This page exists to help owners understand whether it’s worth
            exploring, or whether it’s not relevant in their case.
          </p>
        </section>

        {/* CHOICE ARCHITECTURE */}
        <section className="space-y-10">
          <header className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Choose how you’d like to explore this
            </h2>
            <p className="text-gray-700">
              Different owners want different levels of detail. All of the
              options below are optional.
            </p>
          </header>

          {/* OPTION A — ESTIMATE */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Get a quick estimate
            </h3>
            <p className="text-gray-700">
              Use the tool below to get a rough indication of what a levy offset{" "}
              <em>might</em> look like in your case.
            </p>

            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
              <OwnersEstimatePage />
            </div>

            <p className="text-sm text-gray-500">
              Indicative only. No credit checks. Nothing changes unless you
              choose to proceed.
            </p>
          </section>

          {/* OPTION B — PDF */}
          <section className="border border-gray-200 rounded-2xl p-6 space-y-3">
            <PdfExplainerCta />
          </section>

          {/* OPTION C — WEBINAR */}
          <section className="border border-gray-200 rounded-2xl p-6 space-y-3">
            <WebinarSignupCta pagePath="/buildings/levy-offsets/for-owners" />
          </section>

          {/* OPTION D — 1:1 */}
          <section className="border border-dashed border-gray-300 rounded-2xl p-6 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Prefer to sanity-check this for your situation?
            </h3>
            <p className="text-gray-700">
              If you’re already confident this might be relevant, you can book a
              short, no-obligation conversation.
            </p>

            <a
              href="https://calendly.com/rukid-sold/30min"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-gray-300 text-sm font-medium hover:border-gray-400"
            >
              Book a short chat
            </a>

            <p className="text-sm text-gray-500">
              A 15-minute sanity check. No applications, no pressure.
            </p>
          </section>
        </section>

        {/* WHO IT'S FOR */}
        <section className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Who this tends to be most relevant for
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Owners with a mortgage</li>
            <li>• Loans taken out or last reviewed 2+ years ago</li>
            <li>• Variable or expired fixed rates</li>
            <li>• Meaningful quarterly levies</li>
          </ul>
          <p className="text-gray-700">
            If your loan is very new or already highly optimised, this may not
            stack up, and we’ll say so.
          </p>
        </section>

        {/* FOOTER */}
        <footer className="pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 max-w-3xl">
            Sold Financial will only contact owners who choose to provide their
            details. Indicative information only. Outcomes depend on lender
            eligibility and market conditions at the time of review.
          </p>
        </footer>
      </section>
    </main>
  );
}
