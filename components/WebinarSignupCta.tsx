"use client";

import { useMemo, useState } from "react";

const validEmail = (e: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim().toLowerCase());

const TZ = "Australia/Melbourne";
const WEBINAR_WEEKDAY_TARGET = "Tue"; // next Tuesday
const WEBINAR_HOUR = 12;
const WEBINAR_MINUTE = 30;

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
  // We just need the abbreviation for that *date* in Melbourne (AEDT/AEST).
  // Use a safe UTC timestamp that definitely exists and format in the target time zone.
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

function computeNextTuesdayWebinar(now = new Date()) {
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
  const targetIdx = weekdayIndex[WEBINAR_WEEKDAY_TARGET];

  let daysUntil = (targetIdx - todayIdx + 7) % 7;

  // If it's Tuesday already, only use "today" if we haven't passed 12:30pm Melbourne time.
  if (daysUntil === 0) {
    const passed =
      nowTz.hour > WEBINAR_HOUR ||
      (nowTz.hour === WEBINAR_HOUR && nowTz.minute >= WEBINAR_MINUTE);
    if (passed) daysUntil = 7;
  }

  const targetYMD = addDaysToYMD_UTC(
    nowTz.year,
    nowTz.month,
    nowTz.day,
    daysUntil
  );
  const tzAbbrev = getTzAbbrevForDate(
    targetYMD.year,
    targetYMD.month,
    targetYMD.day,
    TZ
  );
  const dateLabel = formatWebinarDate(
    targetYMD.year,
    targetYMD.month,
    targetYMD.day,
    TZ
  );

  // What you show on the page
  const display = `${dateLabel} · 12:${String(WEBINAR_MINUTE).padStart(
    2,
    "0"
  )}pm (${tzAbbrev})`;

  // What you store in Brevo (handy for segmentation / future reminders)
  const slotLabel = `Webinar: ${display}`;

  return { display, slotLabel };
}

export function WebinarSignupCta({
  pagePath = "/buildings/levy-offsets/for-owners",
}: {
  pagePath?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const next = useMemo(() => computeNextTuesdayWebinar(), []);

  async function submit() {
    setErr("");

    if (!validEmail(email)) return setErr("Please enter a valid email.");

    setSubmitting(true);

    try {
      const payload = {
        email: email.trim(),
        attributes: {
          WEBINAR_SIGNUP: true,
          WEBINAR_SLOT: next.slotLabel,
          WEBINAR_PAGE: pagePath,
        },
      };

      const r = await fetch("/api/brevo/levy-offset/webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: any = null;
      const ct = r.headers.get("content-type") || "";
      if (ct.includes("application/json")) data = await r.json();
      else data = { error: await r.text() };

      if (!r.ok)
        throw new Error(
          data?.error || "Couldn’t submit right now. Please try again."
        );

      setSent(true);
    } catch (e: any) {
      setSent(false);
      setErr(e?.message || "Couldn’t submit right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">
          Join a short information session
        </h3>
        <p className="text-gray-700">
          A 30-minute, no-pressure walkthrough for apartment owners.
        </p>
      </div>

      <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
          Next available webinar
        </p>
        <p className="text-base font-semibold text-gray-900">{next.display}</p>
      </div>

      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>You won’t be on camera or audio</li>
        <li>Questions via chat only (optional)</li>
        <li>You can just listen</li>
      </ul>

      <div className="space-y-3">
        {sent ? (
          <div className="border border-gray-200 rounded-2xl p-4 bg-white space-y-3">
            <p className="text-sm text-gray-700">
              You’re in. Check your inbox for the link and details.
            </p>
            <p className="text-xs text-gray-500">
              If you can’t see it, check Promotions or Spam (sorry, inboxes are
              chaotic).
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Universal (Apple/Outlook/Google import) */}
              <a
                href="/calendar/levy-offsets.ics"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border text-sm font-medium bg-black text-white border-black hover:opacity-95 transition"
              >
                Add to calendar
              </a>

              {/* Optional convenience button */}
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=START/END&details=...&location=...&ctz=Australia/Melbourne"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border text-sm font-medium bg-white text-gray-900 border-gray-200 hover:border-gray-300 transition"
              >
                Add to Google Calendar
              </a>
            </div>

            <p className="text-xs text-gray-500">
              The calendar link always uses the next available session.
            </p>
          </div>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErr("");
              }}
              placeholder="you@domain.com"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/10"
            />

            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className={[
                "inline-flex items-center justify-center px-6 py-3 rounded-full border text-sm font-medium transition",
                submitting
                  ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
                  : "bg-black text-white border-black hover:opacity-95",
              ].join(" ")}
            >
              {submitting ? "Reserving..." : "Reserve a spot"}
            </button>

            {err && <p className="text-xs text-red-600">{err}</p>}
            <p className="text-xs text-gray-500">
              We’ll only email you about this session. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
