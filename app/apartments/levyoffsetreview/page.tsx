import { ButtonPill } from "@/components/ButtonPill";

export default function LevyOffsetReviewPage() {
  return (
    <main>
      {/* Top dismissible banner */}
      <div className="bg-black text-white text-sm px-4 py-2 relative text-center">
        <span className="block">
          This page is intended for owners participating in a committee-approved levy offset pilot.
        </span>

        {/* NOTE: Visual only – no dismiss logic implemented */}
        <button
          aria-label="Dismiss banner"
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
        >
          ×
        </button>
      </div>

      <section className="max-w-3xl mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-3xl font-semibold mb-4">
          Mortgage Review for Levy Offset Pilot
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          A voluntary mortgage review for owners in the levy offset pilot.
          If refinancing genuinely improves your loan, part of the lender-paid
          commission may be credited to your levy account.
        </p>

        {/* Why now */}
        <h2 className="text-xl font-medium mb-3">
          Why this is being explored now
        </h2>

        <p className="text-gray-700 mb-4">
          Apartment living depends on well-funded maintenance plans to protect
          building condition and long-term value. Buyers and conveyancers
          routinely review sinking funds, levy stability, and maintenance history
          when assessing apartments.
        </p>

        <p className="text-gray-700 mb-8">
          At the same time, many owners have not reviewed their mortgage despite
          significant changes in interest rates and lender pricing. This pilot
          explores whether improvements to an individual mortgage can help
          offset levy cashflow, without reducing building funding or services.
        </p>

        {/* What it is */}
        <h2 className="text-xl font-medium mb-3">
          What the Levy Offset Review is
        </h2>

        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>A voluntary review of your current mortgage</li>
          <li>A refinance is only recommended if it clearly improves your financial position</li>
          <li>
            Where a refinance proceeds (and where permitted), part of the
            lender-paid commission may be rebated into your levy account
          </li>
          <li>
            Offsets (if eligible) are paid quarterly in arrears into your levy
            BPAY account
          </li>
          <li>The Owners Corporation budget, levies, and maintenance plans remain unchanged</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">
          What it is not
        </h3>

        <ul className="list-disc pl-6 text-gray-700 mb-8">
          <li>Not a requirement</li>
          <li>Not a levy reduction (it is an offset)</li>
          <li>Not a pooled rebate</li>
          <li>Not financial advice from the Owners Corporation</li>
        </ul>

        {/* Best interests duty */}
        <div className="border border-gray-200 bg-gray-50 p-6 rounded mb-10">
          <h2 className="text-xl font-medium mb-3">
            Best Interests Duty
          </h2>

          <p className="text-gray-700 mb-3">
            Any mortgage recommendation made through Sold must comply with
            Best Interests Duty obligations.
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-3">
            <li>A switch is only recommended if it clearly improves your position</li>
            <li>You are not asked to trade loan quality for rebates</li>
            <li>If no better option exists, no refinance is recommended</li>
          </ul>

          <p className="text-gray-700 mb-3">
            The levy offset is a by-product of a better loan outcome, not the
            reason for a recommendation.
          </p>

          <p className="text-gray-700 text-sm">
            Sold acts independently and is separate from the Owners Corporation.
          </p>
        </div>

        {/* Process */}
        <h2 className="text-xl font-medium mb-3">
          How the review works
        </h2>

        <ol className="list-decimal pl-6 text-gray-700 mb-6">
          <li>You request a free mortgage review</li>
          <li>You choose how to provide information (Open Banking or manual)</li>
          <li>Your current loan is assessed</li>
          <li>A recommendation is only made if it’s clearly better</li>
          <li>You decide whether to proceed</li>
        </ol>

        {/* No cost reassurance */}
        <div className="border border-gray-200 bg-white p-5 rounded mb-10">
          <h3 className="text-lg font-medium mb-2">
            Is there any cost to participate?
          </h3>

          <p className="text-gray-700">
            The mortgage review is provided at no cost using the Australian
            Government’s Open Banking infrastructure.
          </p>

          <p className="text-gray-700 mt-2">
            There are no upfront fees and no obligation to refinance. If you do
            refinance, standard lender fees may apply (these are disclosed
            upfront). If no better option exists, nothing proceeds.
          </p>
        </div>

        {/* FAQs */}
        <h2 className="text-xl font-medium mb-4">
          Frequently asked questions
        </h2>

        <div className="space-y-3 mb-12">
          <details>
            <summary className="cursor-pointer font-medium">
              Why is this linked to maintenance levies?
            </summary>
            <p className="mt-2 text-gray-700">
              Maintenance levies fund ongoing upkeep and long-term capital works.
              Well-funded maintenance plans support resale value and buyer
              confidence. This pilot aims to reduce individual cashflow impact
              without underfunding the building.
            </p>
          </details>

          <details>
            <summary className="cursor-pointer font-medium">
              Does this affect owners who don’t participate?
            </summary>
            <p className="mt-2 text-gray-700">
              No. Non-participating owners pay levies as normal. No Owners
              Corporation funds are used and no levies are redistributed.
            </p>
          </details>

          <details>
            <summary className="cursor-pointer font-medium">
              How does the levy offset appear?
            </summary>
            <p className="mt-2 text-gray-700">
              Rebates (if applicable) are paid quarterly in arrears directly into
              your levy BPAY account and appear as a visible deduction on your
              levy notice.
            </p>
          </details>

          <details>
            <summary className="cursor-pointer font-medium">
              What does “explicitly improves your financial position” mean?
            </summary>
            <p className="mt-2 text-gray-700">
              A refinance is only recommended if it objectively improves your
              loan when considering interest rate, fees, features, and
              suitability. A worse loan is never justified by a rebate.
            </p>
          </details>

          <details>
            <summary className="cursor-pointer font-medium">
              Is there any cost or obligation to me?
            </summary>
            <p className="mt-2 text-gray-700">
              No obligation. The review is free. If you refinance, normal lender
              fees may apply (including fixed-rate break costs, where relevant).
              If no better option exists, nothing proceeds.
            </p>
          </details>

          <details>
            <summary className="cursor-pointer font-medium">
              Can I choose not to participate or stop later?
            </summary>
            <p className="mt-2 text-gray-700">
              Yes. Participation is optional. You can choose not to proceed at
              any time. Rebates stop automatically if your loan changes.
            </p>
          </details>

          <details>
  <summary className="cursor-pointer font-medium">
    How much of the trail is used to offset the levy?
  </summary>
  <p className="mt-2 text-gray-700">
    100% of the eligible trail commission received in relation to your loan
    is applied to offset your individual maintenance levy.
  </p>
</details>

<details>
  <summary className="cursor-pointer font-medium">
    Are there any payments to other parties?
  </summary>
  <p className="mt-2 text-gray-700">
    No. There are no payments to developers, strata managers, the Owners
    Corporation, or committee members.
  </p>
  <p className="mt-2 text-gray-700">
    100% of the rebate is applied solely to offset your individual
    maintenance fund payment.
  </p>
</details>

<details>
  <summary className="cursor-pointer font-medium">
    How much will the trail be?
  </summary>
  <p className="mt-2 text-gray-700">
    This depends on the lender’s offer at the time and your loan size.
  </p>
  <p className="mt-2 text-gray-700">
    As a guide only, trail commissions have historically averaged around
    0.15% per annum of the loan balance.
  </p>
  <p className="mt-2 text-gray-700">
    For example, on a $500,000 loan, this would equate to an annual rebate
    of approximately $750 ($500,000 × 0.15%), paid quarterly in arrears.
  </p>
</details>

<details>
  <summary className="cursor-pointer font-medium">
    When is the levy offset paid?
  </summary>
  <p className="mt-2 text-gray-700">
    Rebates are applied automatically quarterly in arrears directly to your
    levy BPAY account.
  </p>
</details>


          <details>
            <summary className="cursor-pointer font-medium">
              Privacy and data
            </summary>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>Data is used solely to assess your mortgage position</li>
              <li>Open Banking access is read-only, time-limited, and regulated</li>
              <li>You can withdraw consent at any time</li>
              <li>Records are retained for compliance and audit purposes</li>
            </ul>
          </details>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <ButtonPill href="/levyoffsetreview/start">
            Request a mortgage review
          </ButtonPill>

          <ButtonPill href="/" variant="secondary">
            No thanks
          </ButtonPill>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          No cost to review. No obligation to proceed. An offset is not guaranteed
          and only applies if a suitable refinance is completed. Commission rates can vary by lender and product and are subject to change.
        </p>
      </section>
    </main>
  );
}
