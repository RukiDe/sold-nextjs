// app/api/levy-offset/webinar/ics/route.ts
import { NextResponse } from "next/server";
import { computeNextTuesdayWebinar } from "@/lib/webinar";

function icsEscape(v: string) {
  return String(v)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function toIcsUtcCompact(isoUtc: string) {
  // iso: 2026-01-20T01:30:00.000Z -> 20260120T013000Z
  const d = new Date(isoUtc);
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, "0");
  const da = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  const ss = String(d.getUTCSeconds()).padStart(2, "0");
  return `${y}${mo}${da}T${hh}${mm}${ss}Z`;
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://sold.financial";

  const meetUrl = "https://meet.google.com/ozt-tvjh-sro?authuser=0";

  // Allow overriding via query params (used by computeNextTuesdayWebinar output)
  const start = url.searchParams.get("start");
  const end = url.searchParams.get("end");

  let next = computeNextTuesdayWebinar({ siteUrl, meetUrl });

  if (start && end) {
    const startIso = new Date(start).toISOString();
    const endIso = new Date(end).toISOString();

    // Reuse next but replace times (keeps title/details/location consistent)
    next = {
      ...next,
      startIsoUtc: startIso,
      endIsoUtc: endIso,
    };
  }

  const dtStart = toIcsUtcCompact(next.startIsoUtc);
  const dtEnd = toIcsUtcCompact(next.endIsoUtc);

  const uid = `levy-offset-webinar-${dtStart}@sold.financial`;
  const nowUtc = toIcsUtcCompact(new Date().toISOString());

  const ics =
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Sold Financial//Levy Offsets Webinar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${nowUtc}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${icsEscape(next.title)}`,
      `DESCRIPTION:${icsEscape(next.details)}`,
      `LOCATION:${icsEscape(next.location)}`,
      `URL:${icsEscape(next.meetUrl)}`,
      "END:VEVENT",
      "END:VCALENDAR",
      "",
    ].join("\r\n");

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="levy-offsets-session.ics"',
      "Cache-Control": "no-store",
    },
  });
}
