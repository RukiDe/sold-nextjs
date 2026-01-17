import Image from "next/image";
import { ButtonPill } from "@/components/ButtonPill";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Sold
            </p>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              Helping homeowners manage the cost of ownership.
            </h1>

            <p className="text-lg text-gray-700 max-w-xl mb-6">
              Mortgages, rates, levies, insurance. The unavoidable stuff that
              adds up over time.
            </p>

            <p className="text-gray-700 mb-4">
              Sold helps you understand what you’re paying, what’s normal, and
              what (if anything) is worth changing.
            </p>

            <p className="text-gray-700 mb-8">
              Sometimes that’s a mortgage improvement. Sometimes it’s an offset
              or a better structure for ongoing costs. And sometimes the right
              answer is: you’re already in a good spot.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <ButtonPill href="/owners/apartments">Apartment owners</ButtonPill>
              <ButtonPill href="/owners/houses">House owners</ButtonPill>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              No credit checks • Voluntary participation •
              Transparent outcomes
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
              Reducing the long-term cost of ownership, one decision at a time.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
