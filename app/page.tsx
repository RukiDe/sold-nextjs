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
              Making apartment costs easier to live with
            </h1>

            <p className="text-lg text-gray-700 max-w-xl mb-6">
              Creating shared upside for owners, residents and local businesses
              over time.
            </p>

            <p className="text-gray-700 mb-4">
              Sold works across two worlds: helping individuals improve their
              mortgage position, and helping buildings improve how ongoing costs
              are funded and experienced.
            </p>

            <p className="text-gray-700 mb-8">
              Choose the path that matches your situation. We keep it simple and
              only recommend options that make sense.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <ButtonPill href="/individuals">Individuals</ButtonPill>
              <ButtonPill href="/buildings">Buildings</ButtonPill>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Lower levies • Voluntary participation • Transparent outcomes  
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
              Reducing levy pressure for owners. Strengthening apartment living.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
