// app/page.tsx
import { ButtonPill } from "@/components/ButtonPill";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* HERO */}
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
            Clearer mortgage decisions, built on verified data
          </h1>

          <div className="h-px w-16 bg-gray-200 mt-6 mb-6" />

          <p className="text-base sm:text-lg text-neutral-700">
            Sold uses Australia&apos;s Open Banking system to verify your
            financial position and assess options across the market.
          </p>

          <p className="mt-3 text-sm sm:text-base text-neutral-700 max-w-xl">
            No credit checks to get started. No obligation to proceed. A
            recommendation is only made if the numbers clearly make sense.
          </p>
        </div>

        {/* PANE 1: PATHWAYS (copy left, buttons right) */}
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
                Pick the scenario that matches you. We&apos;ll assess your current
                position and show whether there&apos;s a clearly better option, or
                whether you&apos;re already in a strong spot.
              </p>

              <p className="mt-4 text-sm text-neutral-600">
                No obligation to proceed. If the numbers don&apos;t stack up,
                we&apos;ll say so.
              </p>
            </div>

            {/* right buttons */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ButtonPill href="/refinance">Refinance</ButtonPill>
                <ButtonPill href="/first-home-buyer">First home buyer</ButtonPill>
                <ButtonPill href="/owner-occupier">Owner occupier</ButtonPill>
                <ButtonPill href="/investment">Investor</ButtonPill>
              </div>

              <p className="mt-5 text-xs sm:text-sm text-neutral-500">
                Government-regulated Open Banking • Read-only access • Time-limited
                consent • Best Interests Duty
              </p>
            </div>
          </div>
        </div>

        {/* PANE 2: OPEN BANKING (under hero, separate pane) */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                Open Banking
              </p>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Verified data, under your control
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Open Banking replaces “trust-me” processes with verified data.
                It reduces back-and-forth, improves accuracy, and supports
                defensible recommendations.
              </p>
            </div>

            <div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gray-300 flex-shrink-0" />
                  <span>Government-regulated Open Banking (CDR)</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gray-300 flex-shrink-0" />
                  <span>Read-only access (we can&apos;t move money)</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gray-300 flex-shrink-0" />
                  <span>Time-limited consent, withdraw anytime</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gray-300 flex-shrink-0" />
                  <span>Best Interests Duty applies to recommendations</span>
                </li>
              </ul>

              <div className="mt-6">
                <ButtonPill href="/customers" variant="secondary">
                  How Open Banking works
                </ButtonPill>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
