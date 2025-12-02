import { NextResponse } from "next/server";

const OWNER_OCC_LIST_ID = process.env.BREVO_OWNER_OCC_LIST_ID
  ? Number(process.env.BREVO_OWNER_OCC_LIST_ID)
  : undefined;

type BodyShape = {
  email?: string;
  preferredName?: string;
  isJoint?: "solo" | "joint";
  partnerName?: string;
  partnerEmail?: string;

  reasonsForMoving?: string[];
  loanTypes?: string[];
  buyingTimeframe?: string;
  currentLoanBalance?: string;
  targetPropertyValue?: string;
  depositSaved?: string;
  loanRange?: string;
  planForCurrentProperty?: string;
  employmentTypes?: string[];
  combinedIncomeBand?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BodyShape;

    const {
      email,
      preferredName,
      isJoint = "solo",
      partnerName,
      partnerEmail,
      reasonsForMoving = [],
      loanTypes = [],
      buyingTimeframe = "",
      currentLoanBalance = "",
      targetPropertyValue = "",
      depositSaved = "",
      loanRange = "",
      planForCurrentProperty = "",
      employmentTypes = [],
      combinedIncomeBand = "",
    } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.warn(
        "[/api/owner-occupier] BREVO_API_KEY missing – skipping Brevo call"
      );
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "BREVO_API_KEY missing",
      });
    }

    // Helper to coerce numeric strings
    const toNumberOrUndefined = (val: string) => {
      if (!val) return undefined;
      const cleaned = val.replace(/[^0-9.-]/g, "");
      const n = Number(cleaned);
      return Number.isFinite(n) ? n : undefined;
    };

    // ---------- PRIMARY APPLICANT ----------
    const primaryAttributes: Record<string, any> = {
      FIRSTNAME: preferredName || "",
      APPLICATION_TYPE: isJoint === "joint" ? "Joint" : "Single",

      OWNERORINVESTOR: "Owner occupier",

      REASONFORMOVING: reasonsForMoving.join(", "),
      LOANTYPE: loanTypes.join(", "),
      BUYINGTIMEFRAME: buyingTimeframe || "",
      LOANRANGE: loanRange || "",
      PLANFORCURRENTPROPERTY: planForCurrentProperty || "",
      EMPLOYMENTTYPE: employmentTypes.join(", "),
      COMBINEDANNUALINCOME: combinedIncomeBand || "",

      CURRENTLOANBALANCE: toNumberOrUndefined(currentLoanBalance),
      PROPERTYVALUE: toNumberOrUndefined(targetPropertyValue),
      DEPOSITSAVED: toNumberOrUndefined(depositSaved),

      FACT_FIND_COMPLETE: true,
    };

    const primaryPayload: any = {
      email,
      attributes: primaryAttributes,
      updateEnabled: true,
    };

    if (OWNER_OCC_LIST_ID) {
      primaryPayload.listIds = [OWNER_OCC_LIST_ID];
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
      console.error(
        "[/api/owner-occupier] Brevo primary error:",
        primaryData
      );
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
        OWNERORINVESTOR: "Owner occupier",
        // reuse same pattern as FHB so you can link them if you want
        FHB_PRIMARY_APPLICANT_EMAIL: email,
        FACT_FIND_COMPLETE: true,
      };

      const partnerPayload: any = {
        email: partnerEmail,
        attributes: partnerAttributes,
        updateEnabled: true,
      };

      if (OWNER_OCC_LIST_ID) {
        partnerPayload.listIds = [OWNER_OCC_LIST_ID];
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
          "[/api/owner-occupier] Brevo partner error:",
          partnerData
        );
        // don’t hard-fail; main applicant is still saved
      }
    }

    return NextResponse.json({
      success: true,
      primary: primaryData,
      partner: partnerResult,
    });
  } catch (err: any) {
    console.error("[/api/owner-occupier] Server error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
