"use client";

import { useState, useRef } from "react";
import type { RefObject } from "react";
import confetti from "canvas-confetti";

type Step = 0 | 1 | 2;
type ApplicationType = "single" | "joint";

interface FormState {
  goal: string;

  preferredName: string;
  email: string;
  applicationType: ApplicationType;
  partnerName: string;
  partnerEmail: string;

  ownerOrInvestor: string[];
  loanTypes: string[];
  currentLender: string;
  propertyValue: string;
  balance: string;
  repayments: string;
  yearsRemaining: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

type OwnerType = "OO" | "INV" | null;

type SavingsOption = {
  key: "A" | "B" | "C";
  indicativeRate: number;
  newMonthly: number;
  monthlySaving: number;
  interestSaved5: number;
};

const initialState: FormState = {
  goal: "",
  preferredName: "",
  email: "",
  applicationType: "single",
  partnerName: "",
  partnerEmail: "",
  ownerOrInvestor: [],
  loanTypes: [],
  currentLender: "",
  propertyValue: "850000",
  balance: "520000",
  repayments: "2450",
  yearsRemaining: "25",
};

const LENDERS = [
  "ANZ",
  "AMP Bank",
  "Athena",
  "Bank Australia",
  "Bank of Melbourne",
  "BankSA",
  "Bankwest",
  "Bendigo Bank",
  "Beyond Bank",
  "Commonwealth Bank (CBA)",
  "Citibank",
  "Credit Union Australia (CUA)",
  "Great Southern Bank",
  "Heritage Bank",
  "ING",
  "Macquarie",
  "ME Bank",
  "NAB",
  "Pepper Money",
  "St.George",
  "Suncorp",
  "UBank",
  "Westpac",
];

function classNames(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

function formatCurrencyNumber(value: number): string {
  if (!isFinite(value) || value <= 0) return "—";
  const rounded = Math.round(value);
  return rounded.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  });
}

function safeNumber(value: string, fallback: number): number {
  const cleaned = value.toString().replace(/[^\d]/g, "");
  const num = Number(cleaned);
  if (!cleaned || Number.isNaN(num) || num <= 0) return fallback;
  return num;
}

function getCtaLabel(goal: string): string {
  switch (goal) {
    case "Lower my repayments":
      return "Show my savings estimate";
    case "Pay the loan off sooner":
      return "See how fast I could pay it off";
    case "Free up cash for renos":
      return "Check my borrowing power";
    case "Just checking my rate":
      return "Check if I’m overpaying";
    default:
      return "See my estimated savings";
  }
}

// Slider ranges
const PROPERTY_MIN = 200_000;
const PROPERTY_MAX = 3_000_000;
const PROPERTY_STEP = 100_000;

const BALANCE_MIN = 50_000;
const BALANCE_MAX = 2_500_000;
const BALANCE_STEP = 50_000;

const REPAY_MIN = 500;
const REPAY_MAX = 8_000;
const REPAY_STEP = 100;

const YEARS_MIN = 1;
const YEARS_MAX = 35;
const YEARS_STEP = 1;

// Helper for slider bubble position (CSS var)
function getSliderBubbleStyle(value: number, min: number, max: number) {
  const range = max - min || 1;
  const ratio = (value - min) / range;
  const pct = Math.min(98, Math.max(2, ratio * 100));
  return { ["--bubble-left" as any]: `${pct}%` } as any;
}

// Email validation with nicer errors
function validateEmailDetailed(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "Please enter your email.";

  const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!basicRegex.test(trimmed)) {
    if (trimmed.endsWith(".con")) {
      return "That looks like a small typo — did you mean .com?";
    }
    return "Please enter a valid email address.";
  }

  if (trimmed.includes("..") || trimmed.includes("@@") || trimmed.includes(" ")) {
    return "Please enter a valid email address.";
  }

  return null;
}

// Derive owner type from chips
function deriveOwnerType(ownerOrInvestor: string[]): OwnerType {
  const lower = ownerOrInvestor.map((o) => o.toLowerCase());
  if (lower.some((o) => o.includes("invest"))) return "INV";
  if (lower.some((o) => o.includes("owner"))) return "OO";
  return null;
}

