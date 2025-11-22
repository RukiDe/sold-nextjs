import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      currentLender,
      refinancingFor,
      loanType,
      rate,
      balance,
      repayments,
      termRemaining,
      propertyValue,
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Map form values → Brevo attributes
    const attributes: Record<string, any> = {
      // Make sure these attribute names exist in Brevo exactly as written
      CURRENTLENDER: currentLender || "",
      OWNERORINVESTOR: Array.isArray(refinancingFor)
        ? refinancingFor.join(", ")
        : refinancingFor || "",
      LOANTYPE: Array.isArray(loanType) ? loanType.join(", ") : loanType || "",
      CURRENTRATE: rate || "",
      CURRENTLOANBALANCE: balance || "",
      MONTHLYREPAYMENTS: repayments || "",
      YEARSREMAININGONLOAN: termRemaining || "",
      PROPERTYVALUE: propertyValue || "",
      FACT_FIND_COMPLETE: true, // or "Yes" if your Brevo attribute is text
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
        updateEnabled: true, // updates existing contact
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
