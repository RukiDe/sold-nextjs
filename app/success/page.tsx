"use client";

import { ButtonPill } from "@/components/ButtonPill";

export default function RefinanceSuccess() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-24 pb-24">
      <section className="space-y-8">
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-[#0B0F1B]">
          Thanks<span className="inline-block ml-2">✨</span>
        </h1>

        <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-[#111827]">
          <h2 className="text-2xl font-semibold">What happens next</h2>

          <p>
            💌 You will receive an email with a link to our Privacy &amp; Consent
            form which you will need to esign (it&apos;ll take a hot minute to
            arrive, please check your spam folder too).
          </p>

          <p>
            🖊️ Once signed, we&apos;ll go through a digital fact find of your
            preferences and short list currently available lender options that
            might suit.
          </p>

          <p>
            💰 After this and if you&apos;re feeling comfy, we&apos;ll ask you
            to connect via Open Banking so we can verify data safely.
          </p>

          <p className="pt-2 text-sm text-[#6B7280]">
            Open Banking is the only way to share your data (please never share
            your banking login / passwords).
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonPill href="/">Back to Home</ButtonPill>
          <ButtonPill href="/refinance">Refinance</ButtonPill>
          <ButtonPill href="/first-home-buyer">First Home Buyer</ButtonPill>
          <ButtonPill href="/purchase">Purchase</ButtonPill>
          <ButtonPill href="/investment">Investment</ButtonPill>
        </div>
      </section>
    </main>
  );
}