// Simple amortisation helper
function monthlyRepayment(
  principal: number,
  annualRatePct: number,
  years: number
): number {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (!isFinite(r) || r <= 0 || !isFinite(n) || n <= 0) {
    return principal / Math.max(n, 1);
  }
  const payment = (principal * r) / (1 - Math.pow(1 + r, -n));
  return payment;
}

// Compute A/B/C options locally (rough, but consistent)
function computeOptions(input: {
  balance: number;
  currentMonthly: number;
  yearsRemaining: number;
  ownerType: OwnerType;
}): { options: SavingsOption[]; isOnGoodWicket: boolean } {
  const { balance, currentMonthly, yearsRemaining, ownerType } = input;

  // Tweaked to better match your current success-page set
  const baseRatesOO = [5.2, 5.25, 5.28];
  const baseRatesINV = [5.6, 5.7, 5.8]; // adjust if you have specific investor rates

  const rateSet = ownerType === "INV" ? baseRatesINV : baseRatesOO;

  // Make sure TypeScript knows these are the literal keys "A" | "B" | "C"
  const optionKeys: SavingsOption["key"][] = ["A", "B", "C"];

  const options: SavingsOption[] = optionKeys.map((key, idx) => {
    const indicativeRate = rateSet[idx];
    const newMonthly = monthlyRepayment(balance, indicativeRate, yearsRemaining);
    const monthlySaving = Math.max(0, currentMonthly - newMonthly);

    // Simple 5-year saving approximation (repayment difference over 60 months)
    const interestSaved5 = Math.max(0, monthlySaving * 60);

    return {
      key,
      indicativeRate,
      newMonthly,
      monthlySaving,
      interestSaved5,
    };
  });

  const maxSaving = Math.max(...options.map((o) => o.monthlySaving));
  const isOnGoodWicket = !isFinite(maxSaving) || maxSaving <= 0;

  return { options, isOnGoodWicket };
}

