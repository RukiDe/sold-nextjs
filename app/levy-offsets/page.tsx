import Image from "next/image";
import { ButtonPill } from "@/components/ButtonPill";

export default function ApartmentsHubPage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-16">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl font-semibold mb-4">
              Reducing levy pressure for apartment buildings, without changing how they&apos;re run.
            </h1>

            <p className="text-lg text-gray-700">
              Lower costs for owners. No governance changes. No pooled funds.
            </p>

            {/* Reassurance: sceptic-friendly */}
            <div className="mt-6 border border-gray-200 rounded-2xl p-4 bg-gray-50 text-sm text-gray-700">
              Nothing changes at a building level unless an individual owner chooses to participate.
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-gray-700">
                Apartment buildings face rising insurance, maintenance, and compliance costs that are increasingly
                passed on through levies and special levies.
              </p>

              {/* One-line unlock: “how it works” */}
              <p className="text-gray-700">
                In simple terms: individual owners may refinance their own loans. Where that results in a lender-paid
                commission, it can be credited back against that owner&apos;s levy, without affecting the building&apos;s
                budget.
              </p>
            </div>

            {/* One sentence to reduce “separate sales paths” confusion */}
            <p className="mt-6 text-sm text-gray-500">
              The same underlying model applies across buildings, the difference is simply who initiates the
              conversation.
            </p>
          </div>

          <div className="relative w-full h-64 md:h-72 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
            <Image
              src="/stencils/apartments-hub-stencil.svg"
              alt=""
              width={900}
              height={400}
              className="w-5/6 h-5/6 opacity-50"
              priority
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-gray-200 my-14" />
      </div>

      {/* OWNERS CORPORATIONS */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Who this is for</p>
          <h2 className="text-2xl font-semibold mb-4">Owners Corporations</h2>
          <p className="text-gray-700">
            Reduce levy pressure over time without changing how your building is governed or funded.
          </p>

          {/* Risk-first ordering for sceptical readers */}
          <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
            <li>No governance changes</li>
            <li>No pooled funds</li>
            <li>No reliance on participation</li>
            <li>Only recommended where the outcome is equal to or better than the current setup</li>
          </ul>

          <div className="mt-6">
            <ButtonPill href="/levy-offsets/for-committees">For Owners Corporations</ButtonPill>
          </div>
        </div>

        <div className="relative w-full h-64 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
          <Image
            src="/stencils/owners-corporation-stencil.svg"
            alt=""
            width={700}
            height={350}
            className="w-4/5 h-4/5 opacity-50"
          />
        </div>
      </section>

      {/* DEVELOPERS */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
        <div className="md:order-2">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Who this is for</p>
          <h2 className="text-2xl font-semibold mb-4">Developers</h2>

          {/* “Why this exists” sentence first */}
          <p className="text-gray-700">
            Many buildings start strong at handover but struggle to fund maintenance a decade later.
          </p>

          <p className="text-gray-700 mt-4">
            Support stronger long-term building outcomes through optional financial resilience for your projects.
          </p>

          <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
            <li>Applicable to current and future projects</li>
            <li>Voluntary and owner-initiated participation</li>
            <li>No post-handover obligations</li>
            <li>Supports long-term building reputation</li>
          </ul>

          <div className="mt-6">
            <ButtonPill href="/levy-offsets/for-developers">For Developers</ButtonPill>
          </div>
        </div>

        <div className="relative w-full h-64 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
          <Image
            src="/stencils/developer-stencil.svg"
            alt=""
            width={700}
            height={350}
            className="w-4/5 h-4/5 opacity-50"
          />
        </div>
      </section>

      {/* INDIVIDUAL OWNERS */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Who this is for</p>
          <h2 className="text-2xl font-semibold mb-4">Individual Owners</h2>
          <p className="text-gray-700">
            See whether reviewing your mortgage, with no obligation to change, could help offset your apartment levies.
          </p>

          <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
            <li>No obligation to proceed</li>
            <li>Only where outcomes are equal or better</li>
            <li>Rebates applied directly to your levy</li>
          </ul>

          <div className="mt-6">
            <ButtonPill href="/levy-offsets/for-owners">For Owners</ButtonPill>
          </div>
        </div>

        <div className="relative w-full h-64 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
          <Image
            src="/stencils/individual-owner-stencil.svg"
            alt=""
            width={700}
            height={350}
            className="w-5/6 h-5/6 opacity-50"
          />
        </div>
      </section>

      {/* “What this is not” block (kills scepticism fast) */}
      <section className="max-w-5xl mx-auto px-4 pb-6">
        <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Clarity</p>
          <h3 className="text-lg font-semibold mb-3">This is not</h3>
          <ul className="text-gray-700 list-disc pl-5 space-y-2">
            <li>A mandatory scheme</li>
            <li>A pooled rebate or shared building fund</li>
            <li>A replacement for proper building budgets and maintenance plans</li>
          </ul>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="h-px bg-gray-200 my-10" />
        <p className="text-sm text-gray-500">
          Participation is always voluntary and owner-initiated.
          <br />
          Levy Offset is designed to support building resilience without introducing pooled funds, financial dependency,
          or governance changes.
        </p>
      </section>
    </main>
  );
}
