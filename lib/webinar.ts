// lib/webinar.ts

export const TZ = "Australia/Melbourne" as const;

const WEEKDAY_TARGET = "Tue" as const;
const START_HOUR = 12;
const START_MINUTE = 30;
const DURATION_MINUTES = 30;

export type WebinarNext = {
  // Human
  display: string; // "Tue 20 Jan 2026 · 12:30pm (AEDT)"
  dateLabel: string; // "Tue 20 Jan 2026"
  tzAbbrev: string; // "AEDT" | "AEST"

  // UTC ISO
  startIsoUtc: string; // "2026-01-20T01:30:00.000Z"
  endIsoUtc: string;

  // Google Calendar date format
  startUtcCompact: string; // "20260120T013000Z"
  endUtcCompact: string;

  // Links
  googleUrl: string;
  icsUrl: string;

  // Metadata
  meetUrl: string;
  title: string;
  details: string;
  location: string;
};

function getTzParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const pick = (type: string) => parts.find((p) => p.type === type)?.value;

  return {
    weekday: pick("weekday") || "",
    year: Number(pick("year")),
    month: Number(pick("month")),
    day: Number(pick("day")),
    hour: Number(pick("hour")),
    minute: Number(pick("minute")),
  };
}

function addDaysToYMD_UTC(y: number, m: number, d: number, days: number) {
  const base = new Date(Date.UTC(y, m - 1, d));
  const next = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
  };
}

function getTzAbbrevForDate(y: number, m: number, d: number, timeZone: string) {
  const probe = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone,
    timeZoneName: "short",
  }).formatToParts(probe);

  return parts.find((p) => p.type === "timeZoneName")?.value || "AEST";
}

function formatWebinarDate(y: number, m: number, d: number, timeZone: string) {
  const probe = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return new Intl.DateTimeFormat("en-AU", {
    timeZone,
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(probe);
}

// Convert "Melbourne local time (yyyy-mm-dd hh:mm)" into a real UTC Date.
// We do this by searching for the UTC instant whose formatted time in Melbourne equals the target local time.
function melbourneLocalToUtcDate(
  y: number,
  m: number,
  d: number,
  hour: number,
  minute: number,
  timeZone: string
) {
  // Start near midday UTC to avoid edge weirdness, then search +/- 24 hours.
  const start = Date.UTC(y, m - 1, d, 0, 0, 0);
  const end = start + 48 * 60 * 60 * 1000;

  const targetKey = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(
    2,
    "0"
  )} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

  // Binary-ish search in minutes
  let lo = start;
  let hi = end;

  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const keyFor = (utcMs: number) => {
    const parts = fmt.formatToParts(new Date(utcMs));
    const pick = (t: string) => parts.find((p) => p.type === t)?.value || "";
    return `${pick("year")}-${pick("month")}-${pick("day")} ${pick("hour")}:${pick(
      "minute"
    )}`;
  };

  // If it’s not found exactly (it should be), fall back to closest.
  let best = lo;
  for (let i = 0; i < 60; i++) {
    const mid = Math.floor((lo + hi) / 2 / 60000) * 60000; // minute aligned
    const k = keyFor(mid);

    if (k === targetKey) return new Date(mid);

    // Compare strings works because en-CA yields sortable YYYY-MM-DD HH:mm
    if (k < targetKey) lo = mid + 60000;
    else hi = mid - 60000;

    best = mid;
  }

  return new Date(best);
}

function toCompactUtc(dt: Date) {
  // YYYYMMDDTHHMMSSZ
  const y = dt.getUTCFullYear();
  const mo = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const da = String(dt.getUTCDate()).padStart(2, "0");
  const hh = String(dt.getUTCHours()).padStart(2, "0");
  const mm = String(dt.getUTCMinutes()).padStart(2, "0");
  const ss = String(dt.getUTCSeconds()).padStart(2, "0");
  return `${y}${mo}${da}T${hh}${mm}${ss}Z`;
}

function googleCalendarUrl(args: {
  title: string;
  details: string;
  location: string;
  startUtcCompact: string;
  endUtcCompact: string;
  tz?: string;
}) {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const params = new URLSearchParams({
    text: args.title,
    details: args.details,
    location: args.location,
    dates: `${args.startUtcCompact}/${args.endUtcCompact}`,
    ctz: args.tz || TZ,
  });
  return `${base}&${params.toString()}`;
}

export function computeNextTuesdayWebinar(opts: {
  now?: Date;
  siteUrl: string; // e.g. https://sold.financial
  meetUrl: string;
  pagePath?: string;
}) : WebinarNext {
  const now = opts.now ?? new Date();
  const nowTz = getTzParts(now, TZ);

  const weekdayIndex: Record<string, number> = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  };

  const todayIdx = weekdayIndex[nowTz.weekday] ?? 0;
  const targetIdx = weekdayIndex[WEEKDAY_TARGET];

  let daysUntil = (targetIdx - todayIdx + 7) % 7;

  // If today is Tuesday, only use today if we haven't passed 12:30pm Melbourne time.
  if (daysUntil === 0) {
    const passed =
      nowTz.hour > START_HOUR ||
      (nowTz.hour === START_HOUR && nowTz.minute >= START_MINUTE);
    if (passed) daysUntil = 7;
  }

  const targetYMD = addDaysToYMD_UTC(nowTz.year, nowTz.month, nowTz.day, daysUntil);

  const startUtc = melbourneLocalToUtcDate(
    targetYMD.year,
    targetYMD.month,
    targetYMD.day,
    START_HOUR,
    START_MINUTE,
    TZ
  );

  const endUtc = new Date(startUtc.getTime() + DURATION_MINUTES * 60 * 1000);

  const tzAbbrev = getTzAbbrevForDate(targetYMD.year, targetYMD.month, targetYMD.day, TZ);
  const dateLabel = formatWebinarDate(targetYMD.year, targetYMD.month, targetYMD.day, TZ);

  const display = `${dateLabel} · 12:${String(START_MINUTE).padStart(2, "0")}pm (${tzAbbrev})`;

  const title = "Levy Offsets information session";
  const details =
    `A short, no-pressure walkthrough for apartment owners.\n\n` +
    `Join: ${opts.meetUrl}\n\n` +
    `Notes:\n` +
    `• General information only\n` +
    `• Outcomes aren’t guaranteed and depend on lender eligibility and terms\n` +
    `• No obligation to proceed, ever`;

  const location = "Google Meet";

  const startUtcCompact = toCompactUtc(startUtc);
  const endUtcCompact = toCompactUtc(endUtc);

  const googleUrl = googleCalendarUrl({
    title,
    details,
    location,
    startUtcCompact,
    endUtcCompact,
    tz: TZ,
  });

  // ICS endpoint on your site, dynamic by querystring (stable + simple)
  const icsUrl = `${opts.siteUrl.replace(/\/$/, "")}/api/levy-offset/webinar/ics?start=${encodeURIComponent(
    startUtc.toISOString()
  )}&end=${encodeURIComponent(endUtc.toISOString())}`;

  return {
    display,
    dateLabel,
    tzAbbrev,
    startIsoUtc: startUtc.toISOString(),
    endIsoUtc: endUtc.toISOString(),
    startUtcCompact,
    endUtcCompact,
    googleUrl,
    icsUrl,
    meetUrl: opts.meetUrl,
    title,
    details,
    location,
  };
}
