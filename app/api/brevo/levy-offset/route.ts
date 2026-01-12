// app/api/brevo/levy-offset/route.ts
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

    // Prefer env var, fallback to 13
    const listIdRaw = process.env.BREVO_LEVY_OFFSET_LIST_ID;
    const LIST_ID = listIdRaw ? Number(listIdRaw) : 13;

    // Upsert contact and ensure they're added to Levy Offset list
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        attributes,
        listIds: [LIST_ID],
        updateEnabled: true,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("Brevo levy-offset error:", data);
      return NextResponse.json(
        { error: "Failed to create/update Brevo contact", details: data },
        { status: 500 }
      );
    }

    /* ---------------------------------------------------------------------- */
    /*                             AIRTABLE WRITE                              */
    /* ---------------------------------------------------------------------- */
    // Prefer values from the request body (what your estimate page sends),
    // and fall back to attributes if you're passing via Brevo attributes.
    const loanAmount =
      Number(body?.loanAmount) ||
      Number(attributes?.OFFSETESTIMATE_LOAN) ||
      Number(attributes?.loanAmount) ||
      0;

    const annualOffset =
      Number(body?.annualOffset) ||
      Number(attributes?.OFFSETESTIMATE_ANNUAL) ||
      Number(attributes?.annualOffset) ||
      0;

    const trailRate =
      Number(body?.trailRate) ||
      Number(attributes?.OFFSETESTIMATE_RATE) ||
      Number(attributes?.trailRate) ||
      0.0015;

    const page =
      (body?.page as string | undefined) ||
      (attributes?.OFFSETESTIMATE_PAGE as string | undefined) ||
      (attributes?.page as string | undefined) ||
      "/buildings/levy-offsets/for-owners/estimate";

    const source =
      (body?.source as string | undefined) ||
      (attributes?.SOURCE as string | undefined) ||
      "OFFSETESTIMATE";

    // Fire-and-forget so Airtable issues don’t block the user journey
    console.log("[levy-offset] Writing to Airtable", {
      email,
      loanAmount,
      annualOffset,
      trailRate,
      source,
      page,
    });

    void createLevyOffsetEstimateLead({
      email: String(email).trim().toLowerCase(),
      loanAmount,
      annualOffset,
      trailRate,
      source,
      page,
    });

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("levy-offset route error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
