// app/api/brevo/levy-offset/pdf/route.ts
import { NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const DEFAULT_LIST_ID = 15;

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: Request) {
  try {
    if (!BREVO_API_KEY) return jsonError("Missing BREVO_API_KEY env var.", 500);

    const body = await req.json().catch(() => null);
    const email = (body?.email || "").toString().trim();

    if (!email) return jsonError("Email is required.");
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
    if (!isValid) return jsonError("Please enter a valid email.");

    // You can optionally override list via env later if you want
    const listIdRaw = process.env.BREVO_LEVY_OFFSET_PDF_LIST_ID;
    const LIST_ID = listIdRaw ? Number(listIdRaw) : DEFAULT_LIST_ID;

    const attributes = {
      ...(body?.attributes || {}),
      PDF_EXPLAINER: true,
      PDF_EXPLAINER_PAGE: body?.attributes?.PDF_EXPLAINER_PAGE || body?.pagePath || "",
      PDF_EXPLAINER_TS: new Date().toISOString(),
    };

    // Upsert contact AND add to list 15
    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        listIds: [LIST_ID],
        attributes,
      }),
    });

    // Brevo returns 201/204-ish depending on state. If not ok, surface error.
    if (!brevoRes.ok) {
      let detail = "";
      try {
        const j = await brevoRes.json();
        detail = j?.message || JSON.stringify(j);
      } catch {
        detail = await brevoRes.text();
      }
      return jsonError(detail || "Brevo request failed.", brevoRes.status);
    }

    return NextResponse.json({ ok: true, listId: LIST_ID });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Couldn’t send right now. Please try again." },
      { status: 500 }
    );
  }
}
