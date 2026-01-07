// app/page.tsx
import { ButtonPill } from "@/components/ButtonPill";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* HERO */}
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
            Making apartment costs easier to live with
          </h1>

          <div className="h-px w-16 bg-gray-200 mt-6 mb-6" />

          <p className="text-base sm:text-lg text-neutral-700 max-w-2xl">
            Creating shared upside for owners, residents and local businesses
            over time.
          </p>

          <p className="mt-4 text-sm sm:text-base text-neutral-700 max-w-2xl">
            Sold builds practical, low-risk layers around apartment living:
            levy relief, building-friendly funding, and smarter ownership
            outcomes for investment apartments. Nothing replaces levies or
            governance. We make the system easier to live with.
          </p>
        </div>

        {/* PANE: PATHWAYS */}
        <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* left copy */}
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                Get started
              </p>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Choose a pathway
              </h2>
              <p className="text-gray-700 leading-relaxed max-w-xl">
                Whether you’re acting as an individual borrower or as part of an
                Owners Corporation, start with the path that matches your
                situation. We’ll keep it simple and only recommend options that
                make sense.
              </p>

              <p className="mt-4 text-sm text-neutral-600">
                Voluntary participation • Transparent outcomes • Designed to be
                boring (in a good way)
              </p>
            </div>

            {/* right buttons */}
            <div className="space-y-6">
              {/* Buildings lane */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                  For buildings
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ButtonPill href="/buildings">Buildings</ButtonPill>
                  <ButtonPill href="/buildings/community">Community</ButtonPill>
                  <ButtonPill href="/buildings/levy-offsets">Levy offsets</ButtonPill>
                  <ButtonPill href="/buildings/balance-sheets">Balance sheets</ButtonPill>
                </div>
                <p className="mt-4 text-xs sm:text-sm text-neutral-500">
                  For Owners Corporations, residents, and local businesses.
                </p>
              </div>

              {/* Individuals lane */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                  For individuals
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ButtonPill href="/refinance">Refinance</ButtonPill>
                  <ButtonPill href="/first-home-buyer">First home buyer</ButtonPill>
                  <ButtonPill href="/owner-occupier">Owner occupier</ButtonPill>
                  <ButtonPill href="/investment">Investor</ButtonPill>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-neutral-500">
                  Where relevant, we can use government-regulated Open Banking
                  (CDR) for verified, read-only data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Optional small trust strip */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-neutral-700">
            No obligation to proceed. If the numbers don’t stack up, we’ll say
            so.
          </p>
          <p className="mt-2 text-xs text-neutral-500">
            Read-only Open Banking where used • Time-limited consent • Best
            Interests Duty applies to credit recommendations
          </p>
        </div>
      </section>
    </main>
  );
}
