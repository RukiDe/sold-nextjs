// app/api/admin/run-rates/route.ts
import { NextResponse } from "next/server";
import { runRatesHarvest } from "@/lib/rateHarvester";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const force = url.searchParams.get("force") === "1";

    await runRatesHarvest({ forceRefresh: force });

    return NextResponse.json({ ok: true, force });
  } catch (err) {
    console.error("Harvest error", err);
    const message =
      err instanceof Error ? err.message : "Unknown error running harvest";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// Keep POST for future cron/hooks
export async function POST(req: Request) {
  return GET(req);
}
