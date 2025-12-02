// app/thank-you/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanks – Next Steps | Sold",
  description:
    "Thanks for completing your form with Sold. Here’s what happens next with your home loan journey.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#0B0F1B] text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        {/* Top badge / logo-ish header */}
        <div className="mb-10">
          <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide uppercase text-white/70">
            Thanks ✨
          </p>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-5">
          You&apos;re all set.
        </h1>

        <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl">
          Your details are in. Here&apos;s what happens next so you know exactly
          where things are up to.
        </p>

        <section className="space-y-8 bg-white text-[#0B0F1B] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          {/* Step 1 */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
              <span role="img" aria-label="email">
                💌
              </span>
              Check your inbox
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              You&apos;ll receive an email shortly with your next step — either a
              link to <strong>book a quick chat</strong> or to{" "}
              <strong>connect via Open Banking</strong>. If it hasn&apos;t
              arrived in a couple of minutes, it&apos;s worth checking your junk
              or spam folder.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
              <span role="img" aria-label="clipboard">
                🗂
              </span>
              We&apos;ll review your details
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              Your form gives us the signal we need to start shaping your plan
              — sense-checking your numbers, understanding your goals, and
              short-listing lender options that could fit.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
              <span role="img" aria-label="lock">
                🔐
              </span>
              Open Banking (optional, but powerful)
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-2">
              If you&apos;re prompted in the email, you can securely connect
              your accounts via our Open Banking partner. It gives us a real-time
              read on your situation without any paperwork.
            </p>
            <ul className="list-disc pl-5 text-sm sm:text-base text-neutral-700 space-y-1">
              <li>It&apos;s 100% secure and regulated.</li>
              <li>Takes just a few minutes.</li>
              <li>Helps us build a clearer, more accurate picture for you.</li>
            </ul>
          </div>

          {/* Compliance note */}
          <div className="pt-4 border-t border-neutral-200 mt-2">
            <p className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed">
              Open Banking is the only secure way to share data with us — please
              never share your banking logins or passwords. If you&apos;re ever
              unsure about an email or request, reach out at{" "}
              <a
                href="mailto:connect@sold.financial"
                className="underline underline-offset-2"
              >
                connect@sold.financial
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
