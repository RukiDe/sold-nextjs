// app/page.tsx
import Link from "next/link";
import { ButtonPill } from "../components/ButtonPill";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Hero copy */}
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
            Get the <span className="underline underline-offset-4">SOLD</span> feeling ✨
          </h1>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-neutral-700">
            We analyse your situation using Open Banking, then connect you with
            great offers from lenders.
          </p>

          <p className="mt-3 text-sm sm:text-base text-neutral-700 max-w-xl">
            Ready to start? Select what you&apos;re looking for below, answer
            some quick questions and we&apos;ll give you a sense of where you
            stand with a range of offers currently available on the market –
            no credit checks.
          </p>
        </div>

        {/* Pill buttons */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          <ButtonPill href="/refinance-consent">Refinance 💰</ButtonPill>
          <ButtonPill href="/first-home-buyer">First Home 🏰</ButtonPill>
          <ButtonPill href="/purchase">Owner Occupier 🏡</ButtonPill>
          <ButtonPill href="/investment">Investor 📈</ButtonPill>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-neutral-500 max-w-xl">
          No credit check to get started, and we&apos;ll only move ahead if the
          numbers make sense.
        </p>
      </section>
    </main>
  );
}
