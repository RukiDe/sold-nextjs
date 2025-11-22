"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const brevoHtml = `
<!-- Your Brevo form embed HTML goes here -->
<!-- Leave exactly as-is from Brevo -->
`;

export default function RefinanceConsentPage() {
  return (
    <>
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl sm:text-5xl font-black mb-6">
          Refinance your loan, properly.
        </h1>

        <p className="text-lg text-neutral-700 max-w-3xl leading-relaxed">
          This is the first step in giving your home loan a health check — without the pressure
          of sitting in a branch or being sold to. We’ll sense-check your current rate and
          repayments against what’s available on the market today.
        </p>

        <ul className="list-disc ml-6 mt-4 text-neutral-700 space-y-2">
          <li>No credit check at this stage.</li>
          <li>Honest advice — we work for you, not lenders.</li>
          <li>We only recommend a move if it actually puts you ahead and you’re feeling comfy.</li>
        </ul>

        {/* 🔥 Brevo overrides — makes Brevo fields look like Sold fields */}
        <style jsx global>{`
          #sib-container,
          #sib-container * {
            line-height: 1.25 !important;
            font-family: inherit !important;
          }

          /* Remove Brevo container padding */
          #sib-form > div[style] {
            padding: 0 !important;
          }

          /* Clean default blocks */
          .sib-form,
          .sib-form-container,
          .sib-input,
          .entry__field {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }

          /* 🔵 Input pill styling */
          #sib-container input[type="text"],
          #sib-container input[type="email"],
          #sib-container input[type="tel"],
          #sib-container textarea {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 999px !important;
            padding: 14px 20px !important;
            width: 100% !important;
            margin-top: 10px !important;
            font-size: 15px !important;
          }

          /* Placeholder */
          #sib-container input::placeholder,
          #sib-container textarea::placeholder {
            color: #94a3b8 !important;
          }

          /* Button = Sold pill */
          #sib-container .sib-form-block__button {
            border-radius: 999px !important;
            padding: 14px 24px !important;
            font-weight: 600 !important;
            font-size: 16px !important;
            background-color: #0b0f1b !important;
            color: #ffffff !important;
            border: 1px solid #0b0f1b !important;
            transition: 0.2s ease;
          }

          #sib-container .sib-form-block__button:hover {
            background-color: #ffffff !important;
            color: #0b0f1b !important;
          }

          /* Labels */
          #sib-container .entry__label {
            margin-top: 12px !important;
            display: block !important;
            font-weight: 600 !important;
          }

          /* Checkboxes */
          #sib-container .checkbox__label span:last-child {
            padding-left: 8px !important;
          }
        `}</style>

        {/* Brevo Form Container */}
        <div className="mt-10 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div
            className="max-w-xl"
            dangerouslySetInnerHTML={{ __html: brevoHtml }}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
