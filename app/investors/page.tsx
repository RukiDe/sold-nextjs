// app/investors/page.tsx (or app/thesis/page.tsx)
// Investor page: long-duration thesis + stepping stones
// NOTE: Copy is exactly as drafted, feel free to tweak headings/spacing later.
import type { ReactNode } from "react";
export default function InvestorsPage() {
  return (
    <main className="bg-white">
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-20 space-y-14">
        {/* HEADER */}
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Sold • Investor thesis
          </p>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900">
            A long-duration financial company, starting with households
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl">
            Sold is built around a simple observation:
          </p>

          <Blockquote>
            Much of the money that shapes household outcomes already exists.
            <br />
            It just leaks away due to friction, opacity, and inconvenience.
          </Blockquote>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            Across travel, banking, housing, and long-term debt, individuals
            routinely leave value on the table not because of poor decisions,
            but because systems are optimised for institutions, not households.
          </p>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            Sold’s ambition is to systematically reclaim that value and return
            it to people in ways that compound over time.
          </p>
        </header>

        {/* WHY NOW */}
        <section className="space-y-4">
          <SectionTitle>Why this matters now</SectionTitle>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            Three forces shape the opportunity:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-900">Duration</h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                People are living longer. Financial decisions increasingly span
                decades, not years. Products optimised for short-term extraction
                break down under long-duration use.
              </p>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-900">
                Deleveraging pressure
              </h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                Households carry more long-term debt for longer. Small
                structural improvements, applied consistently, matter more than
                one-off optimisations.
              </p>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-900">
                Intergenerational wealth transfer
              </h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                One of the largest transfers of wealth in history is underway,
                but the rails that move that wealth remain expensive, opaque,
                and poorly aligned.
              </p>
            </Card>
          </div>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            Sold focuses on mechanisms that operate quietly, repeatedly, and
            over long periods of time.
          </p>
        </section>

        {/* THE PATTERN */}
        <section className="space-y-4">
          <SectionTitle>The pattern we follow</SectionTitle>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            Every initiative at Sold follows the same underlying pattern:
          </p>

          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Identify value that already exists</li>
            <li>Remove friction from reclaiming it</li>
            <li>Route it deliberately</li>
            <li>Let it compound over time</li>
          </ol>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            Not every household will engage with every layer. Each step earns
            the right to exist independently.
          </p>
        </section>

        {/* STEPPING STONES */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionTitle>Stepping stones, not a roadmap</SectionTitle>
            <p className="text-sm text-gray-500">
              Each layer only works if the previous one earns trust.
            </p>
          </div>

          <div className="grid gap-4">
            <ShellCard>
              <StoneTitle>Travel / VAT refunds</StoneTitle>
              <StoneSub>Reclaiming episodic value</StoneSub>
              <div className="mt-3 space-y-3 text-gray-700 leading-relaxed">
                <p>
                  When people travel internationally, many are entitled to VAT
                  refunds. Most never claim them.
                </p>
                <p>
                  Not because the value isn’t meaningful, but because the
                  process is fragmented, time-sensitive, and inconvenient.
                </p>
                <p>In this model:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>refunds are reclaimed via specialist partners</li>
                  <li>a percentage is retained as commission</li>
                  <li>
                    the remainder is returned automatically to the individual
                  </li>
                </ul>
                <p>
                  This is an example of reclaiming value that already exists,
                  without lending, balance sheet risk, or behaviour change.
                </p>
              </div>
            </ShellCard>

            <ShellCard>
              <StoneTitle>Neighbourhood cards</StoneTitle>
              <StoneSub>Everyday participation</StoneSub>
              <div className="mt-3 space-y-3 text-gray-700 leading-relaxed">
                <p>
                  Every transaction generates fees. Most flow invisibly to
                  institutions.
                </p>
                <p>Neighbourhood cards redirect a portion of everyday transaction economics:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>local usage</li>
                  <li>transparent fees</li>
                  <li>aligned incentives</li>
                </ul>
                <p>
                  This layer creates frequency and familiarity, without
                  requiring users to actively “manage” money.
                </p>
              </div>
            </ShellCard>

            <ShellCard>
              <StoneTitle>Mortgage refinance and managed offsets</StoneTitle>
              <StoneSub>Long-duration value redirection</StoneSub>
              <div className="mt-3 space-y-3 text-gray-700 leading-relaxed">
                <p>
                  For most households, the mortgage is the largest and
                  longest-running financial obligation.
                </p>
                <p>In this model:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Sold facilitates refinance where it produces a genuinely
                    better outcome
                  </li>
                  <li>lenders pay commissions as they already do</li>
                  <li>upfront commissions are retained</li>
                  <li>
                    ongoing commissions are rebated back to the customer over
                    time
                  </li>
                </ul>
                <p>That rebate can be automatically directed to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>a bill (e.g. levies or rates via BPAY)</li>
                  <li>a bank account</li>
                  <li>an investment account</li>
                </ul>
                <p>
                  This is the current wedge.
                  <br />
                  It’s narrow by design, but long in duration.
                </p>
              </div>
            </ShellCard>

            <ShellCard>
              <StoneTitle>Balance sheet restructuring</StoneTitle>
              <StoneSub>Only where trust exists</StoneSub>
              <div className="mt-3 space-y-3 text-gray-700 leading-relaxed">
                <p>At the far end of the spectrum are more structural interventions:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>partial sale of home equity</li>
                  <li>mortgage stake sales</li>
                  <li>securitisation</li>
                </ul>
                <p>These are high-trust, high-stakes decisions.</p>
                <p>
                  If Sold ever operates here, it does so:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>transparently</li>
                  <li>at materially lower fee levels than incumbents</li>
                  <li>with alignment to household outcomes</li>
                </ul>
                <p>
                  This layer is optional, trust-dependent, and long-term.
                </p>
              </div>
            </ShellCard>
          </div>
        </section>

        {/* COHERENCE */}
        <section className="space-y-4">
          <SectionTitle>Why this coheres</SectionTitle>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            These initiatives are not independent products.
          </p>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            They:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>serve the same customer</li>
            <li>operate over long time horizons</li>
            <li>rely on trust rather than coercion</li>
            <li>benefit from shared infrastructure and understanding</li>
          </ul>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            Sold does not need every customer to progress through every layer.
            <br />
            The model works because each layer stands on its own.
          </p>
        </section>

        {/* RESTRAINT */}
        <section className="space-y-4">
          <SectionTitle>Restraint is part of the strategy</SectionTitle>

          <p className="text-gray-700 max-w-3xl leading-relaxed">Sold is not:</p>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>trying to build everything at once</li>
            <li>forcing customers “up the stack”</li>
            <li>optimising for short-term extraction</li>
            <li>assuming complexity creates value</li>
          </ul>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            The ambition is long-term. The execution is intentionally narrow.
          </p>
        </section>

        {/* CLOSE */}
        <section className="space-y-4">
          <SectionTitle>A thin wedge into long-duration finance</SectionTitle>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            Sold starts by helping households reclaim value they already
            generate.
          </p>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            Over time, that becomes infrastructure for how long-duration debt,
            everyday transactions, and wealth transfer work in favour of the
            people carrying them.
          </p>

          <div className="pt-6 border-t border-gray-100 text-sm text-gray-500">
            Not a public product page. Shared for discussion.
          </div>
        </section>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Small helpers                                                               */
/* -------------------------------------------------------------------------- */

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
      {children}
    </h2>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
      {children}
    </div>
  );
}

function ShellCard({ children }: { children: ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-3xl p-6 sm:p-8 bg-white shadow-sm">
      {children}
    </div>
  );
}

function StoneTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-base font-semibold text-gray-900">{children}</h3>;
}

function StoneSub({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-sm text-gray-500">{children}</p>;
}

function Blockquote({ children }: { children: ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-3xl p-6 bg-gray-50">
      <p className="text-gray-800 leading-relaxed">{children}</p>
    </div>
  );
}