export default function RefinanceXmasPage() {
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lenderFocused, setLenderFocused] = useState(false);

  // Preview state (for step 2)
  const [previewOptions, setPreviewOptions] = useState<SavingsOption[] | null>(
    null
  );
  const [previewOwnerType, setPreviewOwnerType] = useState<OwnerType>(null);
  const [previewIsGoodWicket, setPreviewIsGoodWicket] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Refs for scrolling/focus
  const step0Ref = useRef<HTMLDivElement | null>(null);
  const loanStepRef = useRef<HTMLDivElement | null>(null);
  const detailsStepRef = useRef<HTMLDivElement | null>(null);
  const ownerRef = useRef<HTMLDivElement | null>(null);
  const loanTypeRef = useRef<HTMLDivElement | null>(null);
  const lenderRef = useRef<HTMLDivElement | null>(null);
  const propertyRef = useRef<HTMLDivElement | null>(null);
  const balanceRef = useRef<HTMLDivElement | null>(null);
  const repaymentsRef = useRef<HTMLDivElement | null>(null);
  const yearsRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLDivElement | null>(null);
  const partnerNameRef = useRef<HTMLDivElement | null>(null);
  const partnerEmailRef = useRef<HTMLDivElement | null>(null);

  const scrollToRef = (ref: RefObject<HTMLDivElement> | null) => {
    if (!ref?.current) return;
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToStepHeader = (s: Step) => {
    if (s === 0) scrollToRef(step0Ref);
    if (s === 1) scrollToRef(loanStepRef);
    if (s === 2) scrollToRef(detailsStepRef);
  };

  const scrollToField = (key: keyof FormState) => {
    switch (key) {
      case "goal":
        scrollToRef(step0Ref);
        break;

      // Loan details (step 1)
      case "ownerOrInvestor":
        scrollToRef(ownerRef);
        break;
      case "loanTypes":
        scrollToRef(loanTypeRef);
        break;
      case "currentLender":
        scrollToRef(lenderRef);
        break;
      case "propertyValue":
        scrollToRef(propertyRef);
        break;
      case "balance":
        scrollToRef(balanceRef);
        break;
      case "repayments":
        scrollToRef(repaymentsRef);
        break;
      case "yearsRemaining":
        scrollToRef(yearsRef);
        break;

      // Personal details (step 2)
      case "preferredName":
        scrollToRef(nameRef);
        break;
      case "email":
        scrollToRef(emailRef);
        break;
      case "partnerName":
        scrollToRef(partnerNameRef);
        break;
      case "partnerEmail":
        scrollToRef(partnerEmailRef);
        break;

      default:
        break;
    }
  };

  const progressPercent = step === 0 ? 33 : step === 1 ? 66 : 100;

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const toggleMulti = (key: "ownerOrInvestor" | "loanTypes", value: string) => {
    setForm((prev) => {
      const current = new Set(prev[key]);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      return { ...prev, [key]: Array.from(current) };
    });
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const validateStep = (s: Step): boolean => {
    const newErrors: Errors = {};

    if (s === 0) {
      if (!form.goal) {
        newErrors.goal = "Pick the option that best matches your goal.";
      }
    }

    // Step 1 – loan details (minimal version)
    if (s === 1) {
      if (form.ownerOrInvestor.length === 0) {
        newErrors.ownerOrInvestor = "Pick at least one option.";
      }
      if (!form.balance.trim()) {
        newErrors.balance = "Add roughly how much you still owe.";
      }
      if (!form.repayments.trim()) {
        newErrors.repayments = "Add your current monthly repayments.";
      }
      if (!form.yearsRemaining.trim()) {
        newErrors.yearsRemaining = "Add your best guess on years remaining.";
      }
    }

    // Step 2 – personal details + joint
    if (s === 2) {
      if (!form.preferredName.trim()) {
        newErrors.preferredName =
          "Please add your name so we know what to call you.";
      }

      const emailError = validateEmailDetailed(form.email);
      if (emailError) {
        newErrors.email = emailError;
      }

      if (form.applicationType === "joint") {
        if (!form.partnerName.trim()) {
          newErrors.partnerName = "Please add your partner’s name.";
        }
        const partnerEmailError = validateEmailDetailed(form.partnerEmail);
        if (partnerEmailError) {
          newErrors.partnerEmail = partnerEmailError.replace(
            "your email",
            "your partner’s email"
          );
        }
      }
    }

    setErrors(newErrors);

    const keys = Object.keys(newErrors) as (keyof FormState)[];
    if (keys.length > 0) {
      scrollToField(keys[0]);
      return false;
    }

    return true;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    if (step < 2) {
      const nextStep = (step + 1) as Step;
      setStep(nextStep);
      setTimeout(() => scrollToStepHeader(nextStep), 80);
    }
  };

  const goBack = () => {
    if (step > 0) {
      const prevStep = (step - 1) as Step;
      setStep(prevStep);
      setTimeout(() => scrollToStepHeader(prevStep), 80);
    }
  };

  // Show preview options (after loan details)
  const handlePreview = () => {
    // Ensure loan details valid
    if (!validateStep(1)) {
      setStep(1);
      return;
    }

    setPreviewLoading(true);
    setSubmitError(null);

    const balanceNum = safeNumber(form.balance, 520000);
    const repayNum = safeNumber(form.repayments, 2450);
    const yearsNum = safeNumber(form.yearsRemaining, 25);
    const ownerType = deriveOwnerType(form.ownerOrInvestor);

    const { options, isOnGoodWicket } = computeOptions({
      balance: balanceNum,
      currentMonthly: repayNum,
      yearsRemaining: yearsNum,
      ownerType,
    });

    setPreviewOptions(options);
    setPreviewOwnerType(ownerType);
    setPreviewIsGoodWicket(isOnGoodWicket);
    setPreviewLoading(false);

    setStep(2);
    setTimeout(() => scrollToStepHeader(2), 80);
  };

  const handleSubmit = async () => {
    // validate personal details step
    if (!validateStep(2)) {
      setStep(2);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/refinance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          preferredName: form.preferredName.trim(),
          currentLender: form.currentLender.trim(),
          refinancingFor: form.ownerOrInvestor,
          loanType: form.loanTypes,
          rate: "",
          balance: form.balance.trim(),
          repayments: form.repayments.trim(),
          termRemaining: form.yearsRemaining.trim(),
          propertyValue: form.propertyValue.trim(),
          applicationType: form.applicationType,
          partnerName: form.partnerName.trim(),
          partnerEmail: form.partnerEmail.trim(),
          goal: form.goal,
          formVariant: "refinance-xmas",
        }),
      });

      if (!res.ok) {
        console.error("Refinance submit failed", await res.text());
        setSubmitError(
          "Hmm, something’s wrong on our side — please give it another go ❤️"
        );
        setSubmitting(false);
        return;
      }

      // 🎉 Confetti celebration
      try {
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore if confetti fails
      }

      // Redirect straight to Calendly with prefilled details
      const url = new URL("https://calendly.com/rukid-sold/30min");
      if (form.preferredName.trim()) {
        url.searchParams.set("name", form.preferredName.trim());
      }
      if (form.email.trim()) {
        url.searchParams.set("email", form.email.trim());
      }

      setTimeout(() => {
        window.location.href = url.toString();
      }, 500);
    } catch (err) {
      console.error("Refinance submit error", err);
      setSubmitError(
        "Hmm, something’s wrong on our side — please give it another go ❤️"
      );
      setSubmitting(false);
    }
  };

  const renderProgress = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs font-medium text-neutral-600 mb-2">
        <span>
          {step === 0
            ? "Step 1 of 3"
            : step === 1
            ? "Step 2 of 3"
            : "Step 3 of 3"}
        </span>
        <span>{progressPercent}% complete</span>
      </div>
      <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );

  const reassurance = (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-neutral-600 mb-4">
      <li>✔ No credit check</li>
      <li>✔ Takes ~60 seconds</li>
      <li>✔ Secure &amp; private</li>
      <li>✔ No documents needed</li>
    </ul>
  );

  const goalOptions = [
    "Lower my repayments",
    "Pay the loan off sooner",
    "Free up cash for renos",
    "Just checking my rate",
  ];

  const ownerOptions = ["Owner Occupier", "Investment Property"];

  const ctaLabel = getCtaLabel(form.goal);

  // Slider numbers (minimal set)
  const balanceNum = safeNumber(form.balance, 520000);
  const repayNum = safeNumber(form.repayments, 2450);
  const yearsNum = safeNumber(form.yearsRemaining, 25);

  // Slider bubble styles
  const balanceBubbleStyle = getSliderBubbleStyle(
    balanceNum,
    BALANCE_MIN,
    BALANCE_MAX
  );
  const repayBubbleStyle = getSliderBubbleStyle(
    repayNum,
    REPAY_MIN,
    REPAY_MAX
  );
  const yearsBubbleStyle = getSliderBubbleStyle(
    yearsNum,
    YEARS_MIN,
    YEARS_MAX
  );

  // Haptic slider change handler
  const handleSliderChange =
    (field: "propertyValue" | "balance" | "repayments" | "yearsRemaining") =>
    (e: any) => {
      const raw = e.target.value;
      updateField(field, raw.toString());

      if (typeof window !== "undefined" && "navigator" in window) {
        const nav: any = window.navigator;
        if (nav.vibrate) {
          try {
            nav.vibrate(10);
          } catch {
            // ignore
          }
        }
      }
    };

  // Derived preview summary
  const hasPreview = !!previewOptions && previewOptions.length === 3;
  let maxMonthlySaving = 0;
  let maxInterestSaved5 = 0;
  let bestOption: SavingsOption | null = null;

  if (hasPreview) {
    maxMonthlySaving = Math.max(...previewOptions!.map((o) => o.monthlySaving));
    maxInterestSaved5 = Math.max(
      ...previewOptions!.map((o) => o.interestSaved5)
    );
    bestOption = previewOptions!.reduce((best, o) =>
      o.newMonthly < best.newMonthly ? o : best
    );
  }

  const heading =
    previewOwnerType === "INV"
      ? "A quick look at how your investment loan could perform"
      : "A quick look at your potential savings";

  const subheading =
    previewOwnerType === "INV"
      ? "These are high-level estimates based on what you shared about your investment loan."
      : "These are high-level estimates based on what you shared about your home loan.";

  const todayString = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero */}
      <header className="mb-8 sm:mb-10">
        <p className="text-sm font-semibold text-neutral-700 mb-2">
          Refinance check · No impact on your credit score
        </p>
        <h1 className="text-3xl sm:text-4xl font-black mb-3">
          Give yourself the gift of a lower mortgage this Christmas 🎄
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 mb-2">
          Answer a few quick questions and we&apos;ll estimate how much you
          could save — before you commit to anything.
        </p>
        <p className="text-sm text-neutral-500">
          Trusted by Australians refinancing over $30m in home loans.
        </p>
      </header>

      <section className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 shadow-sm overflow-hidden">
        {renderProgress()}

        {reassurance}

        <p className="text-sm sm:text-base text-neutral-700 mb-6">
          Most Aussies save $300–$600 a month when they refinance — but banks
          rarely call to tell you. Let&apos;s see if you&apos;re one of them.
        </p>

        {/* STEP 0 – goal */}
        {step === 0 && (
          <div ref={step0Ref}>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              What&apos;s your goal today?
            </h2>
            <div className="flex flex-wrap gap-3 mb-4">
              {goalOptions.map((option) => {
                const active = form.goal === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      updateField("goal", option);
                      setTimeout(() => {
                        setStep(1);
                        setTimeout(() => scrollToStepHeader(1), 80);
                      }, 80);
                    }}
                    className={classNames(
                      "px-4 py-2 rounded-full text-sm sm:text-base border transition-colors",
                      active
                        ? "bg-black text-white border-black"
                        : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {errors.goal && (
              <p className="text-xs text-red-600 mb-2">{errors.goal}</p>
            )}

            <div className="flex justify-between mt-6">
              <span className="text-xs text-neutral-500">
                Takes about a minute. No spam, ever.
              </span>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg:white hover:text-black border border-black transition-colors"
              >
                Start
              </button>
            </div>
          </div>
        )}

        {/* STEP 1 – loan details + minimal sliders */}
        {step === 1 && (
          <div ref={loanStepRef}>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              A few details about your loan
            </h2>

            {/* Owner/investor chips */}
            <div className="mb-4" ref={ownerRef}>
              <p className="text-sm font-medium mb-2">
                Are you refinancing for an *
              </p>
              <div className="flex flex-wrap gap-3">
                {ownerOptions.map((option) => {
                  const active = form.ownerOrInvestor.includes(option);
                  const errorState = !!errors.ownerOrInvestor;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleMulti("ownerOrInvestor", option)}
                      className={classNames(
                        "px-4 py-2 rounded-full text-sm border transition-colors",
                        active
                          ? "bg-black text-white border-black"
                          : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500",
                        errorState && !active && "border-red-400"
                      )}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {errors.ownerOrInvestor && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.ownerOrInvestor}
                </p>
              )}
            </div>

            {/* Minimal sliders */}
            <div className="grid gap-5 mb-3">
              {/* Amount owing */}
              <div ref={balanceRef}>
                <div className="flex items-baseline justify-between mb-1">
                  <label className="text-sm font-medium">
                    Approx. amount owing *
                  </label>
                  <span className="text-sm font-semibold">
                    {formatCurrencyNumber(balanceNum) || "—"}
                  </span>
                </div>
                <div className="slider-wrapper">
                  <div className="slider-bubble" style={balanceBubbleStyle}>
                    {formatCurrencyNumber(balanceNum) || "—"}
                  </div>
                  <input
                    type="range"
                    min={BALANCE_MIN}
                    max={BALANCE_MAX}
                    step={BALANCE_STEP}
                    value={balanceNum}
                    onChange={handleSliderChange("balance")}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-start text-[10px] text-neutral-500 mt-1">
                  <span>
                    {formatCurrencyNumber(BALANCE_MIN)}–{" "}
                    {formatCurrencyNumber(BALANCE_MAX)}+
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  A ballpark is plenty — we&apos;ll refine this later.
                </p>
                {errors.balance && (
                  <p className="mt-1 text-xs text-red-600">{errors.balance}</p>
                )}
              </div>

              {/* Repayments */}
              <div ref={repaymentsRef}>
                <div className="flex items-baseline justify-between mb-1">
                  <label className="text-sm font-medium">
                    Current monthly repayments *
                  </label>
                  <span className="text-sm font-semibold">
                    {formatCurrencyNumber(repayNum) || "—"}
                  </span>
                </div>
                <div className="slider-wrapper">
                  <div className="slider-bubble" style={repayBubbleStyle}>
                    {formatCurrencyNumber(repayNum) || "—"}
                  </div>
                  <input
                    type="range"
                    min={REPAY_MIN}
                    max={REPAY_MAX}
                    step={REPAY_STEP}
                    value={repayNum}
                    onChange={handleSliderChange("repayments")}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-start text-[10px] text-neutral-500 mt-1">
                  <span>
                    {formatCurrencyNumber(REPAY_MIN)}–{" "}
                    {formatCurrencyNumber(REPAY_MAX)}+
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  You can use a rough figure — we&apos;re just sizing the
                  opportunity.
                </p>
                {errors.repayments && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.repayments}
                  </p>
                )}
              </div>

              {/* Years remaining */}
              <div ref={yearsRef}>
                <div className="flex items-baseline justify-between mb-1">
                  <label className="text-sm font-medium">
                    How many years are left on your loan? *
                  </label>
                  <span className="text-sm font-semibold">{yearsNum} yrs</span>
                </div>
                <div className="slider-wrapper">
                  <div className="slider-bubble" style={yearsBubbleStyle}>
                    {yearsNum} yrs
                  </div>
                  <input
                    type="range"
                    min={YEARS_MIN}
                    max={YEARS_MAX}
                    step={YEARS_STEP}
                    value={yearsNum}
                    onChange={handleSliderChange("yearsRemaining")}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-start text-[10px] text-neutral-500 mt-1">
                  <span>
                    {YEARS_MIN}–{YEARS_MAX}+ yrs
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  A guess is fine — we just need a sense of how far through the
                  loan you are.
                </p>
                {errors.yearsRemaining && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.yearsRemaining}
                  </p>
                )}
              </div>
            </div>

            {submitError && (
              <p className="mt-3 text-xs text-red-600">{submitError}</p>
            )}

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={goBack}
                className="text-sm text-neutral-600 hover:text-black"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handlePreview}
                disabled={previewLoading}
                className={classNames(
                  "inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors",
                  previewLoading
                    ? "bg-neutral-400 text-white border-neutral-400 cursor-not-allowed"
                    : "bg-black text-white border-black hover:bg:white hover:text-black"
                )}
              >
                {previewLoading ? "Crunching…" : ctaLabel}
              </button>
            </div>

            <p className="mt-3 text-[11px] text-neutral-500 leading-snug">
              We&apos;ll show you some estimated options first. You can then
              decide if you want to share your details and chat.
            </p>
          </div>
        )}

        {/* STEP 2 – Preview + personal details */}
        {step === 2 && (
          <div ref={detailsStepRef}>
            {/* Preview block */}
            {hasPreview && (
              <div className="mt-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                  {heading}
                </h2>
                <p className="text-[15px] sm:text[16px] text-neutral-600 max-w-3xl mb-4">
                  {subheading}
                </p>

                {!previewIsGoodWicket && bestOption && maxMonthlySaving > 0 && (
                  <div className="mb-6 space-y-3 text-sm text-neutral-700">
                    <div>
                      Your lowest repayment option is{" "}
                        <span className="font-medium">
                          {formatCurrencyNumber(bestOption.newMonthly)}
                        </span>
                      , which is around{" "}
                        <span className="font-medium">
                          {formatCurrencyNumber(maxMonthlySaving)}
                        </span>{" "}
                      less per month than what you&apos;re paying now (before
                      any fees or changes are confirmed).
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-2 text-xs sm:text-sm">
                        <span className="opacity-80">
                          Estimated monthly saving up to
                        </span>
                        <span className="font-semibold">
                          {formatCurrencyNumber(maxMonthlySaving)}
                        </span>
                      </div>

                      {maxInterestSaved5 > 0 && (
                        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-900/15 bg-neutral-50 px-4 py-2 text-xs sm:text-sm text-neutral-900">
                          <span className="opacity-80">
                            Approx. interest saved over 5 years up to
                          </span>
                          <span className="font-semibold">
                            {formatCurrencyNumber(maxInterestSaved5)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {previewIsGoodWicket && (
                  <div className="mb-6 rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-5 sm:px-6 sm:py-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      You&apos;re on a pretty good wicket right now ⚡
                    </h3>
                    <p className="text-sm text-neutral-700 mb-2">
                      Based on what you&apos;ve shared, our current panel of
                      lenders can&apos;t clearly beat your setup on repayments
                      right now. That&apos;s actually a good thing.
                    </p>
                    <p className="text-sm text-neutral-700 mb-2">
                      Rates and cashback offers change regularly though — and
                      sometimes we can still negotiate sharper pricing with your
                      existing lender.
                    </p>
                    <p className="text-sm text-neutral-700">
                      If you&apos;d like, share your details and we can keep an
                      eye on the market for you or see if there&apos;s any room
                      to sharpen things.
                    </p>
                  </div>
                )}

                {!previewIsGoodWicket && (
                  <div className="grid gap-6 lg:grid-cols-3 mb-6">
                    {previewOptions!.map((opt) => {
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

                      const title =
                        previewOwnerType === "INV" ? titleINV : titleOO;

                      return (
                        <div
                          key={opt.key}
                          className="rounded-3xl border border-neutral-200 bg-white px-6 py-6 sm:px-7 sm:py-7 shadow-sm flex flex-col"
                        >
                          <div className="text-xs tracking-[0.18em] text-neutral-400 mb-3">
                            OPTION {opt.key}
                          </div>

                          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                            {title}
                          </h3>

                          <dl className="space-y-2 text-sm text-neutral-800">
                            <div className="flex items-baseline justify-between">
                              <dt className="text-neutral-500">
                                Indicative rate
                              </dt>
                              <dd className="font-medium">
                                {opt.indicativeRate.toFixed(2)}%{" "}
                                <span className="text-xs text-neutral-500">
                                  p.a.
                                </span>
                              </dd>
                            </div>

                            <div className="flex items-baseline justify-between">
                              <dt className="text-neutral-500">
                                Your current monthly
                              </dt>
                              <dd className="font-medium">
                                {formatCurrencyNumber(repayNum)}
                              </dd>
                            </div>

                            <div className="flex items-baseline justify-between">
                              <dt className="text-neutral-500">
                                New monthly (approx.)
                              </dt>
                              <dd className="font-medium">
                                {formatCurrencyNumber(opt.newMonthly)}
                              </dd>
                            </div>
                          </dl>

                          <div className="border-t border-dashed border-neutral-200 my-4" />

                          <dl className="space-y-2 text-sm text-neutral-800 mt-auto">
                            <div className="flex items-baseline justify-between">
                              <dt className="text-neutral-500">
                                Potential monthly saving
                              </dt>
                              <dd className="font-medium">
                                {opt.monthlySaving > 0 ? (
                                  <span className="inline-flex rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs sm:text-sm">
                                    {formatCurrencyNumber(opt.monthlySaving)}
                                  </span>
                                ) : (
                                  "—"
                                )}
                              </dd>
                            </div>

                            <div className="flex items-baseline justify-between">
                              <dt className="text-neutral-500">
                                Approx. interest saved over 5 years
                              </dt>
                              <dd className="font-medium">
                                {opt.interestSaved5 > 0 ? (
                                  <span className="inline-flex rounded-full bg-slate-50 text-slate-800 px-3 py-1 text-xs sm:text-sm">
                                    {formatCurrencyNumber(
                                      opt.interestSaved5
                                    )}
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
                )}

                <p className="text-xs sm:text-[13px] text-neutral-600 mb-6 max-w-3xl">
                  These options are based on our panel of lenders as at{" "}
                  <span className="font-medium">{todayString}</span>. We&apos;re
                  not showing lender names here — we&apos;ll go through the
                  actual options together and talk through what&apos;s in your
                  best interests. All applications are subject to lending
                  criteria and rates are subject to change.
                </p>
              </div>
            )}

            {/* Personal details */}
            <div className="mt-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                Like the look of one of these? Pop your details in and we&apos;ll
                unpack it together.
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div ref={nameRef}>
                  <label className="block text-sm font-medium mb-1">
                    Preferred name *
                  </label>
                  <input
                    type="text"
                    value={form.preferredName}
                    onChange={(e) =>
                      updateField("preferredName", e.target.value)
                    }
                    placeholder="e.g. Alex"
                    className={classNames(
                      "w-full rounded-full border px-4 py-2.5 text-sm sm:text-base outline-none",
                      errors.preferredName
                        ? "border-red-500"
                        : "border-neutral-300 focus:border-black"
                    )}
                  />
                  {errors.preferredName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.preferredName}
                    </p>
                  )}
                </div>
                <div ref={emailRef}>
                  <label className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="e.g. alex@example.com"
                    className={classNames(
                      "w-full rounded-full border px-4 py-2.5 text-sm sm:text-base outline-none",
                      errors.email
                        ? "border-red-500"
                        : "border-neutral-300 focus:border-black"
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2">
                  Is this application just for you, or joint? *
                </p>
                <div className="flex flex-wrap gap-3">
                  {(["single", "joint"] as ApplicationType[]).map((type) => {
                    const label =
                      type === "single" ? "Just me" : "Joint – with my partner";
                    const active = form.applicationType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateField("applicationType", type)}
                        className={classNames(
                          "px-4 py-2 rounded-full text-sm border transition-colors",
                          active
                            ? "bg-black text-white border-black"
                            : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {form.applicationType === "joint" && (
                <div className="grid sm:grid-cols-2 gap-4 mb-2">
                  <div ref={partnerNameRef}>
                    <label className="block text-sm font-medium mb-1">
                      Partner&apos;s name *
                    </label>
                    <input
                      type="text"
                      value={form.partnerName}
                      onChange={(e) =>
                        updateField("partnerName", e.target.value)
                      }
                      placeholder="e.g. Jamie"
                      className={classNames(
                        "w-full rounded-full border px-4 py-2.5 text-sm sm:text-base outline-none",
                        errors.partnerName
                          ? "border-red-500"
                          : "border-neutral-300 focus:border-black"
                      )}
                    />
                    {errors.partnerName && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.partnerName}
                      </p>
                    )}
                  </div>
                  <div ref={partnerEmailRef}>
                    <label className="block text-sm font-medium mb-1">
                      Partner&apos;s email *
                    </label>
                    <input
                      type="email"
                      value={form.partnerEmail}
                      onChange={(e) =>
                        updateField("partnerEmail", e.target.value)
                      }
                      placeholder="e.g. jamie@example.com"
                      className={classNames(
                        "w-full rounded-full border px-4 py-2.5 text-sm sm:text-base outline-none",
                        errors.partnerEmail
                          ? "border-red-500"
                          : "border-neutral-300 focus:border-black"
                      )}
                    />
                    {errors.partnerEmail && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.partnerEmail}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {submitError && (
                <p className="mt-3 text-xs text-red-600">{submitError}</p>
              )}

              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={goBack}
                  className="text-sm text-neutral-600 hover:text-black"
                  disabled={submitting}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={classNames(
                    "inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors",
                    submitting
                      ? "bg-neutral-400 text-white border-neutral-400 cursor-not-allowed"
                      : "bg-black text-white border-black hover:bg:white hover:text-black"
                  )}
                >
                  {submitting ? "Sending..." : "Lock in a quick chat"}
                </button>
              </div>

              <p className="mt-3 text-[11px] text-neutral-500 leading-snug">
                By continuing, you&apos;re happy for Sold Financial to contact
                you about your home loan. We&apos;ll never share your details
                without your permission.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
