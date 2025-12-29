import Image from "next/image";
import { ButtonPill } from "@/components/ButtonPill";

export default function ApartmentsHubPage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-2xl mx-auto px-4 pt-16">
        <h1 className="text-3xl font-semibold mb-4">
          Improving financial management for apartment buildings.
        </h1>

        <p className="text-lg text-gray-700">
          Lower levy pressure. Stronger long-term outcomes.
        </p>

        <div className="mt-8">
          <p className="text-gray-700">
            Apartment buildings face rising insurance, maintenance, and compliance costs that are increasingly passed on
            through levies and special levies.
          </p>
          <p className="text-gray-700 mt-4">
            Sold supports apartment buildings with a voluntary levy offset model that helps reduce ongoing costs for
            owners while supporting better-funded maintenance and more resilient buildings over time.
          </p>
        </div>
      </section>

      {/* HERO IMAGE */}
<div className="max-w-5xl mx-auto px-4 my-14">
  <div className="relative w-full h-56 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
    <img
      src="/stencils/apartments-hub-stencil.svg"
      alt=""
      className="w5/6 h-5/6 opacity-50"
    />
  </div>
</div>

      {/* OWNERS CORPORATIONS */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            Who this is for
          </p>
          <h2 className="text-2xl font-semibold mb-4">Owners Corporations</h2>
          <p className="text-gray-700">
            Reduce levy pressure over time without changing how your building is governed or funded.
          </p>

          <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
            <li>Only recommended where the outcome is equal to or better than the current setup</li>
            <li>No governance changes</li>
            <li>No reliance on participation</li>
            <li>No pooled funds</li>
          </ul>

          <div className="mt-6">
            <ButtonPill href="/apartments/ownerscorporations">
              For Owners Corporations
            </ButtonPill>
          </div>
        </div>

<div className="relative w-full h-64 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
  <img
    src="/stencils/owners-corporation-stencil.svg"
    alt=""
    className="w-4/5 h-4/5 opacity-50"
  />
</div>

      </section>

      {/* DEVELOPERS */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
        <div className="md:order-2">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            Who this is for
          </p>
          <h2 className="text-2xl font-semibold mb-4">Developers</h2>
          <p className="text-gray-700">
            Support stronger long-term building outcomes through optional financial resilience for your projects.
          </p>

          <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
            <li>Applicable to current and future projects</li>
            <li>Voluntary and owner-initiated participation</li>
            <li>No post-handover obligations</li>
            <li>Supports long-term building reputation</li>
          </ul>

          <div className="mt-6">
            <ButtonPill href="/apartments/developers">
              For Developers
            </ButtonPill>
          </div>
        </div>
<div className="relative w-full h-64 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
  <img
    src="/stencils/developer-stencil.svg"
    alt=""
    className="w-4/5 h-4/5 opacity-50"
  />
</div>

      </section>

      {/* INDIVIDUAL OWNERS */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            Who this is for
          </p>
          <h2 className="text-2xl font-semibold mb-4">Individual Owners</h2>
          <p className="text-gray-700">
            See whether refinancing your loan could help offset your apartment levies.
          </p>

          <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
            <li>No obligation to proceed</li>
            <li>Only where outcomes are equal or better</li>
            <li>Rebates applied directly to your levy</li>
          </ul>

          <div className="mt-6">
            <ButtonPill href="/apartments/levyoffsetreview">
              For Owners
            </ButtonPill>
          </div>
        </div>

<div className="relative w-full h-64 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
  <img
    src="/stencils/individual-owner-stencil.svg"
    alt=""
    className="w-5/6 h-5/6 opacity-50"
  />
</div>

      </section>

      {/* FOOTER NOTE */}
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <div className="h-px bg-gray-200 my-10" />
        <p className="text-sm text-gray-500">
          Participation is always voluntary and owner-initiated.
          <br />
          Levy Offset supports building funding and does not replace levies or Owners Corporation governance.
        </p>
      </section>
    </main>
  );
}
