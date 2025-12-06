// app/api/refinance-preview/route.ts
import { NextResponse } from "next/server";
import {
  getRefinanceFactFindByEmail,
  updateRefinanceOptionLenders,
} from "@/lib/airtable";
import { pickLenderOptions } from "@/lib/lenderRates";

function monthlyRepayment(
  balance: number,
  annualRatePercent: number,
  yearsRemaining: number
): number {
  const n = Math.max(1, Math.round(yearsRemaining * 12));
  const r = annualRatePercent > 0 ? annualRatePercent / 100 / 12 : 0;

  if (r === 0) {
    return balance / n;
  }

  const pow = Math.pow(1 + r, n);
  const payment = (balance * r * pow) / (pow - 1);
  return payment;
}

function interestOverMonths(
  balance: number,
  annualRatePercent: number,
  yearsRemaining: number,
  months: number
): number {
  const r = annualRatePercent / 100 / 12;
  const payment = monthlyRepayment(balance, annualRatePercent, yearsRemaining);

  let outstanding = balance;
  let interestPaid = 0;

  for (let i = 0; i < months && outstanding > 0.01; i++) {
    const interest = outstanding * r;
    interestPaid += interest;
    const principal = payment - interest;
    outstanding = Math.max(outstanding - principal, 0);
  }

  return interestPaid;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = (body.email || "").toString().trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    const factFind = await getRefinanceFactFindByEmail(email);

    if (!factFind) {
      return NextResponse.json(
        { error: "Fact find not found for this email" },
        { status: 404 }
      );
    }

    const {
      recordId,
      currentLoanBalance,
      currentInterestRatePercent,
      remainingTermYears,
      propertyValue,
      ownerOrInvestor,
      currentMonthlyFromForm,
    } = factFind;

    if (!currentLoanBalance || currentLoanBalance <= 0) {
      return NextResponse.json(
        { error: "Missing or invalid loan balance" },
        { status: 400 }
      );
    }

    const effectiveCurrentRate =
      currentInterestRatePercent && currentInterestRatePercent > 0
        ? currentInterestRatePercent
        : ownerOrInvestor === "INV"
        ? 6.6
        : 6.3;

    const yearsRemaining =
      remainingTermYears && remainingTermYears > 0 ? remainingTermYears : 25;

    const currentMonthlyRaw = currentMonthlyFromForm
      ? Number(currentMonthlyFromForm)
      : monthlyRepayment(currentLoanBalance, effectiveCurrentRate, yearsRemaining);

    const currentMonthly = Math.round(currentMonthlyRaw);

    const lvr =
      propertyValue && propertyValue > 0
        ? (currentLoanBalance / propertyValue) * 100
        : null;

    const { optionA, optionB, optionC } = pickLenderOptions({
      ownerOrInvestor: ownerOrInvestor || undefined,
      lvr,
    });

    const optionsInternal = [optionA, optionB, optionC].map((opt) => {
      const newMonthlyRaw = monthlyRepayment(
        currentLoanBalance,
        opt.indicativeRate,
        yearsRemaining
      );
      const newMonthly = Math.round(newMonthlyRaw);

      const monthlySaving = Math.max(currentMonthly - newMonthly, 0);

      const currentInterest5 = interestOverMonths(
        currentLoanBalance,
        effectiveCurrentRate,
        yearsRemaining,
        60
      );
      const newInterest5 = interestOverMonths(
        currentLoanBalance,
        opt.indicativeRate,
        yearsRemaining,
        60
      );
      const interestSaved5 = Math.max(currentInterest5 - newInterest5, 0);

      return {
        key: opt.key,
        indicativeRate: opt.indicativeRate,
        newMonthly,
        monthlySaving,
        interestSaved5,
        lenderName: opt.lenderName,
      };
    });

    const maxMonthlySaving = Math.max(
      ...optionsInternal.map((o) => o.monthlySaving)
    );

    // If there's genuinely no saving, we still return options,
    // but flag it so the UI can switch to the "good wicket" message.
    const isOnGoodWicket = maxMonthlySaving <= 0;

    // Store which lenders were shown (for you in Airtable)
    await updateRefinanceOptionLenders({
      recordId,
      optionALenderName: optionsInternal[0].lenderName,
      optionBLenderName: optionsInternal[1].lenderName,
      optionCLenderName: optionsInternal[2].lenderName,
    });

    return NextResponse.json({
      success: true,
      currentMonthly,
      ownerOrInvestor: ownerOrInvestor || null,
      lvr,
      isOnGoodWicket,
      options: optionsInternal.map((opt) => ({
        key: opt.key,
        indicativeRate: opt.indicativeRate,
        newMonthly: opt.newMonthly,
        monthlySaving: opt.monthlySaving,
        interestSaved5: opt.interestSaved5,
      })),
    });
  } catch (err: any) {
    console.error("[/api/refinance-preview] Error", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
