// app/api/refinance/route.ts
import { NextResponse } from "next/server";
import { createRefinanceFactFindRecord } from "@/lib/airtable";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const REFI_LIST_ID = process.env.BREVO_REFI_LIST_ID
  ? Number(process.env.BREVO_REFI_LIST_ID)
  : undefined;

// 🔧 Shared Brevo upsert helper
async function upsertBrevoContact(payload: any) {
  if (!BREVO_API_KEY) {
    console.warn(
      "[/api/refinance] BREVO_API_KEY missing – skipping Brevo contact upsert"
    );
    return { ok: false, data: null };
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("[/api/refinance] Brevo upsert error:", data);
  }

  return { ok: res.ok, data };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      preferredName,
      currentLender,
      refinancingFor, // OO / INV buttons
      loanType,       // "Fixed" | "Variable" | "Split"
      rate,
      balance,
      repayments,
      termRemaining,
      propertyValue,

      // step 0 goal
      goal, // e.g. "Lower my repayments", "Pay the loan off sooner", etc.

      // joint vs single
      applicationType, // "single" | "joint"
      partnerName,
      partnerEmail,
    } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const isJoint = applicationType === "joint";

    /* ---------------------------------------------------------------------- */
    /*                            AIRTABLE WRITE                               */
    /* ---------------------------------------------------------------------- */

    // Fire-and-forget: Airtable errors shouldn’t block the user
    void createRefinanceFactFindRecord({
      email: String(email).trim().toLowerCase(),
      preferredName: preferredName || null,
      goal: goal || null,

      currentLoanBalance: balance,
      currentMonthlyRepayments: repayments,
      currentInterestRatePercent: rate,
      remainingTermYears: termRemaining,
      propertyValue,

      ownerOrInvestor: refinancingFor, // "Owner Occupier" / "Investment Property"
      loanTypes: loanType,             // "Fixed" | "Variable" | "Split"

      currentLender,
      source: "refinance2-form",

      applicationType,
      partnerName,
      partnerEmail,
    });

    /* ---------------------------------------------------------------------- */
    /*                             BREVO CONTACTS                              */
    /* ---------------------------------------------------------------------- */

    if (!BREVO_API_KEY) {
      // We still consider the request a success; we just didn’t touch Brevo
      return NextResponse.json({
        success: true,
        skippedBrevo: true,
      });
    }

    //
    // PRIMARY APPLICANT
    //
    const primaryAttributes: Record<string, any> = {
      FIRSTNAME: preferredName || "",
      CURRENTLENDER: currentLender || "",
      OWNERORINVESTOR: Array.isArray(refinancingFor)
        ? refinancingFor
        : refinancingFor
        ? [refinancingFor]
        : [],
      LOANTYPE: Array.isArray(loanType)
        ? loanType
        : loanType
        ? [loanType]
        : [],
      CURRENTRATE: rate || "",
      CURRENTLOANBALANCE: balance || "",
      MONTHLYREPAYMENTS: repayments || "",
      YEARSREMAININGONLOAN: termRemaining || "",
      PROPERTYVALUE: propertyValue || "",
      FACT_FIND_COMPLETE: true,

      APPLICATION_TYPE: isJoint ? "Joint" : "Single",
      APPLICANT_ROLE: "primary",
      PARTNER_EMAIL: isJoint ? partnerEmail : null,
      DIGITAL_FACT_FIND_SENT: false,
      GOAL: goal || "",
    };

    const primaryPayload: any = {
      email,
      attributes: primaryAttributes,
      updateEnabled: true,
    };

    if (REFI_LIST_ID) {
      primaryPayload.listIds = [REFI_LIST_ID];
    }

    await upsertBrevoContact(primaryPayload);

    //
    // CO-APPLICANT (only if joint)
    //
    if (isJoint && partnerEmail) {
      const coAttributes: Record<string, any> = {
        FIRSTNAME: partnerName || "",
        FACT_FIND_COMPLETE: true,

        APPLICATION_TYPE: "Joint",
        APPLICANT_ROLE: "co",
        PARTNER_EMAIL: email,
        DIGITAL_FACT_FIND_SENT: false,
      };

      const coPayload: any = {
        email: partnerEmail,
        attributes: coAttributes,
        updateEnabled: true,
      };

      if (REFI_LIST_ID) {
        coPayload.listIds = [REFI_LIST_ID];
      }

      await upsertBrevoContact(coPayload);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[/api/refinance] Server error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
