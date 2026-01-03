import Image from "next/image";
import { ButtonPill } from "@/components/ButtonPill";

export default function OwnersCorporationsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-4">Owners Corporations</h1>

        <p className="text-lg text-gray-700 mb-6">
          <span className="font-medium text-gray-900">
            Nothing changes unless an owner opts in.
          </span>{" "}
          A voluntary levy offset model for apartment buildings.
        </p>

        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-gray-700 mb-3">
            Sold supports Owners Corporations by allowing individual owners to
            offset part of their levy where a mortgage review results in a
            genuinely better loan outcome.
          </p>

          <p className="text-sm text-gray-600 mb-3 font-medium">
            What does <strong>not</strong> change:
          </p>

          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            <li>Levies, budgets, and maintenance plans remain unchanged</li>
            <li>No governance or by-law changes</li>
            <li>No reliance on participation</li>
            <li>No pooled funds or shared accounts</li>
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

      {/* WHERE RISK SITS */}
      <section className="max-w-5xl mx-auto px-4 pb-4">
        <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
          <h2 className="text-lg font-semibold mb-3">Where risk sits</h2>
          <ul className="text-gray-700 list-disc pl-5 space-y-2">
            <li>Mortgage decisions sit entirely with individual owners</li>
            <li>The Owners Corporation does not borrow or receive funds</li>
            <li>No part of the building budget depends on participation</li>
            <li>If participation drops to zero, nothing breaks</li>
          </ul>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Context
            </p>
            <h2 className="text-2xl font-semibold mb-3">The structural problem</h2>
            <p className="text-gray-700 mb-6">
              Apartment buildings usually start compliant. Over time, costs tend
              to rise faster than levies.
            </p>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>Insurance premiums increase</li>
              <li>Maintenance is deferred</li>
              <li>Special levies become more likely</li>
              <li>Committees change before issues surface</li>
            </ul>
          </div>

          <div className="relative w-full h-56 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
            <Image
              src="/stencils/owners-corporation-stencil.svg"
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
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div className="md:order-2">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Mechanism
            </p>
            <h2 className="text-2xl font-semibold mb-3">How Levy Offset works</h2>

            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-700 mb-3">
                Individual owners may choose to review and refinance their loan
                through Sold.
              </p>

              <p className="text-gray-700 mb-3">
                Where a refinance proceeds and a lender pays an ongoing
                commission, that amount is applied as a credit against the
                participating owner&apos;s levy using their BPAY reference.
              </p>

              <p className="text-gray-700 mb-3">
                For example: an owner refinances, the lender pays Sold a standard
                trail commission, and that amount appears quarterly as a visible
                levy credit on the owner&apos;s strata notice.
              </p>

              <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
                <li>Calculated quarterly in arrears</li>
                <li>Applies only to participating owners</li>
                <li>Fully transparent and auditable</li>
              </ul>

              <p className="text-gray-700 mt-4">
                No fees are paid by the Owners Corporation or owners.
              </p>
            </div>
          </div>

          <div className="md:order-1">
            <div className="relative w-full h-56 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
              <Image
                src="/stencils/individual-owner-stencil.svg"
                alt=""
                width={700}
                height={350}
                className="w-4/5 h-4/5 opacity-50"
              />
            </div>

            <div className="mt-6 border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="font-semibold mb-2">What stays the same</h3>
              <ul className="text-gray-700 list-disc pl-5 space-y-2">
                <li>Levy obligations remain unchanged</li>
                <li>No building-level lock-in</li>
                <li>No pooled or shared accounts</li>
                <li>No impact on insurance or maintenance planning</li>
              </ul>
              <p className="text-gray-700 mt-3">
                This is a pressure valve, not a funding line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
          Outcomes
        </p>
        <h2 className="text-2xl font-semibold mb-6">
          What this means for your building
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-2">For the Owners Corporation</h3>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>Reduces individual levy pressure where owners participate</li>
              <li>Improves the odds of stable long-term funding</li>
              <li>Supports better maintenance outcomes over time</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-2">
              For committees and strata managers
            </h3>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>No governance changes</li>
              <li>No compliance burden</li>
              <li>No financial dependency</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Optional support, not an operational obligation.
            </p>
          </div>
        </div>
      </section>

