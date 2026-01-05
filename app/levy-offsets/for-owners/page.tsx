import Image from "next/image";
import { ButtonPill } from "@/components/ButtonPill";

export default function OwnersPage() {
  return (
    <main>
      {/* TOP NOTICE */}
      <div className="bg-black text-white text-sm px-4 py-2 text-center">
        This page is intended for owners participating in a committee-approved
        levy offset pilot.
      </div>

      {/* HERO */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
          For individual apartment owners
        </p>

        <h1 className="text-3xl font-semibold mb-4">
          Mortgage Review for Levy Offset Pilot
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          <span className="font-medium text-gray-900">
            Nothing changes unless you choose to proceed.
          </span>{" "}
          A voluntary mortgage review that may offset part of your levy where a
          better loan outcome exists.
        </p>

        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-gray-50">
          <p className="text-gray-700 mb-3 font-medium">
            What stays exactly the same:
          </p>
          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            <li>Your building’s levies, budget, and maintenance plan</li>
            <li>No pooled rebates or shared accounts</li>
            <li>No impact on non-participating owners</li>
            <li>No obligation to refinance</li>
          </ul>
        </div>
      </section>

      {/* SYSTEM STENCIL */}
      <div className="max-w-5xl mx-auto px-4 -mt-2 mb-12">
        <div className="relative w-full h-44 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
          <Image
            src="/stencils/apartments-hub-stencil.svg"
            alt=""
            width={900}
            height={400}
            className="w-5/6 h-5/6 opacity-45"
            priority
          />
        </div>
      </div>

      {/* WHY NOW */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Context
            </p>
            <h2 className="text-2xl font-semibold mb-3">
              Why this is being explored
            </h2>

            <p className="text-gray-700 mb-4">
              Apartment living depends on well-funded maintenance plans to
              protect building condition and long-term value. Buyers,
              conveyancers, and lenders routinely assess levy stability and
              maintenance history.
            </p>

            <p className="text-gray-700 mb-4">
              At the same time, many owners have not reviewed their mortgage
              despite major changes in interest rates and lender pricing.
            </p>

            <p className="text-gray-700">
              This pilot explores whether improvements to an individual mortgage
              can help reduce levy cashflow pressure without changing how the
              building is funded or managed.
            </p>
          </div>

          <div className="relative w-full h-56 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
            <Image
              src="/stencils/individual-owner-stencil.svg"
              alt=""
              width={700}
              height={350}
              className="w-4/5 h-4/5 opacity-50"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
          How it works
        </p>
        <h2 className="text-2xl font-semibold mb-6">
          A review first. A refinance only if better.
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
            <ol className="list-decimal pl-5 text-gray-700 space-y-2">
              <li>You request a free mortgage review</li>
              <li>You choose how to share information (Open Banking or manual)</li>
              <li>Your current loan is assessed objectively</li>
              <li>
                A refinance is only recommended if it clearly improves your
                position
              </li>
              <li>You decide whether to proceed</li>
            </ol>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
            <p className="text-gray-700 mb-3">
              Where a refinance proceeds and a lender pays an ongoing commission,
              that amount is applied as a credit against your levy using your
              existing BPAY reference.
            </p>

            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Calculated quarterly in arrears</li>
              <li>Appears as a visible credit on your strata invoice</li>
              <li>Stops automatically if your loan changes</li>
            </ul>

            <p className="text-gray-700 mt-4">
              This is a by-product of a better loan outcome, not the reason for a
              recommendation.
            </p>
          </div>
        </div>
      </section>

      {/* BEST INTERESTS */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-3">
            Best Interests Duty
          </h2>

          <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-3">
            <li>A worse loan is never justified by a rebate</li>
            <li>Fees, features, and suitability are considered</li>
            <li>If no better option exists, no refinance is recommended</li>
          </ul>

          <p className="text-gray-700 text-sm">
            Sold acts independently and is separate from the Owners Corporation.
          </p>
        </div>
      </section>

      {/* FAQ */}
 {/* FAQ */}
<section className="max-w-5xl mx-auto px-4 py-12">
  <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
    Common questions
  </p>
  <h2 className="text-2xl font-semibold mb-6">
    Frequently asked questions
  </h2>

  <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white space-y-3">
    <details>
      <summary className="cursor-pointer font-medium">
        Why can’t the offset be paid to me as cash?
      </summary>
      <p className="mt-2 text-gray-700">
        Because the purpose is to reduce levy pressure and support building
        maintenance, not to create cash incentives. Applying the offset to
        levies keeps the benefit transparent, auditable, and aligned with
        long-term building outcomes.
      </p>
    </details>

    <details>
      <summary className="cursor-pointer font-medium">
        What might the offset look like on my levy notice?
      </summary>

      <div className="mt-4 space-y-4">
        <p className="text-gray-700">
          Where an offset applies, it appears as a clearly labelled credit
          against your individual levy contribution. It does not change the
          Owners Corporation&apos;s budget, levy schedule, or funding plan.
        </p>

        <div className="border border-gray-200 rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-600 mb-3">
            Example levy notice with an offset applied
          </p>

          <div className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
            <Image
              src="/levy-bill-inc-offsets.png"
              alt="Example levy notice showing a levy offset applied as a credit"
              width={1200}
              height={700}
              className="w-full h-auto"
            />
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Rebates are applied automatically, typically quarterly in arrears, and
          stop if the underlying loan changes or no longer qualifies.
        </p>
      </div>
    </details>

    <details>
      <summary className="cursor-pointer font-medium">
        Why is Sold giving up commission?
      </summary>
      <p className="mt-2 text-gray-700">
        The intent is alignment. Buildings that are easier to maintain and
        easier to own tend to perform better over time. Levy Offset is designed
        to support that outcome rather than maximise broker revenue.
      </p>
    </details>

    <details>
      <summary className="cursor-pointer font-medium">
        Does this affect other owners?
      </summary>
      <p className="mt-2 text-gray-700">
        No. Non-participating owners continue exactly as before. No funds are
        pooled or redistributed.
      </p>
    </details>

    <details>
      <summary className="cursor-pointer font-medium">
        Is there any cost or obligation?
      </summary>
      <p className="mt-2 text-gray-700">
        No cost to review and no obligation to proceed. If you refinance,
        standard lender fees may apply and are disclosed upfront.
      </p>
    </details>
  </div>
</section>

    </main>
  );
}
