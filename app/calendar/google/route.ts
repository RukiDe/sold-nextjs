import { NextResponse } from "next/server";

const TZ = "Australia/Melbourne";
const TITLE = "Levy Offsets information session";
const DURATION_MINUTES = 30;
const MEET_URL =
  process.env.LEVY_OFFSETS_MEET_URL || "https://meet.google.com/your-link";

function computeNextSessionUtc(now = new Date()) {
  // keep it consistent with the .ics endpoint by simply calling it server-side later if you want
  // For now, duplicate minimal logic (or extract to a shared util).
  // If you prefer: move computeNextSessionUtc to a shared lib file and import in both.
  const targetWeekday = 2; // Tue
  const targetHour = 12;
  const targetMinute = 30;

  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: TZ,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => parts.find((p) => p.type === t)?.value || "";
  const weekdayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };

  const nowY = Number(get("year"));
  const nowM = Number(get("month"));
  const nowD = Number(get("day"));
  const nowH = Number(get("hour"));
  const nowMin = Number(get("minute"));
  const nowW = weekdayMap[get("weekday")] ?? 0;

  let daysUntil = (targetWeekday - nowW + 7) % 7;
  if (daysUntil === 0) {
    const passed =
      nowH > targetHour || (nowH === targetHour && nowMin >= targetMinute);
    if (passed) daysUntil = 7;
  }

  const target = new Date(Date.UTC(nowY, nowM - 1, nowD + daysUntil, 12, 30, 0));
  const end = new Date(target.getTime() + DURATION_MINUTES * 60 * 1000);
  return { startUtc: target, endUtc: end };
}

function toGoogleDates(dt: Date) {
  // YYYYMMDDTHHMMSSZ
  const pad = (n: number) => String(n).padStart(2, "0");
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

  const dates = `${toGoogleDates(startUtc)}/${toGoogleDates(endUtc)}`;
  const details = [
    "A short, no-pressure walkthrough for apartment owners.",
    "",
    `Join: ${MEET_URL}`,
  ].join("\n");

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", TITLE);
  url.searchParams.set("dates", dates);
  url.searchParams.set("details", details);
  url.searchParams.set("location", "Google Meet");

  return NextResponse.redirect(url.toString(), { status: 302 });
}
