// app/api/readinesscheck/[id]/route.ts

import { NextResponse } from "next/server";
import { getReadinessCheckById } from "@/lib/airtable";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  try {
    const record = await getReadinessCheckById(params.id);

    if (!record) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(record);
  } catch (err) {
    console.error("GET /api/readinesscheck/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
