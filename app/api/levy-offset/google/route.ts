// app/api/investment/route.ts
import { NextResponse } from "next/server";

const INVESTOR_LIST_ID = process.env.BREVO_INVESTOR_LIST_ID
  ? Number(process.env.BREVO_INVESTOR_LIST_ID)
  : undefined;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      preferredName,
      isJoint,
      partnerName,
      partnerEmail,

      investorPlan,
      loanRange,
      loanType,
      ownershipStructure,
      mainInvestmentGoal,

      monthlyRentalIncome,
      combinedIncome,
      monthlyLivingExpenses,
      buyingTimeframe,
    } = body as {
      email?: string;
      preferredName?: string;
      isJoint?: "solo" | "joint";
      partnerName?: string;
      partnerEmail?: string;

      investorPlan?: string;
      loanRange?: string;
      loanType?: string;
      ownershipStructure?: string;
      mainInvestmentGoal?: string;

      monthlyRentalIncome?: string;
      combinedIncome?: string;
      monthlyLivingExpenses?: string;
      buyingTimeframe?: string;
    };

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.warn(
        "[/api/investment] BREVO_API_KEY missing – skipping Brevo call (common in local dev)"
      );
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "BREVO_API_KEY missing",
      });
    }

    // Convert monthly rental income -> annual number for GROSSANNUALRENTALINCOME
    let annualRentalIncome: number | undefined;
    if (typeof monthlyRentalIncome === "string" && monthlyRentalIncome.trim()) {
      const clean = monthlyRentalIncome.replace(/[^0-9.\-]/g, "");
      const monthly = Number(clean);
      if (!Number.isNaN(monthly) && Number.isFinite(monthly)) {
        annualRentalIncome = Math.round(monthly * 12);
      }
    }

    // ---------- PRIMARY APPLICANT ----------
    const primaryAttributes: Record<string, any> = {
      FIRSTNAME: preferredName || "",
      APPLICATION_TYPE: isJoint === "joint" ? "Joint" : "Single",
      OWNERORINVESTOR: "Investor",

      INVESTORPLAN: investorPlan || "",
      LOANRANGE: loanRange || "",
      LOANTYPE: loanType || "",
      OWNERSHIPSTRUCTURE: ownershipStructure || "",
      MAININVESTMENTGOAL: mainInvestmentGoal || "",

      COMBINEDANNUALINCOME: combinedIncome || "",
      MONTHLYLIVINGEXPENSES: monthlyLivingExpenses || "",
      BUYINGTIMEFRAME: buyingTimeframe || "",

      FACT_FIND_COMPLETE: true,
    };

    if (typeof annualRentalIncome === "number") {
      primaryAttributes.GROSSANNUALRENTALINCOME = annualRentalIncome;
    }

    const primaryPayload: any = {
      email,
      attributes: primaryAttributes,
      updateEnabled: true,
    };

    if (INVESTOR_LIST_ID) {
      primaryPayload.listIds = [INVESTOR_LIST_ID];
    }

    const primaryRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(primaryPayload),
    });

    const primaryData = await primaryRes.json();

    if (!primaryRes.ok) {
      console.error("[/api/investment] Brevo primary error:", primaryData);
      return NextResponse.json(
        {
          error: "Failed to upsert primary Brevo contact",
          details: primaryData,
        },
        { status: 500 }
      );
    }

    // ---------- CO-APPLICANT (optional) ----------
    let partnerResult: any = null;

    const hasPartnerEmail =
      isJoint === "joint" &&
      typeof partnerEmail === "string" &&
      partnerEmail.includes("@");

    if (hasPartnerEmail) {
      const partnerAttributes: Record<string, any> = {
        FIRSTNAME: partnerName || "",
        APPLICATION_TYPE: "Joint",
        OWNERORINVESTOR: "Investor",
        FACT_FIND_COMPLETE: true,
      };

      const partnerPayload: any = {
        email: partnerEmail,
        attributes: partnerAttributes,
        updateEnabled: true,
      };

      if (INVESTOR_LIST_ID) {
        partnerPayload.listIds = [INVESTOR_LIST_ID];
      }

      const partnerRes = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(partnerPayload),
      });

      const partnerData = await partnerRes.json();
      partnerResult = partnerData;

      if (!partnerRes.ok) {
        console.error(
          "[/api/investment] Brevo partner error:",
          partnerData
        );
        // Don’t hard-fail the whole request; you still have the main applicant.
      }
    }

    return NextResponse.json({
      success: true,
      primary: primaryData,
      partner: partnerResult,
    });
  } catch (err: any) {
    console.error("[/api/investment] Server error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
