// app/api/refinance/route.ts
import { NextResponse } from "next/server";

const REFI_LIST_ID = process.env.BREVO_REFI_LIST_ID
  ? Number(process.env.BREVO_REFI_LIST_ID)
  : undefined;

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
    } = body as {
      email?: string;
      preferredName?: string;
      currentLender?: string;
      refinancingFor?: string[];
      loanType?: string[];
      rate?: string;
      balance?: string;
      repayments?: string;
      termRemaining?: string;
      propertyValue?: string;
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
        "[/api/refinance] BREVO_API_KEY missing – skipping Brevo call (common in local dev)"
      );
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "BREVO_API_KEY missing",
      });
    }

    const attributes: Record<string, any> = {
      FIRSTNAME: preferredName || "",
      CURRENTLENDER: currentLender || "",
      OWNERORINVESTOR: Array.isArray(refinancingFor) ? refinancingFor : [],
      LOANTYPE: Array.isArray(loanType) ? loanType : [],
      CURRENTRATE: rate || "",
      CURRENTLOANBALANCE: balance || "",
      MONTHLYREPAYMENTS: repayments || "",
      YEARSREMAININGONLOAN: termRemaining || "",
      PROPERTYVALUE: propertyValue || "",
      // 🔑 key flag Brevo automation will watch
      FACT_FIND_COMPLETE: true, // Boolean attribute in Brevo
    };

    const payload: any = {
      email,
      attributes,
      updateEnabled: true,
    };

    if (REFI_LIST_ID) {
      payload.listIds = [REFI_LIST_ID];
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[/api/refinance] Brevo error:", data);
      return NextResponse.json(
        { error: "Failed to upsert Brevo contact", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("[/api/refinance] Server error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
