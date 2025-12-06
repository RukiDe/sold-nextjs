"use client";

import { useEffect, useState } from "react";
import { ButtonPill } from "@/components/ButtonPill";

type SavingsOption = {
  key: "A" | "B" | "C";
  indicativeRate: number;
  newMonthly: number;
  monthlySaving: number;
  interestSaved5: number;
};

type Props = {
  email: string | null;
};

type OwnerType = "OO" | "INV" | null;

function formatCurrency(value: number | null | undefined): string {
  if (value == null || !isFinite(value)) return "—";
  const abs = Math.round(value);
  return abs.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  });
}

function formatInterest(value: number | null | undefined): string {
  if (value == null || !isFinite(value) || value <= 0) return "—";
  const rounded = Math.round(value / 100) * 100;
  return rounded.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  });
}

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white px-6 py-6 sm:px-8 sm:py-8 shadow-sm animate-pulse">
      <div className="h-3 w-20 bg-gray-200 rounded mb-4" />
      <div className="h-5 w-40 bg-gray-200 rounded mb-3" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 rounded" />
      </div>
      <div className="border-t border-dashed border-[#E5E7EB] my-4" />
      <div className="space-y-2">
        <div className="h-3 w-1/2 bg-gray-200 rounded" />
        <div className="h-3 w-3/4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default function SavingsPreviewClient({ email }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonthly, setCurrentMonthly] = useState<number | null>(null);
  const [options, setOptions] = useState<SavingsOption[] | null>(null);
  const [ownerType, setOwnerType] = useState<OwnerType>(null);
  const [isOnGoodWicket, setIsOnGoodWicket] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!email) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      setShowContent(false);

      try {
        const res = await fetch("/api/refinance-preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
          if (!cancelled) {
            setError(data?.error || "Unable to load your savings preview.");
          }
          return;
        }

        if (!cancelled) {
          setCurrentMonthly(data.currentMonthly ?? null);
          setOptions(data.options || []);
          setOwnerType(
            data.ownerOrInvestor === "INV"
              ? "INV"
              : data.ownerOrInvestor === "OO"
              ? "OO"
              : null
          );
          setIsOnGoodWicket(!!data.isOnGoodWicket);
          requestAnimationFrame(() => setShowContent(true));
        }
      } catch (err: any) {
        console.error("Savings preview error", err);
        if (!cancelled) {
          setError("Unable to load your savings preview.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [email]);

  if (!email) return null;

  // Dynamic "as at" date
  const todayString = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const hasOptions = options && options.length === 3;

  let bestOption: SavingsOption | null = null;
  let maxMonthlySaving = 0;
  let maxInterestSaved5 = 0;

  if (hasOptions) {
    bestOption = options!.reduce((best, o) =>
      o.newMonthly < best.newMonthly ? o : best
    );
    maxMonthlySaving = Math.max(...options!.map((o) => o.monthlySaving));
    maxInterestSaved5 = Math.max(...options!.map((o) => o.interestSaved5));
  }

  const heading =
    ownerType === "INV"
      ? "A quick look at how your investment loan could perform"
      : "A quick look at your potential savings";

  const subheading =
    ownerType === "INV"
      ? "These are high-level estimates based on what you just shared about your investment loan."
      : "These are high-level estimates based on what you just shared about your home loan.";

  const showGoodWicket = hasOptions && (isOnGoodWicket || maxMonthlySaving <= 0);

  return (
    <section className="mt-16">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B0F1B] mb-3">
        {heading}
      </h2>

      <p className="text-[15px] sm:text-[16px] text-[#4A5563] max-w-3xl mb-6">
        {subheading}
      </p>

      {loading && !options && !error && (
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {showGoodWicket && (
        <div className="mb-8 rounded-3xl border border-[#E5E7EB] bg-[#F9FAFB] px-6 py-6 sm:px-8 sm:py-8">
          <h3 className="text-lg font-semibold text-[#111827] mb-3">
            You&apos;re on a pretty good wicket right now ⚡
          </h3>
          <p className="text-sm text-[#4B5563] mb-3">
            Based on what you&apos;ve shared, our current panel of lenders
            can&apos;t clearly beat your setup on repayments right now. That&apos;s
            actually a good thing.
          </p>
          <p className="text-sm text-[#4B5563] mb-3">
            Rates and cashback offers change regularly though — and sometimes we
            can still negotiate sharper pricing with your existing lender.
          </p>
          <p className="text-sm text-[#4B5563] mb-4">
            If you&apos;d like, book a quick chat and we can keep an eye on the
            market for you or see if there&apos;s any room to sharpen things.
          </p>

          <ButtonPill
            href="https://calendly.com/rukid-sold/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a quick chat
          </ButtonPill>
        </div>
      )}

      {hasOptions && !showGoodWicket && (
        <div
          className={`transition-opacity duration-500 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          {bestOption && maxMonthlySaving > 0 && (
            <div className="mb-6 space-y-3 text-sm text-[#4B5563]">
              <div>
                Your lowest repayment option is{" "}
                <span className="font-medium">
                  {formatCurrency(bestOption.newMonthly)}
                </span>
                , which is around{" "}
                <span className="font-medium">
                  {formatCurrency(maxMonthlySaving)}
                </span>{" "}
                less per month than what you&apos;re paying now (before any fees
                or changes are confirmed).
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#0B0F1B] text-white px-4 py-2 text-xs sm:text-sm">
                  <span className="opacity-80">Estimated monthly saving up to</span>
                  <span className="font-semibold">
                    {formatCurrency(maxMonthlySaving)}
                  </span>
                </div>

                {maxInterestSaved5 > 0 && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#0B0F1B]/15 bg-[#F9FAFB] px-4 py-2 text-xs sm:text-sm text-[#111827]">
                    <span className="opacity-80">
                      Approx. interest saved over 5 years up to
                    </span>
                    <span className="font-semibold">
                      {formatInterest(maxInterestSaved5)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-3 mb-8">
            {options!.map((opt) => {
              const titleOO =
                opt.key === "A"
                  ? "Focus on lower monthly repayments."
                  : opt.key === "B"
                  ? "Balance of rate & flexibility."
                  : "Keep flexibility, still improve your rate.";

              const titleINV =
                opt.key === "A"
                  ? "Dial down your investment repayments."
                  : opt.key === "B"
                  ? "Balance yield, rate & flexibility."
                  : "Keep flexibility while still sharpening your rate.";

              const title = ownerType === "INV" ? titleINV : titleOO;

              return (
                <div
                  key={opt.key}
                  className="rounded-3xl border border-[#E5E7EB] bg-white px-6 py-6 sm:px-8 sm:py-8 shadow-sm flex flex-col"
                >
                  <div className="text-xs tracking-[0.18em] text-[#9CA3AF] mb-3">
                    OPTION {opt.key}
                  </div>

                  <h3 className="text-lg font-semibold text-[#111827] mb-4">
                    {title}
                  </h3>

                  <dl className="space-y-2 text-sm text-[#374151]">
                    <div className="flex items-baseline justify-between">
                      <dt className="text-[#6B7280]">Indicative rate</dt>
                      <dd className="font-medium">
                        {opt.indicativeRate.toFixed(2)}%{" "}
                        <span className="text-xs text-[#6B7280]">p.a.</span>
                      </dd>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <dt className="text-[#6B7280]">Your current monthly</dt>
                      <dd className="font-medium">
                        {formatCurrency(currentMonthly)}
                      </dd>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <dt className="text-[#6B7280]">
                        New monthly (approx.)
                      </dt>
                      <dd className="font-medium">
                        {formatCurrency(opt.newMonthly)}
                      </dd>
                    </div>
                  </dl>

                  <div className="border-t border-dashed border-[#E5E7EB] my-4" />

                  <dl className="space-y-2 text-sm text-[#374151] mt-auto">
                    <div className="flex items-baseline justify-between">
                      <dt className="text-[#6B7280]">
                        Potential monthly saving
                      </dt>
                      <dd className="font-medium">
                        {opt.monthlySaving > 0 ? (
                          <span className="inline-flex rounded-full bg-[#ECFDF3] text-[#166534] px-3 py-1 text-xs sm:text-sm">
                            {formatCurrency(opt.monthlySaving)}
                          </span>
                        ) : (
                          "—"
                        )}
                      </dd>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <dt className="text-[#6B7280]">
                        Approx. interest saved over 5 years
                      </dt>
                      <dd className="font-medium">
                        {opt.interestSaved5 > 0 ? (
                          <span className="inline-flex rounded-full bg-[#EFF6FF] text-[#1D4ED8] px-3 py-1 text-xs sm:text-sm">
                            {formatInterest(opt.interestSaved5)}
                          </span>
                        ) : (
                          "—"
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>

          <p className="text-xs sm:text-[13px] text-[#6B7280] mb-6 max-w-3xl">
            These options are based on our panel of lenders as at{" "}
            <span className="font-medium">{todayString}</span>. We&apos;re not
            showing lender names here — we&apos;ll go through the actual options
            together and talk through what&apos;s in your best interests.
          </p>

          <section className="space-y-6 text-[17px] leading-relaxed text-[#1F2933] mb-8">
            <p>
              Before we can share specific lender options, we need your signed{" "}
              <strong>Privacy &amp; Credit Consent</strong> form (it will take
              minutes to do).
            </p>

            <p>You&apos;ll receive an email shortly with your form ❤️</p>
          </section>

          <div className="mt-6 flex flex-wrap gap-4 mb-4">
            <ButtonPill
              href="https://calendly.com/rukid-sold/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Let&apos;s have a quick chat to unpack this
            </ButtonPill>
          </div>

          <span className="text-xs sm:text-[13px] text-[#6B7280]">
            No pressure, no jargon — just a clearer view of your options.
          </span>
        </div>
      )}
    </section>
  );
}
