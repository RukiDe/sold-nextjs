import Image from "next/image";
import { ButtonPill } from "@/components/ButtonPill";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              Making the ongoing cost of owning property easier to live with
            </h1>

            <p className="text-lg text-gray-700 max-w-xl mb-6">
              Helping homeowners reduce, rebalance, and better understand the
              fixed costs that come with property ownership.
            </p>

            <p className="text-gray-700 mb-4">
              Sold helps homeowners make sense of the long-term costs tied to
              their property, from mortgages to rates, levies, and insurance.
            </p>

            <p className="text-gray-700 mb-4">
              In some cases, that means improving a mortgage. In others, it
              means finding smarter ways to offset or manage unavoidable costs
              over time.
            </p>

            <p className="text-gray-700 mb-8">
              Choose the path that matches how you own your home. Everything is
              voluntary, transparent, and designed to hold up over time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <ButtonPill href="/owners/apartments">Apartment owners</ButtonPill>
              <ButtonPill href="/owners/houses">House owners</ButtonPill>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Lower ongoing costs • Voluntary participation • Transparent
              outcomes
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
            <Image
              src="/stencils/owners-corporation-stencil.svg"
              alt="A calm, well-run building"
              width={820}
              height={520}
              priority
            />
            <p className="mt-4 text-sm text-gray-600">
              Reducing the long-term cost of owning property, one decision at a
              time.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
