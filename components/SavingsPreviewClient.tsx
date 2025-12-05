"use client";

import { useEffect, useState } from "react";

type OptionResult = {
  id: string;
  label: string;
  description: string;
  newRate: number;
  currentMonthly: number;
  newMonthly: number;
  monthlySaving: number;
  fiveYearSaving: number;
  disclaimer: string;
};

type ApiResponse = {
  email: string;
  loanInput: {
    currentBalance: number;
    currentRate: number;
    remainingYears: number;
  };
  options: OptionResult[];
};

type Props = {
  email: string | null;
};

export default function SavingsPreviewClient({ email }: Props) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) return;

    const fetchPreview = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/refinance-preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Unable to fetch preview");
        }

        const json = (await res.json()) as ApiResponse;
        setData(json);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    void fetchPreview();
  }, [email]);

  if (!email) return null;

  return (
    <section className="mt-12 max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
        A quick look at your potential savings
      </h2>
      <p className="text-sm md:text-base text-neutral-600 mb-6">
        These are high-level estimates based on what you just shared. They’re
        designed to give you confidence that a chat is worth it — the exact
        numbers will depend on your full credit assessment.
      </p>

      {loading && (
        <div className="text-sm text-neutral-600">
          Crunching the numbers for you…
        </div>
      )}

      {error && !loading && (
        <div className="text-sm text-red-600 border border-red-200 rounded-xl px-4 py-3 mb-4 bg-red-50">
          {error}
        </div>
      )}

      {data && !loading && (
        <>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-4">
            {data.options.map((opt) => (
              <article
                key={opt.id}
                className="border border-neutral-200 rounded-2xl p-4 md:p-5 flex flex-col justify-between bg-white shadow-sm"
              >
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-1">
                    {opt.label}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {opt.description}
                  </h3>

                  <div className="space-y-1 text-sm text-neutral-700 mb-3">
                    <p className="flex justify-between">
                      <span>Indicative rate</span>
                      <span className="font-medium">
                        {opt.newRate.toFixed(2)}%
                        <span className="text-neutral-500 text-xs ml-1">
                          p.a.
                        </span>
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Your current monthly</span>
                      <span className="font-medium">
                        ${opt.currentMonthly.toFixed(0)}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>New monthly (approx.)</span>
                      <span className="font-medium">
                        ${opt.newMonthly.toFixed(0)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-2 border-top border-neutral-200 pt-3 text-sm border-t border-dashed">
                  <p className="flex justify-between mb-1">
                    <span className="text-neutral-600">
                      Potential monthly saving
                    </span>
                    <span className="font-semibold">
                      {opt.monthlySaving > 0
                        ? `$${opt.monthlySaving.toFixed(0)}`
                        : "—"}
                    </span>
                  </p>
                  <p className="flex justify-between text-xs text-neutral-600">
                    <span>Approx. interest saved over 5 years</span>
                    <span className="font-medium">
                      {opt.fiveYearSaving > 0
                        ? `$${opt.fiveYearSaving.toFixed(0)}`
                        : "—"}
                    </span>
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="text-xs text-neutral-500 mb-4">
            These options are based on lenders{" "}
            <span className="font-medium">we’re accredited with</span>, but
            we’re not showing lender names here. We’ll go through the actual
            options together and confirm what’s suitable for you.
          </p>

          <div className="inline-flex flex-col md:flex-row md:items-center gap-3">
            <a
              href="/book-a-chat" // adjust to your real booking route
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-black text-white hover:bg-neutral-900 transition"
            >
              Book a quick call to unpack this
            </a>
            <span className="text-xs text-neutral-500">
              No pressure, no jargon — just a clearer view of your options.
            </span>
          </div>
        </>
      )}
    </section>
  );
}
