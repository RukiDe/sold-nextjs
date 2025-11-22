import Link from "next/link";

export default function LendersPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-start">
          {/* Left copy */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              For lenders
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-neutral-700">
              Sold delivers pre-qualified homeowners to your internal teams so
              you can dial mortgage flow up or down whilst respecting internal
              ROE hurdles and cost of capital requirements without touching
              front-book pricing.
            </p>

            <ul className="mt-6 sm:mt-8 space-y-2 sm:space-y-3 list-disc list-inside text-neutral-700 text-sm sm:text-base">
              <li>Portfolio optimisation by segment, postcode, LVR, or channel.</li>
              <li>Consent-backed data for swift income/expense validation.</li>
              <li>No disruption to advertised front-book rates.</li>
            </ul>
          </div>

          {/* Contact card */}
          <div className="border border-neutral-900 rounded-xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-semibold">Contact us</h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-neutral-700">
              We’ll get back to you in 1–2 business days.
            </p>

            <form
              className="mt-5 sm:mt-6 space-y-4 sm:space-y-5"
              action="https://formspree.io/f/your-form-id"
              method="POST"
            >
              <div>
                <label
                  className="block text-sm mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full px-3 py-3 outline-none rounded-lg border border-neutral-300 focus:ring-2 focus:ring-black"
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm mb-1"
                  htmlFor="email"
                >
                  Work email
                </label>
                <input
                  className="w-full px-3 py-3 outline-none rounded-lg border border-neutral-300 focus:ring-2 focus:ring-black"
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm mb-1"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-3 outline-none rounded-lg border border-neutral-300 focus:ring-2 focus:ring-black"
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your portfolio objectives…"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="submit"
                  className="btn btn-primary text-base sm:text-lg w-full sm:w-auto"
                >
                  Send
                </button>

                <Link
                  href="/"
                  className="btn btn-ghost text-base sm:text-lg w-full sm:w-auto"
                >
                  Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
