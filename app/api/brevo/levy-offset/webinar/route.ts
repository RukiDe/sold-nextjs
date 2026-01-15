// app/api/brevo/levy-offset/webinar/route.ts
import { NextResponse } from "next/server";

function coerceToBoolean(value: any): boolean {
  return (
    value === true ||
    value === "true" ||
    value === "True" ||
    value === "TRUE" ||
    value === "yes" ||
    value === "Yes" ||
    value === "YES" ||
    value === 1 ||
    value === "1"
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body?.email as string | undefined;
    const rawAttributes = (body?.attributes || {}) as Record<string, any>;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "BREVO_API_KEY is missing. Add it to .env.local (dev) and Vercel env vars (prod).",
        },
        { status: 500 }
      );
    }

    // Webinar list
    const LIST_ID = 14;

    // Clone + coerce booleans
    const attributes: Record<string, any> = { ...rawAttributes };
    const booleanKeys = ["WEBINAR_SIGNUP"];
    for (const key of booleanKeys) {
      if (attributes[key] !== undefined) {
        attributes[key] = coerceToBoolean(attributes[key]);
      }
    }

    // Brevo upsert + add to list 14
    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        attributes,
        listIds: [LIST_ID],
        updateEnabled: true,
      }),
    });

    const brevoData = await brevoRes.json().catch(() => ({}));

    if (!brevoRes.ok) {
      console.error("[webinar] Brevo error:", brevoData);
      return NextResponse.json(
        { error: "Failed to create/update Brevo contact", details: brevoData },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: brevoData });
  } catch (err: any) {
    console.error("[webinar] route error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
