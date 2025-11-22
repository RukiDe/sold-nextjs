import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // These names MUST match what the form sends
    const {
      email,
      preferredName,
      currentLender,
      refinancingFor, // string[]
      loanType,       // string[]
      termRemaining,
      rate,
      propertyValue,
      balance,
      repayments,
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Map form values → Brevo attributes
    const attributes: Record<string, any> = {
      // Make sure these names match your Brevo contact attributes exactly
      FIRSTNAME: preferredName || "",
      CURRENTLENDER: currentLender || "",
      OWNERORINVESTOR: refinancingFor?.join(", ") || "",
      LOANTYPE: loanType?.join(", ") || "",
      YEARSREMAININGONLOAN: termRemaining || "",
      CURRENTRATE: rate || "",
      PROPERTYVALUE: propertyValue || "",
      CURRENTLOANBALANCE: balance || "",
      MONTHLYREPAYMENTS: repayments || "",
      FACT_FIND_COMPLETE: true, // or "Yes" if you set it up as text
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
