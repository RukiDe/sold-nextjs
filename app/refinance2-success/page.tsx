import { ButtonPill } from "@/components/ButtonPill";

export default function Refinance2SuccessPage() {
  return (
    <div className="min-h-[70vh] flex flex-col">
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0B0F1B] mb-8">
            Thanks ✨
          </h1>

          <section className="space-y-6 text-[17px] leading-relaxed text-[#1F2933]">
            <p>
              You&apos;ll receive an email with your unique code inviting you to
              connect via Open Banking.
            </p>

            <p>
              Open Banking is the fastest and most secure way to verify your
              income / expense data so we can present your tailored lender
              matches ❤️
            </p>
          </section>

          <p className="mt-6 text-sm text-[#7B8794]">
            Open Banking is the only way to share your data (please never share
            your banking login / password info).
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonPill href="/">Back to Home</ButtonPill>
            <ButtonPill href="/refinance">Refinance</ButtonPill>
            <ButtonPill href="/first-home-buyer">First Home Buyer</ButtonPill>
            <ButtonPill href="/purchase">Purchase</ButtonPill>
            <ButtonPill href="/investment">Investment</ButtonPill>
          </div>
        </div>
      </main>
    </div>
  );
}
