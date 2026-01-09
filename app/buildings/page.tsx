import Image from "next/image";
import Link from "next/link";
import { ButtonPill } from "@/components/ButtonPill";

export default function BuildingsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
<h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
  Buildings
</h1>

            <p className="text-lg text-gray-700 mb-4">
              <span className="font-medium text-gray-900">
                Sold is reimagining apartment living
              </span>{" "}
              to ease the burden of ongoing costs for residents, improve
              predictability for Owners Corporations, and build a stronger sense
              of community with local businesses.
            </p>

            <p className="text-gray-700 mb-8">
              We don’t replace levies or change governance. We add careful,
              voluntary revenue or offset opportunities around the system that already exists, designed
              to be transparent, low-risk, and easy to explain.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
            <div className="flex items-center justify-center">
              <Image
              src="/stencils/apartments-hub-stencil.svg"
                alt="A calm, well-run apartment building"
                width={820}
                height={520}
                priority
              />
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Superannuation, but for buildings.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Levy offsets */}
      <section
        id="levy-offsets"
        className="max-w-5xl mx-auto px-4 pb-10 scroll-mt-20"
      >
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm bg-white">
          <div className="flex gap-5 items-start">

            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">Levy offsets</h2>
              <p className="text-gray-700 mb-4">
                Reduce individual levy pressure using value that already exists
                in the system. Participation is voluntary and applied per-owner,
                as a credit against levies that would otherwise be payable.
              </p>

              <ul className="text-gray-700 space-y-2 mb-6">
                <li>• Levies still exist. Budgets still exist. Governance stays the same.</li>
                <li>• No impact on owners who don’t participate.</li>
                <li>• Designed to be boring, predictable, and easy to audit.</li>
              </ul>

              <div className="flex flex-wrap gap-3">
                <ButtonPill href="/buildings/levy-offsets">Learn more</ButtonPill>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Building funding */}
      <section
        id="building-funding"
        className="max-w-5xl mx-auto px-4 pb-10 scroll-mt-20"
      >
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm bg-white">
          <div className="flex gap-5 items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">Building funding</h2>
              <p className="text-gray-700 mb-4">
                Most buildings rely almost entirely on levies for maintenance and
                long-term works. We explore additional, building-aligned funding
                streams that support predictable upkeep and strengthen ties to
                local businesses.
              </p>

              <ul className="text-gray-700 space-y-2 mb-6">
                <li>• Designed for residential environments, not “ad tech”.</li>
                <li>• No speculation. No debt. No balance-sheet risk for the OC.</li>
                <li>• Clear disclosures and opt-in where appropriate.</li>
              </ul>

              <div className="flex flex-wrap gap-3">
                <ButtonPill href="/buildings/community">
                  How it works
                </ButtonPill>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Balance sheets */}
      <section
        id="balance-sheets"
        className="max-w-5xl mx-auto px-4 pb-16 scroll-mt-20"
      >
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm bg-white">
          <div className="flex gap-5 items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">Balance sheets</h2>
              <p className="text-gray-700 mb-4">
                Investment apartments are often judged by rent alone, but the
                lived reality is rent + levies + maintenance + compliance +
                vacancies. We take a balance sheet lens to make ownership feel
                workable over time.
              </p>

              <ul className="text-gray-700 space-y-2 mb-6">
                <li>• Focused on cashflow predictability, not “optimisation theatre”.</li>
                <li>• Helps investors understand true ongoing ownership costs.</li>
                <li>• Supports decisions that still make sense in year 10.</li>
              </ul>

              <div className="flex flex-wrap gap-3">
                <ButtonPill href="/buildings/balance-sheets">
                  Learn more
                </ButtonPill>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
