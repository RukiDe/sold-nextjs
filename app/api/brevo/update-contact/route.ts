// app/api/brevo/update-contact/route.ts
import { NextResponse } from "next/server";

function toBoolean(v: any): boolean {
  return (
    v === true ||
    v === "true" ||
    v === "True" ||
    v === "TRUE" ||
    v === "YES" ||
    v === "Yes" ||
    v === "yes" ||
    v === 1
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body?.email as string | undefined;
    const rawAttributes = (body?.attributes || {}) as Record<string, any>;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Clone so we can safely mutate
    const attributes: Record<string, any> = { ...rawAttributes };

    // Coerce known boolean attributes so Brevo doesn't choke
    const booleanKeys = [
      "DIGITAL_FACT_FIND_SENT",
      "FACT_FIND_COMPLETE",
      "REFI_CONSENT_SIGNED",
      "OPEN_BANKING_CONNECTED",
    ];

    for (const key of booleanKeys) {
      if (attributes[key] !== undefined) {
        attributes[key] = toBoolean(attributes[key]);
      }
    }

    const apiKey = process.env.BREVO_API_KEY;

    // DX nicety: don't hard-fail in local dev if the key isn’t set
    if (!apiKey) {
      console.warn(
        "[/api/brevo/update-contact] BREVO_API_KEY is missing. " +
          "Skipping Brevo call (this is common in local dev)."
      );

      // Still return 200 so the front-end flow continues
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "BREVO_API_KEY missing – Brevo not called",
      });
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        attributes,
        updateEnabled: true,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Brevo update-contact error:", data);
      return NextResponse.json(
        {
          error: "Failed to update Brevo contact",
          details: data,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("update-contact route error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
