import { NextResponse } from "next/server";
import { runRatesHarvest } from "@/lib/rateHarvester";

async function run() {
  await runRatesHarvest();
  return NextResponse.json({ ok: true });
}

export async function POST() {
  try {
    return await run();
  } catch (err) {
    console.error("Harvest error", err);
    return NextResponse.json(
      { ok: false, error: "Harvest failed" },
      { status: 500 }
    );
  }
}

// Optional: allow GET for local testing in browser
export async function GET() {
  try {
    return await run();
  } catch (err) {
    console.error("Harvest error", err);
    return NextResponse.json(
      { ok: false, error: "Harvest failed" },
      { status: 500 }
    );
  }
}