{/* FAQ */}
<section className="max-w-5xl mx-auto px-4 py-12">
  <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
    Details
  </p>
  <h2 className="text-2xl font-semibold mb-6">
    Frequently asked questions
  </h2>

  <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white space-y-4">
    {/* FAQ 1 */}
    <details>
      <summary className="cursor-pointer font-medium">
        What&apos;s your connection to Owners Corporations?
      </summary>

      <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
        <p>I&apos;ve been on an Owners Committee myself.</p>

        <p>
          I joined at handover from a developer and stayed on the committee for
          over four years. Like most committee members, I started with no
          background in strata, building management, or governance. Everything
          was learned through experience.
        </p>

        <p>Over that time, I saw firsthand:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>the steep learning curve after the first AGM</li>
          <li>how quickly “one-off” expenses can become recurring issues</li>
          <li>
            how maintenance plans can feel painful for owners in the short term,
            but are essential for long-term value
          </li>
          <li>the stress and disruption of special levies</li>
          <li>
            how easily misunderstandings arise when people are under financial
            pressure
          </li>
        </ul>

        <p>
          Our building also went through a legal dispute with the developer,
          which added complexity, cost, and uncertainty for residents. It
          reinforced how important building resilience, adequate funding, and
          clear decision-making are to protecting long-term outcomes.
        </p>

        <p>
          Like many committee members, I did the role alongside full-time work,
          largely unpaid, and often felt the weight of responsibility without
          having perfect information or clear answers.
        </p>

        <p>
          Levy offsets are informed by that experience. They’re not about
          avoiding necessary costs or changing how buildings are run. They’re
          about reducing pressure where possible, so committees can make the
          right long-term decisions with less friction.
        </p>
      </div>
    </details>

    {/* FAQ 2 */}
    <details>
      <summary className="cursor-pointer font-medium">
        Can rebates be paid as cash to owners?
      </summary>
      <p className="mt-3 text-gray-700 leading-relaxed">
        The purpose is to reduce levy pressure and support building resilience,
        not to create cash incentives. Applying the benefit to levies keeps it
        transparent, auditable, and aligned with maintenance outcomes.
      </p>
    </details>

    {/* FAQ 3 */}
    <details>
      <summary className="cursor-pointer font-medium">
        Does refinancing for a levy offset make sense?
      </summary>
      <p className="mt-3 text-gray-700 leading-relaxed">
        A refinance is only recommended if the outcome is objectively equal to
        or better than the owner&apos;s current mortgage. The levy credit is a
        by-product, not the reason for a recommendation, and owners are the sole
        decision-maker on whether to proceed.
      </p>
    </details>

    {/* FAQ 4 */}
    <details>
      <summary className="cursor-pointer font-medium">
        Does participation affect non-participating owners?
      </summary>
      <p className="mt-3 text-gray-700 leading-relaxed">
        No. Non-participating owners continue exactly as they are. No funds are
        pooled, redistributed, or taken from the Owners Corporation.
      </p>
    </details>
  </div>
</section>


      {/* QUALIFY FORM */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Eligibility
            </p>
            <h2 className="text-2xl font-semibold mb-3">
              Check suitability for your building
            </h2>
            <p className="text-gray-700 mb-6">
              This is an informational assessment only. There is no obligation,
              no commitment, and no communication to owners unless the building
              chooses to proceed.
            </p>
          </div>

          <form className="border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm bg-white">
            <div className="pt-2">
              <ButtonPill href="https://calendly.com/rukid-sold/30min">
                Request an informational review
              </ButtonPill>
            </div>
          </form>
        </div>

        <p className="text-xs text-gray-500 mt-10">
          General information only. Not financial advice. Eligibility depends on
          individual circumstances.
        </p>
      </section>
    </main>
  );
}
