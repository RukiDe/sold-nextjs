import Image from "next/image";
import { ButtonPill } from "@/components/ButtonPill";

export default function DevelopersPage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-4">Developers</h1>

        <p className="text-lg text-gray-700 mb-6">
          <span className="font-medium text-gray-900">Reduce reputational tail risk.</span>{" "}
          Strengthen the long-term cost-of-ownership story for your buildings.
        </p>

        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-gray-700">
            Sold partners with developers to support stronger long-term building outcomes through a voluntary
            levy offset model that benefits owners without adding risk or complexity.
          </p>

          {/* At a glance */}
          <div className="mt-4 border border-gray-200 rounded-2xl p-4 bg-gray-50">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">At a glance</p>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>No developer funding or guarantees</li>
              <li>Voluntary and owner-initiated participation</li>
              <li>No pooled funds</li>
              <li>The Owners Corporation does not rely on participation</li>
              <li>Rebates appear as a credit on individual strata invoices</li>
              <li>Not referenced in contracts of sale</li>
            </ul>
          </div>
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

      {/* THE LONG-TERM CHALLENGE */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Context</p>
            <h2 className="text-2xl font-semibold mb-3">The long-term challenge</h2>
            <p className="text-gray-700 mb-6">
              Most buildings are compliant at handover. Few are financially resilient years later.
            </p>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>Maintenance plans drift from reality</li>
              <li>Early special levies erode trust</li>
              <li>Insurance costs rise</li>
              <li>Developers carry reputational tail risk</li>
            </ul>
          </div>

          <div className="relative w-full h-56 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
            <Image
              src="/stencils/developer-stencil.svg"
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
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Mechanism</p>
            <h2 className="text-2xl font-semibold mb-3">How it works</h2>

            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
              <p className="text-gray-700">
                Levy Offset can be introduced at any stage of a project&apos;s lifecycle:
              </p>
              <ul className="text-gray-700 list-disc pl-5 mt-3 space-y-2">
                <li>During development</li>
                <li>In the final stages (pre-settlement)</li>
                <li>At handover</li>
                <li>Or years after completion</li>
              </ul>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">What stays the same</h3>
                <ul className="text-gray-700 list-disc pl-5 space-y-2">
                  <li>Participation is individual and voluntary</li>
                  <li>Finance decisions are owner-initiated</li>
                  <li>Rebates appear as a credit on individual strata invoices</li>
                  <li>The Owners Corporation does not rely on participation</li>
                  <li>No building-level lock-in</li>
                  <li>No pooled funds</li>
                </ul>
                <p className="text-gray-700 mt-4">If no owners participate, nothing breaks.</p>
              </div>
            </div>
          </div>

          <div className="md:order-1">
            <div className="relative w-full h-56 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
              <Image
                src="/stencils/owners-corporation-stencil.svg"
                alt=""
                width={700}
                height={350}
                className="w-4/5 h-4/5 opacity-45"
              />
            </div>

            {/* Reputation box (strengthened with mechanism) */}
            <div className="mt-6 border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Why developers care</p>
              <h3 className="font-semibold mb-2">Your name stays on the building</h3>
              <p className="text-gray-700">
                Developers don&apos;t just deliver a building, they deliver a reputation. Levy Offset is designed to
                stack the odds in your favour that levies stay paid, maintenance stays funded, and deferred works
                don&apos;t quietly accumulate over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHERE IT PLUGS INTO YOUR LIFECYCLE */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Implementation</p>
        <h2 className="text-2xl font-semibold mb-6">Where it fits in your lifecycle</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
            <h3 className="font-semibold mb-2">Planning / design</h3>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>ESG-aligned resilience narrative</li>
              <li>Stronger long-term asset story</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
            <h3 className="font-semibold mb-2">Sales / final stages</h3>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>Clear cost-of-ownership differentiation</li>
              <li>Credible answers to levy questions</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
            <h3 className="font-semibold mb-2">Post-handover</h3>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>Supports good maintenance norms</li>
              <li>Reduced reputational tail risk</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">FAQ</p>
        <h2 className="text-2xl font-semibold mb-6">Risk and governance FAQs</h2>

        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
          <div className="space-y-3">
            <details>
              <summary className="cursor-pointer font-medium">
                Does this create any obligation or risk for the developer?
              </summary>
              <p className="mt-2 text-gray-700">
                No. Levy Offset is owner-initiated and voluntary. Developers do not provide funding, guarantees, or
                ongoing support. No obligation is created for the developer at any stage.
              </p>
            </details>

            <details>
              <summary className="cursor-pointer font-medium">
                Does this change levies, budgets, or maintenance planning?
              </summary>
              <p className="mt-2 text-gray-700">
                No. Levies and maintenance planning remain the responsibility of the Owners Corporation and are set in
                the usual way. Levy Offset is a supplementary offset mechanism, not a budget input.
              </p>
            </details>

            <details>
              <summary className="cursor-pointer font-medium">
                Is developer participation required for Levy Offset to operate?
              </summary>
              <p className="mt-2 text-gray-700">
                No. A developer can introduce the concept, but the model functions independently. If no owners
                participate, nothing changes.
              </p>
            </details>

            <details>
              <summary className="cursor-pointer font-medium">
                Could this be seen as an incentive tied to selling apartments?
              </summary>
              <p className="mt-2 text-gray-700">
                Participation is voluntary and owner-initiated, and it is not referenced in contracts of sale.
                It can be introduced during development, in the final stages (pre-settlement), at handover, or later.
              </p>
            </details>

            <details>
              <summary className="cursor-pointer font-medium">
                Is the developer involved in any financial flows?
              </summary>
              <p className="mt-2 text-gray-700">
                No. There are no payments to developers, strata managers, Owners Corporations, or committee members.
                Rebates apply only to participating owners via their levy accounts.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* START THE CONVERSATION */}
      <section className="max-w-5xl mx-auto px-4 py-12 pb-16">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Next step</p>
            <h2 className="text-2xl font-semibold mb-3">Start the conversation</h2>
            <p className="text-gray-700 mb-6">
              We typically start with one project, one strata manager, and a simple owner comms pack. This begins with a
              short discussion.
            </p>

            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="font-semibold mb-2">What we&apos;ll cover</h3>
              <ul className="text-gray-700 list-disc pl-5 space-y-2">
                <li>Your project pipeline and stage</li>
                <li>How Levy Offset can be introduced (including pre-settlement final stages)</li>
                <li>How owners opt in (voluntary and individual)</li>
                <li>How rebates appear on strata invoices</li>
              </ul>
            </div>
          </div>

          <form className="border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm bg-white">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Company name
                </label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  type="text"
                  name="company"
                  placeholder="e.g. Long Term Pty Ltd"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Contact name
                </label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  type="text"
                  name="contactName"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Email
                </label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Phone
                </label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  type="tel"
                  name="phone"
                  placeholder="04xx xxx xxx"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Project name / portfolio size{" "}
                  <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  type="text"
                  name="project"
                  placeholder="e.g. 3 projects / 420 lots"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Project stage{" "}
                  <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <select
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  name="stage"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="planning">Planning</option>
                  <option value="construction">Construction</option>
                  <option value="final_stages">Final stages (pre-settlement)</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Are you currently involved with the Owners Corporation?{" "}
                <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <select
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                name="involvedWithOC"
                defaultValue=""
              >
                <option value="" disabled>
                  Select...
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="pt-2">
              <ButtonPill href="https://calendly.com/rukid-sold/30min">
                Let&apos;s chat
              </ButtonPill>
            </div>

            <p className="text-xs text-gray-500 pt-2">
              We&apos;ll be in touch to book a short call. No obligation.
            </p>
          </form>
        </div>

        <p className="text-xs text-gray-500 mt-10">
          Note: This page is general information only and does not constitute financial advice.
        </p>
      </section>
    </main>
  );
}
