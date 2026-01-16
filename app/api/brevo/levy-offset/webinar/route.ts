// app/api/brevo/levy-offset/webinar/route.ts
import { NextResponse } from "next/server";
import { computeNextTuesdayWebinar } from "@/lib/webinar";

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
        { error: "BREVO_API_KEY is missing. Add it to Vercel env vars." },
        { status: 500 }
      );
    }

    const listId =
      process.env.BREVO_LEVY_OFFSET_LIST_ID
        ? Number(process.env.BREVO_LEVY_OFFSET_LIST_ID)
        : 13;

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://sold.financial";

    const meetUrl = "https://meet.google.com/ozt-tvjh-sro?authuser=0";

    const next = computeNextTuesdayWebinar({
      siteUrl,
      meetUrl,
    });

    // Clone so we can safely mutate
    const attributes: Record<string, any> = { ...rawAttributes };

    // Coerce any boolean-style flags we use
    const booleanKeys = ["WEBINAR_SIGNUP"];
    for (const key of booleanKeys) {
      if (attributes[key] !== undefined) {
        attributes[key] = coerceToBoolean(attributes[key]);
      }
    }

    // Force webinar attributes (Option A)
    attributes.WEBINAR_SIGNUP = true;
    attributes.WEBINAR_DISPLAY = next.display;
    attributes.WEBINAR_START_UTC = next.startIsoUtc;
    attributes.WEBINAR_END_UTC = next.endIsoUtc;
    attributes.WEBINAR_GOOGLE_URL = next.googleUrl;
    attributes.WEBINAR_ICS_URL = next.icsUrl;
    attributes.WEBINAR_MEET_URL = next.meetUrl;

    // Handy: direct “add” endpoints too (stable URLs)
    attributes.WEBINAR_GOOGLE_DYNAMIC = `${siteUrl.replace(/\/$/, "")}/api/levy-offset/webinar/google`;

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: email.trim(),
        attributes,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("[brevo levy-offset webinar] error:", data);
      return NextResponse.json(
        { error: "Failed to create/update Brevo contact", details: data },
        { status: 500 }
      );
    }

    // Return the computed slot so the UI can show Add-to-calendar immediately
    return NextResponse.json({ success: true, next });
  } catch (err: any) {
    console.error("[brevo levy-offset webinar] route error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
