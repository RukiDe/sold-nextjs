import { NextResponse } from "next/server";

/**
 * All Brevo contact attribute keys you shared.
 * We’ll use this type so we can’t accidentally mistype a key.
 */
type BrevoAttributeKey =
  | "FIRSTNAME"
  | "SMS"
  | "EXT_ID"
  | "LANDLINE_NUMBER"
  | "CONTACT_TIMEZONE"
  | "JOB_TITLE"
  | "LINKEDIN"
  | "DOUBLE_OPT-IN"
  | "OPT_IN"
  | "NUMBEROFDEPENDENTS"
  | "CURRENTLENDER"
  | "CURRENTLOANBALANCE"
  | "PROPERTYVALUE"
  | "CURRENTRATE"
  | "MONTHLYREPAYMENTS"
  | "YEARSREMAININGONLOAN"
  | "MISSEDANYREPAYMENTSLAST6MONTHS"
  | "DEPOSITSAVED"
  | "PREFERREDSUBURBS"
  | "CURRENTLYOWNAPROPERTY"
  | "ESTIMATEDEQUITY"
  | "PORTFOLIOVALUE"
  | "TOTALLOANSOUTSTANDING"
  | "GROSSANNUALRENTALINCOME"
  | "TARGETYIELDRETURN"
  | "UTMSOURCE"
  | "UTMMEDIUM"
  | "UTMCAMPAIGN"
  | "UTMTERM"
  | "UTMCONTENT"
  | "GOOGLECLICKID"
  | "PAGEURL"
  | "REFI_CONSENT_SIGNED"
  | "DIGITAL_FACT_FIND_SENT"
  | "FACT_FIND_COMPLETE"
  | "BUYINGTIMEFRAME"
  | "COMBINEDANNUALINCOME"
  | "DESIREDLOANFEATURE"
  | "ELIGIBLEFIRSTHOMESCHEME"
  | "EMPLOYMENTTYPE"
  | "EXISTINGDEBTS"
  | "INVESTORPLAN"
  | "LOANRANGE"
  | "LOANTYPE"
  | "MAININVESTMENTGOAL"
  | "MONTHLYLIVINGEXPENSES"
  | "NUMBEROFPROPERTIESOWNED"
  | "OWNERORINVESTOR"
  | "OWNERSHIPSTRUCTURE"
  | "PLANFORCURRENTPROPERTY"
  | "PURPOSEOFREFINANCE"
  | "REASONFORMOVING";

/**
 * POST /api/refinance
 * Called from app/refinance/page.tsx
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      preferredName,
      currentLender,
      refinancingFor, // string[]
      loanType,       // string[]
      rate,
      balance,
      repayments,
      termRemaining,
      propertyValue,
      // future-you: you can pull UTMs etc from body here too
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Build attributes object – only set what we actually have.
    const attributes: Partial<Record<BrevoAttributeKey, any>> = {
      // We *can* send FIRSTNAME, but you already collected it on the consent step
      // so it’s optional here. Uncomment if you decide to send it again:
      // FIRSTNAME: preferredName || "",

      CURRENTLENDER: currentLender || "",
      OWNERORINVESTOR: (refinancingFor || []).join(", "), // supports multi-select
      LOANTYPE: (loanType || []).join(", "),
      CURRENTRATE: rate || "",
      CURRENTLOANBALANCE: balance || "",
      MONTHLYREPAYMENTS: repayments || "",
      YEARSREMAININGONLOAN: termRemaining || "",
      PROPERTYVALUE: propertyValue || "",

      // This is your “they finished the digital fact find” flag
      FACT_FIND_COMPLETE: true,
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
        updateEnabled: true, // critical: updates existing contacts
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
    console.error("Refinance API error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
