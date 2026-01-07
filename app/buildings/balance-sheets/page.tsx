import Image from "next/image";

export default function BalanceSheetsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              Balance sheets
            </h1>

            <p className="text-lg text-gray-700 max-w-xl mb-6">
              Helping apartment owners improve cash flow and resilience over
              time.
            </p>

            <p className="text-gray-700 mb-4">
              Many inner-city apartments are owned by investors. They generate
              rent, carry debt, and sit inside a broader household balance
              sheet — yet they’re often treated as static assets.
            </p>

            <p className="text-gray-700 mb-8">
              Sold looks at how apartment ownership actually works in practice,
              and where small structural improvements can make ongoing costs
              easier to absorb.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
            <Image
              src="/stencils/individual-owner-stencil.svg"
              alt="An apartment shown as a simple, stable balance sheet"
              width={820}
              height={520}
              priority
            />
            <p className="mt-4 text-sm text-gray-600">
              Predictable costs, steadier cash flow, stronger long-term outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* OWNERS */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm bg-white">
          <div className="flex gap-5 items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">
                Designed for apartment owners
              </h2>

              <p className="text-gray-700 mb-4">
                Investment apartments behave differently to houses. They have
                shared costs, shared governance, and expenses that don’t always
                align neatly with rental income.
              </p>

              <ul className="text-gray-700 space-y-2">
                <li>
                  • Regular levies and maintenance contributions that fluctuate
                  over time.
                </li>
                <li>
                  • Exposure to special levies and one-off capital works.
                </li>
                <li>
                  • Debt that is often priced and structured independently of
                  building costs.
                </li>
              </ul>

              <p className="text-xs text-gray-500 mt-4">
                These dynamics matter when assessing real cash flow, not just
                headline rental yield.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE FOCUS ON */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-4">
            What we focus on
          </h2>

          <p className="text-gray-700 mb-6">
            We focus on small, practical improvements that compound over time —
            without changing governance, ownership structures, or risk profiles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="font-semibold mb-2">
                Cash flow alignment
              </div>
              <p className="text-sm text-gray-700">
                Helping owners better match income, debt servicing, and ongoing
                building costs.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="font-semibold mb-2">
                Cost predictability
              </div>
              <p className="text-sm text-gray-700">
                Reducing surprises by smoothing or offsetting some recurring
                expenses where possible.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="font-semibold mb-2">
                Balance sheet resilience
              </div>
              <p className="text-sm text-gray-700">
                Improving the ability of an apartment investment to absorb
                shocks over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GUARDRAILS */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-4">
            Guardrails
          </h2>

          <p className="text-gray-700 mb-4">
            This is not about leverage, speculation, or financial engineering.
          </p>

          <ul className="text-gray-700 space-y-2">
            <li>• No change to ownership or governance.</li>
            <li>• No pooling of individual owner funds.</li>
            <li>• No speculative investments or complex products.</li>
            <li>
              • Designed to be understandable, explainable, and low-risk.
            </li>
          </ul>

          <p className="text-xs text-gray-500 mt-4">
            The goal is boring stability — the kind that holds up over decades.
          </p>
        </div>
      </section>
    </main>
  );
}
