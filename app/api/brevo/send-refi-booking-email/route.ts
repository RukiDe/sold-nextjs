// app/api/brevo/send-refi-booking-email/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email as string | undefined;
    const firstName = body?.firstName as string | undefined;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const templateIdRaw = process.env.BREVO_REFI_BOOKCALL_TEMPLATE_ID;

    if (!apiKey) {
      console.warn(
        "[/api/brevo/send-refi-booking-email] BREVO_API_KEY missing – skipping Brevo call (likely local dev)."
      );
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "BREVO_API_KEY missing – Brevo not called",
      });
    }

    if (!templateIdRaw) {
      console.error(
        "[/api/brevo/send-refi-booking-email] BREVO_REFI_BOOKCALL_TEMPLATE_ID env var is not set."
      );
      return NextResponse.json(
        {
          error: "BREVO_REFI_BOOKCALL_TEMPLATE_ID env var is not set",
        },
        { status: 500 }
      );
    }

    const templateId = Number(templateIdRaw);
    if (!Number.isFinite(templateId)) {
      console.error(
        "[/api/brevo/send-refi-booking-email] BREVO_REFI_BOOKCALL_TEMPLATE_ID is not a valid number."
      );
      return NextResponse.json(
        {
          error: "BREVO_REFI_BOOKCALL_TEMPLATE_ID must be a number",
        },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        to: [{ email }],
        templateId,
        // Optional: pass through FIRSTNAME etc. to your Brevo template
        params: {
          FIRSTNAME: firstName || undefined,
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Brevo send-refi-booking-email error:", data);
      return NextResponse.json(
        {
          error: "Failed to send Brevo email",
          details: data,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("send-refi-booking-email route error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
