// app/api/refinance/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      preferredName,
      currentLender,
      refinancingFor,
      loanType,
      rate,
      balance,
      repayments,
      termRemaining,
      propertyValue,

      // Future-proof fields (some may be undefined today)
      buyingTimeframe,
      combinedAnnualIncome,
      desiredLoanFeature,
      eligibleFirstHomeScheme,
      employmentType,
      existingDebts,
      investorPlan,
      loanRange,
      mainInvestmentGoal,
      monthlyLivingExpenses,
      numberOfPropertiesOwned,
      ownershipStructure,
      planForCurrentProperty,
      purposeOfRefinance,
      reasonForMoving,
    } = body as Record<string, any>;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const attributes: Record<string, any> = {
      FIRSTNAME: preferredName || "",
      CURRENTLENDER: currentLender || "",

      // Multi-choice fields must be arrays for Brevo
      OWNERORINVESTOR: Array.isArray(refinancingFor) ? refinancingFor : [],
      LOANTYPE: Array.isArray(loanType) ? loanType : [],

      CURRENTRATE: rate || "",
      CURRENTLOANBALANCE: balance || "",
      MONTHLYREPAYMENTS: repayments || "",
      YEARSREMAININGONLOAN: termRemaining || "",
      PROPERTYVALUE: propertyValue || "",

      // ✅ Boolean flags in Brevo
      FACT_FIND_COMPLETE: true,
      DIGITAL_FACT_FIND_SENT: true,

      // Future-proof extras (mostly strings)
      BUYINGTIMEFRAME: buyingTimeframe || "",
      COMBINEDANNUALINCOME: combinedAnnualIncome || "",
      DESIREDLOANFEATURE: desiredLoanFeature || "",
      ELIGIBLEFIRSTHOMESCHEME: eligibleFirstHomeScheme || "",
      EMPLOYMENTTYPE: employmentType || "",
      EXISTINGDEBTS: existingDebts || "",
      INVESTORPLAN: investorPlan || "",
      LOANRANGE: loanRange || "",
      MAININVESTMENTGOAL: mainInvestmentGoal || "",
      MONTHLYLIVINGEXPENSES: monthlyLivingExpenses || "",
      NUMBEROFPROPERTIESOWNED: numberOfPropertiesOwned || "",
      OWNERSHIPSTRUCTURE: ownershipStructure || "",
      PLANFORCURRENTPROPERTY: planForCurrentProperty || "",
      PURPOSEOFREFINANCE: purposeOfRefinance || "",
      REASONFORMOVING: reasonForMoving || "",
    };

    const apiKey = process.env.BREVO_API_KEY;

    // Nice behaviour in local dev if the key is missing
    if (!apiKey) {
      console.warn(
        "[/api/refinance] BREVO_API_KEY is missing – skipping Brevo call."
      );

      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "BREVO_API_KEY missing – Brevo not called",
      });
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        attributes,
        updateEnabled: true,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Brevo /api/refinance error:", data);
      return NextResponse.json(
        { error: "Failed to update Brevo contact", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Refinance route error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
