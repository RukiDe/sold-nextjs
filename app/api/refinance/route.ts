// app/api/refinance/route.ts
import { NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const REFI_LIST_ID = process.env.BREVO_REFI_LIST_ID
  ? Number(process.env.BREVO_REFI_LIST_ID)
  : undefined;

// 🔧 Shared Brevo upsert helper
async function upsertBrevoContact(payload: any) {
  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

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
      refinancingFor,
      loanType,
      rate,
      balance,
      repayments,
      termRemaining,
      propertyValue,

      // NEW FROM FRONTEND
      applicationType, // "single" | "joint"
      partnerName,
      partnerEmail,
    } = body;

    // --- VALIDATION ---
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!BREVO_API_KEY) {
      console.warn(
        "[/api/refinance] BREVO_API_KEY missing – skipping Brevo call"
      );
      return NextResponse.json({
        success: true,
        skipped: true,
      });
    }

    const isJoint = applicationType === "joint";

    //
    // ----------------------------------------------------
    // PRIMARY APPLICANT PAYLOAD
    // ----------------------------------------------------
    //
    const primaryAttributes: Record<string, any> = {
      // 📌 Your existing attributes (DO NOT CHANGE)
      FIRSTNAME: preferredName || "",
      CURRENTLENDER: currentLender || "",
      OWNERORINVESTOR: Array.isArray(refinancingFor) ? refinancingFor : [],
      LOANTYPE: Array.isArray(loanType) ? loanType : [],
      CURRENTRATE: rate || "",
      CURRENTLOANBALANCE: balance || "",
      MONTHLYREPAYMENTS: repayments || "",
      YEARSREMAININGONLOAN: termRemaining || "",
      PROPERTYVALUE: propertyValue || "",
      FACT_FIND_COMPLETE: true,

      // 📌 NEW ATTRIBUTES FOR JOINT LOGIC
      APPLICATION_TYPE: isJoint ? "Joint" : "Single",
      APPLICANT_ROLE: "primary",
      PARTNER_EMAIL: isJoint ? partnerEmail : null,
      DIGITAL_FACT_FIND_SENT: false,
    };

    const primaryPayload: any = {
      email,
      attributes: primaryAttributes,
      updateEnabled: true,
    };

    if (REFI_LIST_ID) primaryPayload.listIds = [REFI_LIST_ID];

    await upsertBrevoContact(primaryPayload);

    //
    // ----------------------------------------------------
    // CO-APPLICANT (ONLY IF JOINT)
    // ----------------------------------------------------
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

      if (REFI_LIST_ID) coPayload.listIds = [REFI_LIST_ID];

      await upsertBrevoContact(coPayload);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[/api/refinance] Server error:", err);
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}
