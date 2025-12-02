// app/api/first-home-buyer/route.ts
import { NextResponse } from "next/server";

const FHB_LIST_ID = process.env.BREVO_FHB_LIST_ID
  ? Number(process.env.BREVO_FHB_LIST_ID)
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
      depositSaved,
      combinedIncome,

      // NEW fields from the FHB fact-find page
      fhbSchemeEligibility,
      incomeSource,
      existingDebts,
      loanRange,
      buyingTimeframe,
      preferredSuburb,
    } = body as {
      email?: string;
      preferredName?: string;
      isJoint?: "solo" | "joint";
      partnerName?: string;
      partnerEmail?: string;
      depositSaved?: string;
      combinedIncome?: string;

      fhbSchemeEligibility?: string;
      incomeSource?: string;
      existingDebts?: string[]; // multi-select
      loanRange?: string;
      buyingTimeframe?: string;
      preferredSuburb?: string;
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
        "[/api/first-home-buyer] BREVO_API_KEY missing – skipping Brevo call (common in local dev)"
      );
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "BREVO_API_KEY missing",
      });
    }

    // ---------- PRIMARY APPLICANT ----------
    const primaryAttributes: Record<string, any> = {
      FIRSTNAME: preferredName || "",
      APPLICATION_TYPE: isJoint === "joint" ? "Joint" : "Single",

      // FHB-specific relationship fields
      PARTNER_NAME: partnerName || "",
      PARTNER_EMAIL: partnerEmail || "",

      // Money + income
      DEPOSITSAVED: depositSaved || "",
      COMBINEDANNUALINCOME: combinedIncome || "",

      // NEW: match Brevo custom attributes you set up
      ELIGIBLEFIRSTHOMESCHEME: fhbSchemeEligibility || "",
      EMPLOYMENTTYPE: incomeSource || "",
      EXISTINGDEBTS: Array.isArray(existingDebts)
        ? existingDebts.join(", ")
        : existingDebts || "",
      LOANRANGE: loanRange || "",
      BUYINGTIMEFRAME: buyingTimeframe || "",
      PREFERREDSUBURBS: preferredSuburb || "",

      FACT_FIND_COMPLETE: true, // same pattern as refinance
    };

    const primaryPayload: any = {
      email,
      attributes: primaryAttributes,
      updateEnabled: true,
    };

    if (FHB_LIST_ID) {
      primaryPayload.listIds = [FHB_LIST_ID];
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
      console.error("[/api/first-home-buyer] Brevo primary error:", primaryData);
      return NextResponse.json(
        { error: "Failed to upsert primary Brevo contact", details: primaryData },
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
        FHB_PRIMARY_APPLICANT_EMAIL: email,
        FACT_FIND_COMPLETE: true,
      };

      const partnerPayload: any = {
        email: partnerEmail,
        attributes: partnerAttributes,
        updateEnabled: true,
      };

      if (FHB_LIST_ID) {
        partnerPayload.listIds = [FHB_LIST_ID];
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
          "[/api/first-home-buyer] Brevo partner error:",
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
    console.error("[/api/first-home-buyer] Server error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
