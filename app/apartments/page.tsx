import Link from "next/link";
import { ButtonPill } from "@/components/ButtonPill";

export default function ApartmentsHubPage() {
  return (
    <main>
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-4">Apartments</h1>

        <p className="text-lg text-gray-700 mb-10">
          Smarter finance for apartment buildings. Reducing levy pressure. Supporting better buildings.
        </p>

        <div className="space-y-6">
          {/* Owners Corporations */}
          <div className="border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Owners Corporations</h2>
            <p className="text-gray-700 mb-4">
              Reduce levy pressure over time without changing how your building is governed or funded.
            </p>
            <Link href="/apartments/ownerscorporations">
              <ButtonPill>For Owners Corporations</ButtonPill>
            </Link>
          </div>

          {/* Developers */}
          <div className="border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Developers</h2>
            <p className="text-gray-700 mb-4">
              Support stronger long-term building outcomes through optional, embedded financial resilience.
            </p>
<Link href="/apartments/developers">
  <ButtonPill>For Developers</ButtonPill>
</Link>

          </div>

          {/* Individual Owners */}
          <div className="border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Individual Owners</h2>
            <p className="text-gray-700 mb-4">
              See whether refinancing your loan could help offset your apartment levies.
            </p>
            <Link href="/apartments/levyoffsetreview">
              <ButtonPill>Levy Offset Review</ButtonPill>
            </Link>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-10">
          Participation is always voluntary and owner-initiated. Levy Offset does not replace levies or building funding.
        </p>
      </section>
    </main>
  );
}
