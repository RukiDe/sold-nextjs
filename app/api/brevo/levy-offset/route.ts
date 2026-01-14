import { NextResponse } from "next/server";
import { createLevyOffsetEstimateLead } from "@/lib/airtable";

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
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Clone so we can safely mutate
    const attributes: Record<string, any> = { ...rawAttributes };

    // Coerce any boolean-style Brevo flags
    const booleanKeys = ["OFFSETESTIMATE"];
    for (const key of booleanKeys) {
      if (attributes[key] !== undefined) {
        attributes[key] = coerceToBoolean(attributes[key]);
      }
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

    const LIST_ID = 13;

    // 1) BREVO UPSERT
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
      console.error("[levy-offset] Brevo error:", brevoData);
      return NextResponse.json(
        { error: "Failed to create/update Brevo contact", details: brevoData },
        { status: 500 }
      );
    }

    // 2) AIRTABLE WRITE (don’t block Brevo success if Airtable fails)
    const loanAmount =
      Number(attributes?.OFFSETESTIMATE_LOAN) ||
      Number(attributes?.loanAmount) ||
      0;

    const annualOffset =
      Number(attributes?.OFFSETESTIMATE_ANNUAL) ||
      Number(attributes?.annualOffset) ||
      0;

    const trailRate =
      Number(attributes?.OFFSETESTIMATE_RATE) ||
      Number(attributes?.trailRate) ||
      0.0015;

    const page =
      (attributes?.OFFSETESTIMATE_PAGE as string | undefined) ||
      (attributes?.page as string | undefined) ||
      "/buildings/levy-offsets/for-owners/estimate";

    const source =
      (attributes?.SOURCE as string | undefined) ||
      (attributes?.source as string | undefined) ||
      "OFFSETESTIMATE";

    console.log("[levy-offset] Airtable payload:", {
      email,
      loanAmount,
      annualOffset,
      trailRate,
      source,
      page,
    });

    try {
      await createLevyOffsetEstimateLead({
        email: email.trim().toLowerCase(),
        loanAmount,
        annualOffset,
        trailRate,
        source,
        page,
      });
    } catch (e: any) {
      console.error("[levy-offset] Airtable write failed:", e?.message || e);
      // still return success (Brevo already worked)
    }

    return NextResponse.json({ success: true, data: brevoData });
  } catch (err: any) {
    console.error("[levy-offset] route error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
