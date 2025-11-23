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

      // Future-proof fields:
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
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const attributes: Record<string, any> = {
      FIRSTNAME: preferredName || "",
      CURRENTLENDER: currentLender || "",

      // Multi-choice MUST be arrays for Brevo to accept them
      OWNERORINVESTOR: Array.isArray(refinancingFor) ? refinancingFor : [],
      LOANTYPE: Array.isArray(loanType) ? loanType : [],

      CURRENTRATE: rate || "",
      CURRENTLOANBALANCE: balance || "",
      MONTHLYREPAYMENTS: repayments || "",
      YEARSREMAININGONLOAN: termRemaining || "",
      PROPERTYVALUE: propertyValue || "",

      // Flags — MUST be strings Brevo accepts
      FACT_FIND_COMPLETE: "Yes",
      DIGITAL_FACT_FIND_SENT: "Yes",

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

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
      },
      body: JSON.stringify({
        email,
        attributes,
        updateEnabled: true,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Brevo update error:", data);
      return NextResponse.json(
        { error: "Failed to update Brevo contact", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });

  } catch (err: any) {
    console.error("Route error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
