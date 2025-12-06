// app/api/refinance/route.ts
import { NextResponse } from "next/server";
import { createRefinanceFactFindRecord } from "@/lib/airtable";

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

    // ----------------------------------------------------
    // Persist fact find to Airtable as system of record
    // ----------------------------------------------------
    if (email && balance) {
      const currentLoanBalance = Number(balance) || 0;
      const currentInterestRatePercent = Number(rate) || 0;
      const remainingTermYears = Number(termRemaining) || 30;
      const numericPropertyValue =
        propertyValue !== undefined && propertyValue !== null
          ? Number(propertyValue)
          : null;

      // derive OO / INV from refinancingFor
      let ownerOrInvestor: "OO" | "INV" | null = null;
      if (Array.isArray(refinancingFor)) {
        if (
          refinancingFor.some((v: any) =>
            String(v).toLowerCase().includes("invest")
          )
        ) {
          ownerOrInvestor = "INV";
        } else if (
          refinancingFor.some((v: any) =>
            String(v).toLowerCase().includes("owner")
          )
        ) {
          ownerOrInvestor = "OO";
        }
      }

      // derive P&I / IO from loanType
      let loanTypeSingle: "P&I" | "IO" | null = null;
      if (Array.isArray(loanType)) {
        if (
          loanType.some((v: any) =>
            String(v).toLowerCase().includes("interest only")
          )
        ) {
          loanTypeSingle = "IO";
        } else if (
          loanType.some((v: any) =>
            String(v).toLowerCase().includes("principal")
          )
        ) {
          loanTypeSingle = "P&I";
        }
      }

      const numericRepayments = repayments
        ? Number(String(repayments).replace(/[^\d.]/g, ""))
        : null;

      // fire-and-forget; Airtable errors shouldn't break user flow
      void createRefinanceFactFindRecord({
        email: String(email).trim().toLowerCase(),
        preferredName: preferredName || "",
        goal: "", // if you later capture "goal" on the form, pass it through here
        currentLoanBalance,
        currentMonthlyRepayments: numericRepayments,
        currentInterestRatePercent,
        remainingTermYears,
        propertyValue: numericPropertyValue,
        ownerOrInvestor,
        loanType: loanTypeSingle,
        currentLender,
        source: "refinance2-form",
      });
    }

    // If Brevo isn't configured, still treat as success (Airtable has the data)
    if (!BREVO_API_KEY) {
      console.warn(
        "[/api/refinance] BREVO_API_KEY missing – skipping Brevo call"
      );
      return NextResponse.json({
        success: true,
        skippedBrevo: true,
      });
    }

    const isJoint = applicationType === "joint";

    //
    // ----------------------------------------------------
    // PRIMARY APPLICANT PAYLOAD (Brevo)
    // ----------------------------------------------------
    //
    const primaryAttributes: Record<string, any> = {
      // 📌 Existing attributes
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

      // 📌 Joint logic
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
