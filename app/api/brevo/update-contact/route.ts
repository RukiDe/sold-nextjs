import { NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;

type BrevoUpdateRequest = {
  email: string;
  attributes: Record<string, string | number | boolean | null>;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BrevoUpdateRequest;
    const { email, attributes } = body;

    if (!email || !attributes || Object.keys(attributes).length === 0) {
      return NextResponse.json(
        { error: "Missing email or attributes" },
        { status: 400 }
      );
    }

    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY not set");
      return NextResponse.json(
        { error: "Brevo API key not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({ attributes }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Brevo update error:", res.status, text);
      return NextResponse.json(
        { error: "Failed to update contact in Brevo" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Brevo update route error:", err);
    return NextResponse.json(
      { error: "Unexpected error updating contact" },
      { status: 500 }
    );
  }
}
