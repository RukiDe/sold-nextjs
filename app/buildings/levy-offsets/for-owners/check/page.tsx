import Image from "next/image";
import { ButtonPill } from "@/components/ButtonPill";

export default function LevyOffsetsForOwnersCheckPage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-10">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
          For individual apartment owners
        </p>

        <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
          Reduce the cashflow impact of apartment levies
        </h1>

        <p className="text-lg text-gray-700 mb-3">
          A voluntary mortgage review for apartment owners.
          <span className="block">
            Nothing changes unless a clearly better loan exists.
          </span>
        </p>

        <p className="text-sm text-gray-600 mb-8">
          Government-regulated Open Banking • Read-only access • No obligation
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Update this href to your exact refinance start if needed */}
          <ButtonPill href="/refinance">
            Check if a levy offset could apply
          </ButtonPill>

          <ButtonPill href="/buildings/levy-offsets/for-owners" variant="secondary">
            Learn more
          </ButtonPill>
        </div>

        <p className="text-sm text-gray-500 mt-6 max-w-2xl">
          No credit checks to get started. If the numbers don&apos;t clearly stack
          up, we&apos;ll say so.
        </p>
      </section>

      {/* CONTEXT */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Context
            </p>
            <h2 className="text-2xl font-semibold mb-3">
              Why owners are looking at this now
            </h2>

            <p className="text-gray-700 mb-4">
              Apartment levies and insurance costs have risen sharply in recent
              years. At the same time, many owners haven&apos;t reviewed their
              mortgage despite major changes in interest rates and lender pricing.
            </p>

            <p className="text-gray-700">
              This creates a simple question: if your mortgage could be improved
              anyway, could that improvement help reduce the ongoing cashflow
              pressure of levies?
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Key point
            </p>
            <h3 className="text-lg font-semibold mb-3">
              This is owner-initiated
            </h3>

            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>It&apos;s optional</li>
              <li>It&apos;s based on your individual mortgage</li>
              <li>
                It doesn&apos;t change your building&apos;s budget, levies, or
                maintenance plan
              </li>
              <li>Non-participating owners are unaffected</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
          How it works
        </p>
        <h2 className="text-2xl font-semibold mb-6">
          Simple structure. No pooled funds.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-3">
              In three steps
            </h3>

            <ol className="list-decimal pl-5 text-gray-700 space-y-2">
              <li>You review your existing mortgage</li>
              <li>If a clearly better loan exists, a refinance may proceed</li>
              <li>
                Where a lender pays an ongoing trail commission, 100% of that amount can be
                credited against <span className="font-medium">your</span> levy
              </li>
            </ol>

            <div className="mt-5 border border-gray-200 rounded-xl p-4 bg-gray-50">
              <p className="text-sm text-gray-700">
                Important: This does not change your building&apos;s levies,
                budget, or maintenance plan. It applies only to your individual
                mortgage and levy account.
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-3">
              What it is / what it isn&apos;t
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  What this is
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Optional and owner-initiated</li>
                  <li>Based on your individual mortgage</li>
                  <li>Only recommended if equal or better</li>
                  <li>Applied as a levy credit</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  What this isn&apos;t
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Not a levy discount scheme</li>
                  <li>Not pooled or shared</li>
                  <li>Not OC financial advice</li>
                  <li>Not required to participate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT LOOKS LIKE */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
          Example
        </p>
        <h2 className="text-2xl font-semibold mb-6">
          What a levy offset looks like in practice
        </h2>

        <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
          <p className="text-gray-700 mb-4">
            Where an offset applies, it appears as a clearly labelled credit
            against your individual levy contribution. It does not affect other
            owners or the Owners Corporation&apos;s accounts.
          </p>

          <div className="border border-gray-200 rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-600 mb-3">
              Example levy notice with an offset applied
            </p>

            <div className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
              <Image
                src="/levy-bill-inc-offsets.png"
                alt="Example levy notice showing a levy offset applied as a credit"
                width={1400}
                height={900}
                className="w-full h-auto"
              />
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            Example only. Amounts vary by lender and loan size. Rebates are
            typically applied quarterly in arrears and stop automatically if the
            underlying loan changes or no longer qualifies.
          </p>
        </div>
      </section>

      {/* TRUST / COMPLIANCE */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-3">
              A review first. A refinance only if better.
            </h2>

            <p className="text-gray-700 mb-4">
              Any recommendation made through Sold must comply with Best Interests
              Duty.
            </p>

            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>A worse loan is never justified by a rebate</li>
              <li>Fees, features, and suitability are considered</li>
              <li>If no better option exists, no refinance is recommended</li>
            </ul>

            <p className="text-sm text-gray-600 mt-4">
              The levy offset is a by-product of a better outcome, not the reason
              for one.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-3">
              Your data, under your control
            </h2>

            <p className="text-gray-700 mb-4">
              Sold uses Australia&apos;s Open Banking system to verify key
              information securely.
            </p>

            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Government-regulated Consumer Data Right (CDR)</li>
              <li>Read-only access (we can&apos;t move money)</li>
              <li>Time-limited consent</li>
              <li>You can withdraw access at any time</li>
            </ul>

            <div className="mt-5 border border-gray-200 rounded-xl p-4 bg-gray-50">
              <p className="text-sm text-gray-700">
                Connecting your data does not commit you to refinancing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Ready to check if this applies to you?
              </h3>
              <p className="text-sm text-gray-600">
                No cost to review. No obligation to proceed.
              </p>
            </div>

            <ButtonPill href="/refinance">
              Check if a levy offset could apply
            </ButtonPill>
          </div>

          <p className="text-xs text-gray-500 mt-5">
            Levy offsets are not guaranteed and depend on lender terms, loan size,
            and eligibility at the time of review. Any refinance is optional and
            subject to lender approval.
          </p>
        </div>
      </section>
    </main>
  );
}
