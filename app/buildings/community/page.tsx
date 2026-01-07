import Image from "next/image";
import { ButtonPill } from "@/components/ButtonPill";

export default function CommunityPage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              Community
            </h1>

            <p className="text-lg text-gray-700 max-w-xl mb-6">
              A building-friendly way to connect residents with local businesses,
              while supporting building funds over time.
            </p>

            <p className="text-gray-700 mb-4">
              Sold helps apartment buildings run simple, opt-in community programs
              that benefit residents, strengthen the local economy, and create
              predictable funding that can be directed toward building costs.
            </p>

            <p className="text-gray-700 mb-8">
              We’re not trying to turn apartment buildings into billboards. This
              is designed to be quiet, appropriate, and governed.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
            <Image
              src="/stencils/owners-corporation-stencil.svg"
              alt="A calm community ecosystem connecting buildings and local businesses"
              width={820}
              height={520}
              priority
            />
            <p className="mt-4 text-sm text-gray-600">
              Local value in, shared benefit out.
            </p>
          </div>
        </div>
      </section>

      {/* OWNERS CORPORATIONS */}
      <section
        id="owners-corporations"
        className="max-w-5xl mx-auto px-4 pb-12 scroll-mt-20"
      >
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm bg-white">
          <div className="flex gap-5 items-start">

            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">
                For Owners Corporations
              </h2>

              <p className="text-gray-700 mb-4">
                A calmer way to support building costs, without increasing risk
                or creating noise for residents.
              </p>

              <ul className="text-gray-700 space-y-2">
                <li>• Optional, committee-approved community program.</li>
                <li>
                  • Predictable contributions that can be directed to agreed
                  building purposes.
                </li>
                <li>
                  • Resident-first design: low frequency, no spam, clear rules.
                </li>
                <li>
                  • Transparent reporting suitable for AGM and OC records.
                </li>
              </ul>

              <p className="text-xs text-gray-500 mt-4">
                Any contribution to building funds would be implemented in line
                with OC governance and approvals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL BUSINESSES */}
      <section
        id="local-businesses"
        className="max-w-5xl mx-auto px-4 pb-12 scroll-mt-20"
      >
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm bg-white">
          <div className="flex gap-5 items-start">

            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">
                For local businesses
              </h2>

              <p className="text-gray-700 mb-4">
                Reach nearby residents through a permissioned, building-friendly
                channel — and support the places your customers live.
              </p>

              <ul className="text-gray-700 space-y-2">
                <li>
                  • Hyper-local placement in participating apartment buildings.
                </li>
                <li>
                  • More respectful than flyers, more relevant than broad ads.
                </li>
                <li>
                  • Clear categories, exclusions, and frequency limits.
                </li>
                <li>
                  • Designed to build trust with residents over time.
                </li>
              </ul>

              <p className="text-xs text-gray-500 mt-4">
                We prioritise quality over volume. Not every building is a fit —
                and that’s intentional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-6">How it works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="text-sm text-gray-500 mb-2">Step 1</div>
              <div className="font-semibold mb-2">A building opts in</div>
              <p className="text-sm text-gray-700">
                The committee approves guidelines covering placement,
                categories, and frequency.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="text-sm text-gray-500 mb-2">Step 2</div>
              <div className="font-semibold mb-2">
                Businesses sponsor resident benefits
              </div>
              <p className="text-sm text-gray-700">
                Offers are designed to be useful and appropriate for apartment
                residents.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="text-sm text-gray-500 mb-2">Step 3</div>
              <div className="font-semibold mb-2">Value flows back</div>
              <p className="text-sm text-gray-700">
                Residents benefit, and buildings can receive predictable,
                transparent support over time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
