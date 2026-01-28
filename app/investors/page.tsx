// app/investors/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investors | Sold",
  description:
    "Sold helps households quietly improve their financial position in the background — and provides the system that makes that improvement real.",
};

export default function InvestorsPage() {
  return (
    <main className="relative bg-white text-gray-900 overflow-hidden">
      {/* Soft background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-gray-100 via-white to-gray-100 blur-3xl opacity-90" />
        <div className="absolute -bottom-32 left-1/2 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-r from-white via-gray-100 to-white blur-3xl opacity-70" />
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(17,24,39,0.06)_1px,transparent_0)] [background-size:28px_28px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-14 sm:py-20">
        {/* Top meta */}
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-sm text-gray-700 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
            Investors
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
            <span className="rounded-full border border-gray-200 bg-white/70 px-2 py-1 backdrop-blur">
              Front door
            </span>
            <span className="rounded-full border border-gray-200 bg-white/70 px-2 py-1 backdrop-blur">
              Open Banking
            </span>
            <span className="rounded-full border border-gray-200 bg-white/70 px-2 py-1 backdrop-blur">
              Orchestration
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Sold is building the front door to household finance
            </h1>

            <div className="mt-6 space-y-5 text-lg leading-7 text-gray-700">
              <p>
                Sold helps households quietly improve their financial position in the background — and
                provides the system that makes that improvement real.
              </p>
              <p>
                As finance becomes more automated and agent-driven, value shifts from static ledgers to
                the systems that{" "}
                <span className="font-semibold text-gray-900">initiate action</span>,{" "}
                <span className="font-semibold text-gray-900">interpret intent</span>, and{" "}
                <span className="font-semibold text-gray-900">orchestrate outcomes</span>. Sold is designed
                to be that layer for households.
              </p>
            </div>

            {/* CTAs (optional but nice) */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition"
              >
                Get in touch
              </a>
              <a
                href="mailto:connect@sold.financial?subject=Investor%20intro"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/70 px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur hover:bg-white transition"
              >
                Email an intro
              </a>
            </div>
          </div>

          {/* Right rail: clean “signal” card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-gray-200 bg-white/75 p-6 shadow-sm backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">The shape of the company</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Built for trust, duration, and background improvement.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700">
                  2026 →
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <p className="text-xs font-semibold text-gray-900">Canonical truth</p>
                  <p className="mt-1 text-sm text-gray-600">Open Banking + regulated workflows</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <p className="text-xs font-semibold text-gray-900">Consent to act</p>
                  <p className="mt-1 text-sm text-gray-600">Guardrails, auditability, reversibility</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <p className="text-xs font-semibold text-gray-900">Orchestration</p>
                  <p className="mt-1 text-sm text-gray-600">Less friction, fewer steps</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <p className="text-xs font-semibold text-gray-900">Compounding trust</p>
                  <p className="mt-1 text-sm text-gray-600">Outcomes improve over time</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Investor page, simplified.</span> The goal
                  is clarity: one mental model, one sentence, and a system designed to make it true.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Travel -> Finance */}
<section className="mt-14">
  <div className="rounded-3xl border border-gray-200 bg-white/75 p-8 shadow-sm backdrop-blur">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-gray-900">Conceptual overview</p>
      <h2 className="text-2xl font-semibold text-gray-900">
        Travel showed the pattern. Finance is next.
      </h2>
      <p className="mt-2 text-base leading-7 text-gray-700">
        In travel, the internet didn’t remove airlines or reservation systems. It shifted value to the
        platforms that owned the front door, translated intent, and initiated action. Finance is now
        entering the same phase: banks remain the system of record, but Open Banking and modern workflows
        allow new front doors to orchestrate outcomes across institutions.
      </p>
    </div>

    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      {/* Travel */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-500">Travel</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">From systems of record to front doors</p>
          </div>
          <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
            GDS → OTA
          </span>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-xs font-semibold text-gray-900">Suppliers</p>
            <p className="mt-1 text-sm text-gray-600">Airlines and hotels</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-xs font-semibold text-gray-900">System of record</p>
            <p className="mt-1 text-sm text-gray-600">Reservation infrastructure (GDS)</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-xs font-semibold text-gray-900">Front door</p>
            <p className="mt-1 text-sm text-gray-600">Booking platforms (OTAs) that own search and intent</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Value shifted</span> to whoever initiated the
              journey.
            </p>
          </div>
        </div>
      </div>

      {/* Finance */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-500">Finance (Australia)</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">Banks endure, front doors evolve</p>
          </div>
          <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
            Core → Orchestration
          </span>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-xs font-semibold text-gray-900">Suppliers</p>
            <p className="mt-1 text-sm text-gray-600">Banks and lenders</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-xs font-semibold text-gray-900">System of record</p>
            <p className="mt-1 text-sm text-gray-600">
              AML, compliance, settlement, and core banking ledgers
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-xs font-semibold text-gray-900">Front door</p>
            <p className="mt-1 text-sm text-gray-600">
              A system that interprets household state and, with consent, initiates better outcomes across
              institutions
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Banks remain essential</span>, but economics move
              toward initiation and orchestration.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-6">
      <p className="text-sm font-semibold text-gray-900">Where Sold fits</p>
      <p className="mt-2 text-sm leading-6 text-gray-700">
        Sold is designed to be the household finance front door: anchored to canonical truth via Open
        Banking, built to earn consent, and designed to orchestrate action so finances improve quietly in
        the background.
      </p>
    </div>
  </div>
</section>

        {/* Divider */}
        <div className="mt-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <div className="text-xs text-gray-500">Ambition</div>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Ambition */}
        <section className="mt-10">
          <div className="rounded-3xl border border-gray-200 bg-white/75 p-8 shadow-sm backdrop-blur">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <h2 className="text-2xl font-semibold text-gray-900">Our ambition</h2>
                <p className="mt-3 text-lg leading-7 text-gray-700">
                  Sold aims to become the long-lived financial front door for households — the system that
                  continuously improves financial outcomes as life changes.
                </p>
                <p className="mt-3 text-lg leading-7 text-gray-700">
                  As finance becomes agent-driven, the system that initiates action becomes more valuable
                  than the system that records it.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="rounded-full border border-gray-200 bg-white/70 px-3 py-1 backdrop-blur">
                Built for duration
              </span>
              <span className="rounded-full border border-gray-200 bg-white/70 px-3 py-1 backdrop-blur">
                Regulation-aware
              </span>
              <span className="rounded-full border border-gray-200 bg-white/70 px-3 py-1 backdrop-blur">
                Trust compounds
              </span>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <footer className="mt-10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Sold Financial
        </footer>
      </div>
    </main>
  );
}
