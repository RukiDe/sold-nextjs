// app/frollo/page.tsx

const year = new Date().getFullYear();

export default function FrolloPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-end">
        <nav className="text-sm flex items-center gap-4 sm:gap-5">
          <a className="link" href="/">Home</a>
          <a className="link" href="/#customers">Customers</a>
          <a className="link" href="/#lenders">Lenders</a>
        </nav>
      </header>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        {/* Hero copy */}
        <div className="max-w-3xl pt-4 sm:pt-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
            Connect via Open Banking
          </h1>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-neutral-700">
            We partner with <strong>Frollo</strong> (CDR-accredited). It’s secure, read-only
            and takes a couple of minutes — no more sharing passwords.
          </p>

          <ul className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-700 space-y-1">
            <li>🔒 Secure</li>
            <li>📖 Read-only</li>
            <li>⚡ Connects in minutes</li>
          </ul>
        </div>

        {/* Form */}
        <div className="max-w-xl mt-10 sm:mt-12">
          <form
            method="POST"
            action="https://13b359ae.sibforms.com/serve/MUIFAFLaD8cvScBhYHTYZlfVFBENdx8kkYJ1_8RJR_kBCKqSBGx-AvjWimpn4lqaNBGTWOy1rz-aKiNW9qlMw2A-pIq9aVkHO0zMm2GeI2lh3pen5gQDCAyP2ZEWzwVLmp6QLVUz-qfD9pSZm10iExjUjF-sPue_BeYOBqM1AuNGyZj9fx0GvU31g19VTtx8EbPlSdpfy2MuVn6feg=="
            className="space-y-6"
          >
            {/* Preferred name */}
            <div className="space-y-2">
              <label
                htmlFor="FIRSTNAME"
                className="block text-[15px] font-semibold text-neutral-900"
              >
                Preferred name <span className="text-[#ff4d4f]">*</span>
              </label>
              <input
                id="FIRSTNAME"
                name="FIRSTNAME"
                type="text"
                required
                maxLength={200}
                autoComplete="off"
                className="w-full rounded-full border border-neutral-200 px-4 py-3 text-[15px] text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="EMAIL"
                className="block text-[15px] font-semibold text-neutral-900"
              >
                You’ll receive a unique link to access Frollo{" "}
                <span className="text-[#ff4d4f]">*</span>
              </label>
              <input
                id="EMAIL"
                name="EMAIL"
                type="email"
                required
                autoComplete="off"
                placeholder="EMAIL"
                className="w-full rounded-full border border-neutral-200 px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200"
              />
              <p className="text-xs text-neutral-500">
                It’ll take a couple of minutes to arrive (check your spam folder too).
              </p>
            </div>

            {/* Honeypot + locale for Brevo */}
            <input
              type="text"
              name="email_address_check"
              defaultValue=""
              className="hidden"
              aria-hidden="true"
            />
            <input type="hidden" name="locale" value="en" />

            {/* CTA button */}
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 focus:ring-offset-white"
            >
              Let’s go!
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 text-sm text-neutral-400">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p>© {year} Sold. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="link" href="/#customers">
                Customers
              </a>
              <a className="link" href="/#lenders">
                Lenders
              </a>
              <a className="link" href="/privacy" target="_blank" rel="noopener">
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="text-xs leading-6 text-neutral-600">
            <p>
              <strong>Sold Financial</strong> is a trading name of{" "}
              <strong>Homei Fi Pty Ltd</strong> (ABN 26 691 328 499).<br />
              Homei Fi Pty Ltd (Credit Representative Number <strong>573517</strong>) is
              authorised under Australian Credit Licence Number <strong>486112</strong>{" "}
              (Purple Circle Financial Services Pty Ltd).
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
