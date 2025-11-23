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
      // keep future-proofed fields here as you add them:
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

    // Helper to normalise multi-selects → comma-separated strings
    const toMultiString = (value: unknown): string => {
      if (Array.isArray(value)) return value.join(", ");
      if (typeof value === "string") return value;
      return "";
    };

    const attributes: Record<string, any> = {
      // Core refinance fields
      FIRSTNAME: preferredName || "",
      CURRENTLENDER: currentLender || "",
      OWNERORINVESTOR: toMultiString(refinancingFor),
      LOANTYPE: toMultiString(loanType),
      CURRENTRATE: rate || "",
      CURRENTLOANBALANCE: balance || "",
      MONTHLYREPAYMENTS: repayments || "",
      YEARSREMAININGONLOAN: termRemaining || "",
      PROPERTYVALUE: propertyValue || "",

      // Flags – use "Yes" to match how REFI_CONSENT_SIGNED is stored
      FACT_FIND_COMPLETE: "Yes",
      DIGITAL_FACT_FIND_SENT: "Yes",

      // Future-proofed refinance attributes
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
        updateEnabled: true, // update existing contact rather than erroring
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
