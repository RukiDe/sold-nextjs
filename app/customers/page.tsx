import { ButtonPill } from "@/components/ButtonPill";

export default function CustomersPage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
            Your data, verified.
            <span className="block">Your control, guaranteed.</span>
          </h1>

          <p className="text-lg text-gray-700 mb-4">
            Sold uses Australia&apos;s Open Banking system to securely verify key
            financial information. That verification layer reduces friction,
            improves accuracy, and helps ensure any recommendation is defensible.
          </p>

          <p className="text-sm text-gray-600 mb-8">
            Government-regulated. Read-only. Time-limited access.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonPill href="https://app.frollo.com.au/register?types=consolidated&external_party_key=RUKI001">
              Connect via Open Banking
            </ButtonPill>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            You&apos;ll be directed to Frollo, our Open Banking partner and can withdraw consent at any time. Connecting doesn&apos;t obligate
            you to refinance.
          </p>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="border border-gray-200 rounded-2xl p-4 bg-white">
            <p className="text-sm font-medium text-gray-900">
              Government-regulated
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Open Banking (CDR) framework
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-4 bg-white">
            <p className="text-sm font-medium text-gray-900">Read-only access</p>
            <p className="text-sm text-gray-600 mt-1">
              No ability to move money
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-4 bg-white">
            <p className="text-sm font-medium text-gray-900">Time-limited</p>
            <p className="text-sm text-gray-600 mt-1">
              Consent expires by design
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-4 bg-white">
            <p className="text-sm font-medium text-gray-900">Best Interests Duty</p>
            <p className="text-sm text-gray-600 mt-1">
              Recommendations must be better
            </p>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-3">
              Why Open Banking matters
            </h2>
            <p className="text-gray-700 mb-4">
              Open Banking isn&apos;t just about convenience. It replaces
              “trust-me” processes with verified data, helping mortgage reviews
              stay accurate and consistent.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Less manual uploading and chasing paperwork</li>
              <li>Fewer errors from screenshots, PDFs, and missing details</li>
              <li>Faster, more reliable assessment of your current position</li>
              <li>Clear “nothing to do” outcomes when no improvement exists</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <h2 className="text-xl font-semibold mb-3">What you control</h2>
            <p className="text-gray-700 mb-4">
              When you connect via Open Banking, you remain in control at all
              times.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access is read-only (we can&apos;t move money)</li>
              <li>You choose which accounts are shared</li>
              <li>Consent is explicit and time-limited</li>
              <li>You can withdraw consent at any time</li>
              <li>Data is used solely to assess your mortgage position</li>
            </ul>

            <div className="mt-5 border border-gray-200 rounded-xl p-4 bg-gray-50">
              <p className="text-sm text-gray-700">
                Connecting does not commit you to a refinance. A recommendation
                is only made if it clearly improves your financial position.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <h2 className="text-xl font-semibold mb-4">The difference it makes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <p className="text-sm font-medium text-gray-900 mb-3">
              Without Open Banking
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Manual uploads (statements, screenshots, PDFs)</li>
              <li>Incomplete information and back-and-forth</li>
              <li>Slower reviews</li>
              <li>Higher risk of missed details</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <p className="text-sm font-medium text-gray-900 mb-3">
              With Open Banking
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Verified data sourced directly from your bank</li>
              <li>Read-only access, time-limited consent</li>
              <li>Faster, more consistent assessment</li>
              <li>More confident “better / no better” outcomes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">
            Ready to connect via Open Banking?
          </h2>
          <p className="text-gray-700 mb-6">
            It&apos;s read-only, time-limited, and you can withdraw consent at any
            time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonPill href="https://app.frollo.com.au/register?types=consolidated&external_party_key=RUKI001">
              Connect via Open Banking
            </ButtonPill>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Connecting doesn&apos;t obligate you to refinance.
          </p>
        </div>
      </section>
    </main>
  );
}
