// app/page.tsx
import { ButtonPill } from "@/components/ButtonPill";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT: HERO COPY + CTAs */}
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

            {/* CTA card */}
            <div className="mt-8 sm:mt-10 max-w-3xl rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <p className="text-sm font-medium text-gray-900 mb-4">
                Choose a pathway
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ButtonPill href="/refinance">Refinance</ButtonPill>
                <ButtonPill href="/first-home-buyer">First home buyer</ButtonPill>
                <ButtonPill href="/owner-occupier">Owner occupier</ButtonPill>
                <ButtonPill href="/investment">Investor</ButtonPill>
              </div>

              <p className="mt-5 text-xs sm:text-sm text-neutral-500 max-w-2xl">
                Government-regulated Open Banking • Read-only access • Time-limited
                consent • Best Interests Duty
              </p>
            </div>
          </div>

          {/* RIGHT: TRUST PANEL */}
          <div className="lg:pt-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                Why people use Sold
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Calm, defensible decisions
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                Sold is designed to reduce friction and improve accuracy, using
                verified data. If there isn&apos;t a clearly better option,
                we&apos;ll tell you.
              </p>

              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gray-300" />
                  <span>
                    Government-regulated Open Banking (CDR)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gray-300" />
                  <span>Read-only access (we can&apos;t move money)</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gray-300" />
                  <span>Time-limited consent, withdraw anytime</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gray-300" />
                  <span>Best Interests Duty applies to recommendations</span>
                </li>
              </ul>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-sm text-neutral-600">
                  Want the detailed version?
                </p>
                <div className="mt-3">
                  <ButtonPill href="/customers" variant="secondary">
                    How Open Banking works
                  </ButtonPill>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
