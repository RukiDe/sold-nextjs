import Link from "next/link";

export default function CustomersPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-28">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            For customers
          </h1>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-neutral-700">
            We analyse your current mortgage via Open Banking and compare what
            you&apos;re paying against 100s of other lenders.
          </p>

          <ul className="mt-6 sm:mt-8 space-y-2 sm:space-y-3 list-disc list-inside text-neutral-700 text-sm sm:text-base">
            <li>Connect accounts via Open Banking (read-only, with consent).</li>
            <li>Get personalised savings estimates.</li>
            <li>Make the switch.</li>
          </ul>

          <div className="mt-8 sm:mt-10 flex gap-4 sm:gap-5 flex-wrap">
            <Link
              href="/frollo"
              className="btn btn-primary text-base sm:text-lg w-full sm:w-auto"
            >
              Connect via Open Banking
            </Link>

            <Link
              href="/"
              className="btn btn-ghost text-base sm:text-lg w-full sm:w-auto"
            >
              Back
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
