"use client";

import { useState } from "react";

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
  // sliders default starting points (can still be changed)
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

function formatCurrency(value: string): string {
  const numeric = value.replace(/[^\d]/g, "");
  if (!numeric) return "";
  const num = Number(numeric);
  if (Number.isNaN(num)) return "";
  return `$${num.toLocaleString("en-AU")}`;
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

export default function RefinancePage() {
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lenderFocused, setLenderFocused] = useState(false);

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

    if (s === 1) {
      if (!form.preferredName.trim()) {
        newErrors.preferredName = "Please add your name so we know what to call you.";
      }
      if (
        !form.email.trim() ||
        !form.email.includes("@") ||
        !form.email.includes(".")
      ) {
        newErrors.email = "Please enter a valid email address.";
      }
      if (form.applicationType === "joint") {
        if (!form.partnerName.trim()) {
          newErrors.partnerName = "Please add your partner’s name.";
        }
        if (
          !form.partnerEmail.trim() ||
          !form.partnerEmail.includes("@") ||
          !form.partnerEmail.includes(".")
        ) {
          newErrors.partnerEmail = "Please enter your partner’s email.";
        }
      }
    }

    if (s === 2) {
      if (form.ownerOrInvestor.length === 0) {
        newErrors.ownerOrInvestor = "Pick at least one option.";
      }
      if (form.loanTypes.length === 0) {
        newErrors.loanTypes = "Pick at least one loan type.";
      }
      if (!form.propertyValue.trim()) {
        newErrors.propertyValue = "Add an approximate property value.";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    if (step < 2) setStep((s) => (s + 1) as Step);
  };

  const goBack = () => {
    if (step > 0) setStep((s) => (s - 1) as Step);
  };

  const handleSubmit = async () => {
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
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data && (data.error || data.message)) ||
            "Something went wrong submitting your details."
        );
      }

      window.location.href = `/refinance2-success?email=${encodeURIComponent(
        form.email.trim()
      )}`;
    } catch (err: any) {
      console.error("Refinance submit error", err);
      setSubmitError(err?.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const renderProgress = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs font-medium text-neutral-600 mb-2">
        <span>{step === 0 ? "Step 1 of 3" : step === 1 ? "Step 2 of 3" : "Step 3 of 3"}</span>
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
  const loanTypeOptions = ["Fixed", "Variable", "Split"];

  const lenderSuggestions =
    form.currentLender && lenderFocused
      ? LENDERS.filter((name) =>
          name.toLowerCase().startsWith(form.currentLender.toLowerCase())
        ).slice(0, 6)
      : [];

  const ctaLabel = getCtaLabel(form.goal);

  // Slider numbers
  const propertyNum = safeNumber(form.propertyValue, 850000);
  const balanceNum = safeNumber(form.balance, 520000);
  const repayNum = safeNumber(form.repayments, 2450);
  const yearsNum = safeNumber(form.yearsRemaining, 25);

  // Slider bubble styles
  const propertyBubbleStyle = getSliderBubbleStyle(
    propertyNum,
    PROPERTY_MIN,
    PROPERTY_MAX
  );
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

      <section className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 shadow-sm">
        {renderProgress()}

        {reassurance}

        <p className="text-sm sm:text-base text-neutral-700 mb-6">
          Most Aussies save $300–$600 a month when they refinance — but banks
          rarely call to tell you. Let&apos;s see if you&apos;re one of them.
        </p>

        {/* STEP 0 – goal */}
        {step === 0 && (
          <div>
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
                    onClick={() => updateField("goal", option)}
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
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-white hover:text-black border border-black transition-colors"
              >
                Start
              </button>
            </div>
          </div>
        )}

        {/* STEP 1 – basics + joint */}
        {step === 1 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Let&apos;s start with a few basics
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Preferred name *
                </label>
                <input
                  type="text"
                  value={form.preferredName}
                  onChange={(e) => updateField("preferredName", e.target.value)}
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
              <div>
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
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
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
                    type === "single"
                      ? "Just me"
                      : "Joint – with my partner";
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
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Partner&apos;s name *
                  </label>
                  <input
                    type="text"
                    value={form.partnerName}
                    onChange={(e) => updateField("partnerName", e.target.value)}
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
                <div>
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
                onClick={goNext}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-white hover:text-black border border-black transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 – loan details + sliders */}
        {step === 2 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              A few details about your loan
            </h2>

            <div className="mb-4">
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

            <div className="mb-4">
              <p className="text-sm font-medium mb-2">
                What type of loan do you currently have? *
              </p>
              <div className="flex flex-wrap gap-3">
                {loanTypeOptions.map((option) => {
                  const active = form.loanTypes.includes(option);
                  const errorState = !!errors.loanTypes;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleMulti("loanTypes", option)}
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
              {errors.loanTypes && (
                <p className="mt-1 text-xs text-red-600">{errors.loanTypes}</p>
              )}
            </div>

            {/* Lender with autosuggest */}
            <div className="mb-5 relative">
              <label className="block text-sm font-medium mb-1">
                Who are you currently with?{" "}
                <span className="text-neutral-400">(optional)</span>
              </label>
              <input
                type="text"
                value={form.currentLender}
                onFocus={() => setLenderFocused(true)}
                onBlur={() => {
                  setTimeout(() => setLenderFocused(false), 120);
                }}
                onChange={(e) => updateField("currentLender", e.target.value)}
                placeholder="e.g. CBA, Westpac, Macquarie"
                className="w-full rounded-full border border-neutral-300 px-4 py-2.5 text-sm sm:text-base outline-none focus:border-black"
              />
              {lenderSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-sm text-sm max-h-48 overflow-auto">
                  {lenderSuggestions.map((name) => (
                    <button
                      key={name}
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-neutral-50"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        updateField("currentLender", name);
                        setLenderFocused(false);
                      }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
              <p className="mt-1 text-xs text-neutral-500">
                This just helps us sense-check your current deal.
              </p>
            </div>

            {/* Sliders */}
            <div className="grid gap-5 mb-3">
              {/* Property value */}
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <label className="text-sm font-medium">
                    Rough property value *
                  </label>
                  <span className="text-sm font-semibold">
                    {formatCurrency(String(propertyNum)) || "—"}
                  </span>
                </div>
                <div className="slider-wrapper">
                  <div
                    className="slider-bubble"
                    style={propertyBubbleStyle}
                  >
                    {formatCurrency(String(propertyNum)) || "—"}
                  </div>
                  <input
                    type="range"
                    min={PROPERTY_MIN}
                    max={PROPERTY_MAX}
                    step={PROPERTY_STEP}
                    value={propertyNum}
                    onChange={handleSliderChange("propertyValue")}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                  <span>{formatCurrency(String(PROPERTY_MIN))}</span>
                  <span>{formatCurrency(String(PROPERTY_MAX))}+</span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  This helps estimate your equity in the property.
                </p>
                {errors.propertyValue && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.propertyValue}
                  </p>
                )}
              </div>

              {/* Amount owing */}
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <label className="text-sm font-medium">
                    Approx. amount owing *
                  </label>
                  <span className="text-sm font-semibold">
                    {formatCurrency(String(balanceNum)) || "—"}
                  </span>
                </div>
                <div className="slider-wrapper">
                  <div
                    className="slider-bubble"
                    style={balanceBubbleStyle}
                  >
                    {formatCurrency(String(balanceNum)) || "—"}
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
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                  <span>{formatCurrency(String(BALANCE_MIN))}</span>
                  <span>{formatCurrency(String(BALANCE_MAX))}+</span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  A ballpark is plenty — we&apos;ll refine this later.
                </p>
                {errors.balance && (
                  <p className="mt-1 text-xs text-red-600">{errors.balance}</p>
                )}
              </div>

              {/* Repayments */}
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <label className="text-sm font-medium">
                    Current monthly repayments *
                  </label>
                  <span className="text-sm font-semibold">
                    {formatCurrency(String(repayNum)) || "—"}
                  </span>
                </div>
                <div className="slider-wrapper">
                  <div
                    className="slider-bubble"
                    style={repayBubbleStyle}
                  >
                    {formatCurrency(String(repayNum)) || "—"}
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
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                  <span>{formatCurrency(String(REPAY_MIN))}</span>
                  <span>{formatCurrency(String(REPAY_MAX))}+</span>
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
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <label className="text-sm font-medium">
                    How many years are left on your loan term? *
                  </label>
                  <span className="text-sm font-semibold">{yearsNum} yrs</span>
                </div>
                <div className="slider-wrapper">
                  <div
                    className="slider-bubble"
                    style={yearsBubbleStyle}
                  >
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
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                  <span>{YEARS_MIN} yrs</span>
                  <span>{YEARS_MAX}+ yrs</span>
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
                    : "bg-black text-white border-black hover:bg-white hover:text-black"
                )}
              >
                {submitting ? "Sending..." : ctaLabel}
              </button>
            </div>

            <p className="mt-3 text-[11px] text-neutral-500 leading-snug">
              By continuing, you&apos;re happy for Sold Financial to contact you
              about your home loan. We&apos;ll never share your details without
              your permission.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
