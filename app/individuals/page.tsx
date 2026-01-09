import Image from "next/image";
import { ButtonPill } from "@/components/ButtonPill";

export default function IndividualsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              Individuals
            </h1>

            <p className="text-lg text-gray-700 max-w-xl mb-6">
              Mortgage help that’s practical, defensible, and easy to understand.
            </p>

            <p className="text-gray-700 mb-4">
              Sold helps you assess whether a better mortgage outcome exists and
              what it would actually change for you: repayments, cash flow, and
              long-term cost.
            </p>

            <p className="text-gray-700 mb-8">
              Where relevant, we use Australia’s Open Banking system to verify
              key financial information securely.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <ButtonPill href="#pathways">Home Loans</ButtonPill>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Government-regulated • Read-only • Time-limited access
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
            <Image
              src="/stencils/individual-owner-stencil.svg"
              alt="Individual finance overview"
              width={820}
              height={520}
              priority
            />
            <p className="mt-4 text-sm text-gray-600">
              Clear outcomes. Offset levies. No obligations.
            </p>
          </div>
        </div>
      </section>

      {/* PATHWAYS */}
      <section
        id="pathways"
        className="max-w-5xl mx-auto px-4 pb-16 scroll-mt-20"
      >
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-4">Choose a pathway</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Refinance</h3>
              <p className="text-gray-700 mb-4">
                Review your existing mortgage and see whether a better structure
                exists.
              </p>
              <ButtonPill href="/refinance">Start refinance</ButtonPill>
            </div>

            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">First home buyer</h3>
              <p className="text-gray-700 mb-4">
                Understand borrowing power, deposit position, and lender fit
                before you buy.
              </p>
              <ButtonPill href="/first-home-buyer">Start FHB</ButtonPill>
            </div>

            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Owner occupier</h3>
              <p className="text-gray-700 mb-4">
                Buying or restructuring? Focus on what actually improves your
                position.
              </p>
              <ButtonPill href="/owner-occupier">Start owner occupier</ButtonPill>
            </div>

            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Investor</h3>
              <p className="text-gray-700 mb-4">
                Assess true cash flow and whether your debt still matches the
                asset.
              </p>
              <ButtonPill href="/investment">Start investor</ButtonPill>
            </div>
          </div>
        </div>
      </section>

      {/* OPEN BANKING */}
      <section
        id="open-banking"
        className="max-w-5xl mx-auto px-4 pb-20 scroll-mt-20"
      >
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-4">
            Your data, verified. Your control, guaranteed.
          </h2>

          <p className="text-gray-700 mb-6">
            Open Banking provides read-only, time-limited access to verified
            financial data under Australia’s Consumer Data Right.
          </p>

          <ButtonPill href="https://app.frollo.com.au/register?types=consolidated&external_party_key=RUKI001">
            Connect via Open Banking
          </ButtonPill>

          <p className="text-sm text-gray-500 mt-4">
            Connecting doesn’t obligate you to refinance.
          </p>
        </div>
      </section>
    </main>
  );
}
