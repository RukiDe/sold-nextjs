import { ButtonPill } from "@/components/ButtonPill";

export default function Refinance2SuccessPage() {
  return (
    <div className="min-h-[70vh] flex flex-col">
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0B0F1B] mb-8">
            Thanks — you&apos;re nearly there ✨
          </h1>

          <section className="space-y-6 text-[17px] leading-relaxed text-[#1F2933]">
            <p>
              Your fact find has been submitted — thanks for taking the time to
              do that. It gives us enough to understand your current setup and
              what might suit you better.
            </p>

            <p>
              Before we can review your numbers or share lender options, we need
              your formal <strong>Privacy &amp; Credit Consent</strong> (it is a
              legal requirement and takes minutes to review).
            </p>

            <p>
              You&apos;ll receive an email shortly with your consent
              form. Once that&apos;s signed, we&apos;ll send your secure{" "}
              <strong>Open Banking link</strong> so you can verify your data in
              a fast, safe way — without uploading statements + a link to have a chat.
            </p>

            <p>Speak soon — keen to help you get clarity ❤️</p>
          </section>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonPill href="/">Back to Home</ButtonPill>
          </div>
        </div>
      </main>
    </div>
  );
}
