import { NextResponse } from "next/server";

const TZ = "Australia/Melbourne";
const TITLE = "Levy Offsets information session";
const DURATION_MINUTES = 30;

// Put your real meet/join URL here (or fetch it from env)
const MEET_URL =
  process.env.LEVY_OFFSETS_MEET_URL || "meet.google.com/yor-cyet-dvq";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// Find next Tuesday 12:30 in Melbourne time, but return as UTC Date objects
function computeNextSessionUtc(now = new Date()) {
  // We'll step day-by-day looking for the next Tuesday, and treat "Tuesday after 12:30" as next week.
  // This avoids gnarly timezone math on the server.

  const targetWeekday = 2; // Tue (0 Sun, 1 Mon, 2 Tue...)
  const targetHour = 12;
  const targetMinute = 30;

  // Convert "now" into Melbourne local parts
  const nowParts = new Intl.DateTimeFormat("en-AU", {
    timeZone: TZ,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => nowParts.find((p) => p.type === t)?.value || "";

  const weekdayStr = get("weekday"); // Mon/Tue/...
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const nowY = Number(get("year"));
  const nowM = Number(get("month"));
  const nowD = Number(get("day"));
  const nowH = Number(get("hour"));
  const nowMin = Number(get("minute"));
  const nowW = weekdayMap[weekdayStr] ?? 0;

  let daysUntil = (targetWeekday - nowW + 7) % 7;
  if (daysUntil === 0) {
    const passed =
      nowH > targetHour || (nowH === targetHour && nowMin >= targetMinute);
    if (passed) daysUntil = 7;
  }

  // We now have the target Y/M/D in Melbourne terms. Construct a “floating” Melbourne time,
  // then convert to UTC by using an ISO string with timezone offset derived by Intl.
  const targetDateLocal = new Date(Date.UTC(nowY, nowM - 1, nowD + daysUntil, 0, 0, 0));

  // Get actual Y/M/D after adding days (safe in UTC)
  const y = targetDateLocal.getUTCFullYear();
  const m = targetDateLocal.getUTCMonth() + 1;
  const d = targetDateLocal.getUTCDate();

  // Convert Melbourne local (y-m-d 12:30) into an instant by formatting in TZ then re-parsing via parts
  // Approach: take a UTC “probe” and extract TZ offset indirectly is messy; simpler:
  // Create a Date from UTC and then interpret via Intl to produce a UTC time string for DTSTART/DTEND.
  // We'll build UTC Date by finding what UTC time corresponds to 12:30 in TZ.
  const probe = new Date(Date.UTC(y, m - 1, d, 12, 30, 0));
  // probe is not guaranteed to be the same instant as 12:30 TZ, but we can adjust by comparing parts.

  const desiredH = targetHour;
  const desiredMin = targetMinute;

  // iterate up to 3 hours to align (covers DST changes)
  let aligned = probe;
  for (let i = 0; i < 8; i++) {
    const parts = new Intl.DateTimeFormat("en-AU", {
      timeZone: TZ,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(aligned);

    const hh = Number(parts.find((p) => p.type === "hour")?.value);
    const mm = Number(parts.find((p) => p.type === "minute")?.value);
    const yy = Number(parts.find((p) => p.type === "year")?.value);
    const mo = Number(parts.find((p) => p.type === "month")?.value);
    const dd = Number(parts.find((p) => p.type === "day")?.value);

    if (yy === y && mo === m && dd === d && hh === desiredH && mm === desiredMin) {
      break;
    }
    // shift by 30 minutes until it matches
    aligned = new Date(aligned.getTime() + 30 * 60 * 1000);
  }

  const startUtc = aligned;
  const endUtc = new Date(startUtc.getTime() + DURATION_MINUTES * 60 * 1000);

  return { startUtc, endUtc };
}

function toIcsUtc(dt: Date) {
  return (
    dt.getUTCFullYear() +
    pad(dt.getUTCMonth() + 1) +
    pad(dt.getUTCDate()) +
    "T" +
    pad(dt.getUTCHours()) +
    pad(dt.getUTCMinutes()) +
    pad(dt.getUTCSeconds()) +
    "Z"
  );
}

export async function GET() {
  const { startUtc, endUtc } = computeNextSessionUtc(new Date());
  const dtStart = toIcsUtc(startUtc);
  const dtEnd = toIcsUtc(endUtc);

  const descriptionLines = [
    "A short, no-pressure walkthrough for apartment owners.",
    "",
    `Join: ${MEET_URL}`,
    "",
    "Notes:",
    "• General information only",
    "• Outcomes aren’t guaranteed and depend on lender eligibility and terms",
    "• No obligation to proceed, ever",
  ];

  // ICS expects CRLF line endings
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sold//Levy Offsets//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:levy-offsets-${dtStart}@sold.financial`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${TITLE}`,
    `LOCATION:Google Meet`,
    `DESCRIPTION:${descriptionLines.join("\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="levy-offsets.ics"',
      "Cache-Control": "no-store",
    },
  });
}
