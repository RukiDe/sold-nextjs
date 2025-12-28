import { ButtonPill } from "@/components/ButtonPill";

export default function ApartmentsHubPage() {
  return (
    <main>
      <section className="max-w-2xl mx-auto px-4 py-16">
        {/* Hero */}
        <h1 className="text-3xl font-semibold mb-4">
          Better financial management for apartment buildings.
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

        {/* Divider */}
        <div className="h-px bg-gray-200 my-10" />

        {/* Pathways */}
        <div className="space-y-6">
          {/* Owners Corporations */}
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Who this is for
            </p>
            <h2 className="text-xl font-semibold mb-2">Owners Corporations</h2>
            <p className="text-gray-700">
              Reduce levy pressure over time without changing how your building is governed or funded.
            </p>

            <div className="mt-6">
              <ButtonPill href="/apartments/ownerscorporations">
                For Owners Corporations
              </ButtonPill>
            </div>
          </div>

          {/* Developers */}
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Who this is for
            </p>
            <h2 className="text-xl font-semibold mb-2">Developers</h2>
            <p className="text-gray-700">
              Support stronger long-term building outcomes through optional financial resilience for your projects.
            </p>

            <div className="mt-6">
              <ButtonPill href="/apartments/developers">
                For Developers
              </ButtonPill>
            </div>
          </div>

          {/* Individual Owners */}
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Who this is for
            </p>
            <h2 className="text-xl font-semibold mb-2">Individual Owners</h2>
            <p className="text-gray-700">
              See whether refinancing your loan could help offset your apartment levies.
            </p>

            <div className="mt-6">
              <ButtonPill href="/apartments/levyoffsetreview">
                Levy Offset Review
              </ButtonPill>
            </div>
          </div>
        </div>

        {/* Footer note */}
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
