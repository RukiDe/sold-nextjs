import { ButtonPill } from "@/components/ButtonPill";

export default function HomePage() {
  return (
    <main>
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-10">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
          Sold
        </p>

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900">
          We’re building a financial operating system for homeowners.
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-3xl">
          For now, Sold turns mortgage commissions into relief.
        </p>

        <div className="mt-5 max-w-3xl text-gray-700 leading-relaxed space-y-3">
          <p>
            This is because for most households, the mortgage is the largest recurring cost.
            It’s also the only one that quietly generates an ongoing commission for brokers.
          </p>

          <p>
            If you choose to refinance through Sold, we rebate that ongoing commission
            back to you. You choose how it’s paid: applied to household bills, credited
            directly to your bank account or elsewhere.
          </p>
        </div>

        <div className="mt-7">
          <p className="text-sm text-gray-600 mb-3">
            Start with your ownership type:
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <ButtonPill href="/apartments">Apartments</ButtonPill>
            <ButtonPill href="/houses">Houses</ButtonPill>
          </div>
        </div>

        <p className="mt-5 text-sm text-gray-500">
          No credit checks • Clear recommendations • You’re always in control
        </p>
      </section>
    </main>
  );
}
