// app/api/levy-offset/webinar/google/route.ts
import { NextResponse } from "next/server";
import { computeNextTuesdayWebinar } from "@/lib/webinar";

export async function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://sold.financial";

  const meetUrl = "https://meet.google.com/ozt-tvjh-sro?authuser=0";

  const next = computeNextTuesdayWebinar({
    siteUrl,
    meetUrl,
  });

  return NextResponse.redirect(next.googleUrl);
}
