import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      preferredName,
      currentLender,
      refinancingFor,
      currentLoanTypes,
      howManyYearsLeft,
      currentRate,
      propertyValue,
      loanBalance,
      monthlyRepayments,
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Map form values → Brevo attributes  
    const attributes: Record<string, any> = {
      FIRSTNAME: preferredName || "",
      CURRENT_LENDER: currentLender || "",
      REFINANCING_FOR: refinancingFor?.join(", ") || "",
      CURRENT_LOAN_TYPES: currentLoanTypes?.join(", ") || "",
      YEARS_LEFT: howManyYearsLeft || "",
      CURRENT_RATE: currentRate || "",
      PROPERTY_VALUE: propertyValue || "",
      LOAN_BALANCE: loanBalance || "",
      MONTHLY_REPAYMENTS: monthlyRepayments || "",
      FACT_FIND_COMPLETE: false, // You can later flip this to true
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
        updateEnabled: true, // VERY IMPORTANT — updates existing contacts
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
