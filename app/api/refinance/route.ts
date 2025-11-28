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

      // Future-proof fields for later flows (safe if missing)
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

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Build Brevo attributes
    const attributes: Record<string, any> = {
      FIRSTNAME: preferredName || "",
      CURRENTLENDER: currentLender || "",

      // Multi-choice fields need to be arrays
      OWNERORINVESTOR: Array.isArray(refinancingFor) ? refinancingFor : [],
      LOANTYPE: Array.isArray(loanType) ? loanType : [],

      CURRENTRATE: rate || "",
      CURRENTLOANBALANCE: balance || "",
      MONTHLYREPAYMENTS: repayments || "",
      YEARSREMAININGONLOAN: termRemaining || "",
      PROPERTYVALUE: propertyValue || "",

      // Fact-find flags
      FACT_FIND_COMPLETE: true,          // boolean in Brevo
      DIGITAL_FACT_FIND_SENT: false,     // for your other flows

      // Future-proof extras (OK if undefined)
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
    const listIdRaw = process.env.BREVO_REFI_LIST_ID;
    const listId = listIdRaw ? Number(listIdRaw) : undefined;

    if (!apiKey) {
      console.warn(
        "[/api/refinance] BREVO_API_KEY missing – skipping Brevo call (local dev?)"
      );
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "BREVO_API_KEY missing",
      });
    }

    const payload: any = {
      email,
      attributes,
      updateEnabled: true,
    };

    if (listId && !Number.isNaN(listId)) {
      payload.listIds = [listId];
    } else {
      console.warn(
        "[/api/refinance] BREVO_REFI_LIST_ID missing or invalid – contact will NOT be added to list"
      );
    }

    // Uncomment while debugging to see exactly what we send:
    // console.log("Brevo /contacts payload:", JSON.stringify(payload, null, 2));

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Brevo /contacts error:", data);
      return NextResponse.json(
        {
          error: "Failed to upsert Brevo contact",
          details: data,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("/api/refinance route error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
