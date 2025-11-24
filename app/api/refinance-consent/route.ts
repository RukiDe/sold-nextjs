// app/api/refinance-consent/route.ts
import { NextResponse } from "next/server";

const REFI_LIST_ID = Number(process.env.BREVO_REFI_LIST_ID || "8");

export async function POST(req: Request) {
  try {
    const { preferredName, email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const attributes: Record<string, any> = {
      FIRSTNAME: preferredName || "",
      REFI_CONSENT_STARTED: "Yes", // optional debug flag
    };

    const payload: Record<string, any> = {
      email,
      attributes,
      updateEnabled: true,
    };

    // 👇 THIS is what makes the automation fire
    if (!Number.isNaN(REFI_LIST_ID) && REFI_LIST_ID > 0) {
      payload.listIds = [REFI_LIST_ID];
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Brevo consent update error:", data);
      return NextResponse.json(
        { error: "Failed to update Brevo contact", details: data },
        { status: 500 }
      );
    }

    console.log("Refi consent contact synced to Brevo:", { email, preferredName });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Consent route error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
