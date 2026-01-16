"use client";

import { useEffect, useState } from "react";

const validEmail = (e: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim().toLowerCase());

type NextWebinar = {
  display: string;
  googleUrl: string;
  icsUrl: string;
  meetUrl: string;
};

export function WebinarSignupCta({
  pagePath = "/buildings/levy-offsets/for-owners",
}: {
  pagePath?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const [next, setNext] = useState<NextWebinar | null>(null);

  // Load the next slot from the server (keeps UI aligned with Brevo attributes)
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/levy-offset/webinar/next", { method: "GET" });
        const j = await r.json();
        if (j?.next) {
          setNext({
            display: j.next.display,
            googleUrl: j.next.googleUrl,
            icsUrl: j.next.icsUrl,
            meetUrl: j.next.meetUrl,
          });
        }
      } catch {
        // Non-fatal
      }
    })();
  }, []);

  async function submit() {
    setErr("");

    if (!validEmail(email)) return setErr("Please enter a valid email.");

    setSubmitting(true);

    try {
      const payload = {
        email: email.trim(),
        attributes: {
          WEBINAR_SIGNUP: true,
          WEBINAR_PAGE: pagePath,
        },
      };

      const r = await fetch("/api/brevo/levy-offset/webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const ct = r.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await r.json() : { error: await r.text() };

      if (!r.ok) throw new Error(data?.error || "Couldn’t submit right now. Please try again.");

      // Use the server-computed slot returned from the API (most correct)
      if (data?.next) {
        setNext({
          display: data.next.display,
          googleUrl: data.next.googleUrl,
          icsUrl: data.next.icsUrl,
          meetUrl: data.next.meetUrl,
        });
      }

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
        <h3 className="text-xl font-semibold text-gray-900">Join a short information session</h3>
        <p className="text-gray-700">A 30-minute, no-pressure walkthrough for apartment owners.</p>
      </div>

      <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Next available session</p>
        <p className="text-base font-semibold text-gray-900">
          {next?.display || "Loading…"}
        </p>
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
              You’re in ✅ Check your inbox for the link and details.
            </p>

            {next && (
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={next.googleUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border text-sm font-medium bg-black text-white border-black hover:opacity-95"
                >
                  Add to Google Calendar
                </a>

                <a
                  href={next.icsUrl}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border text-sm font-medium bg-white text-gray-900 border-gray-200 hover:border-gray-300"
                >
                  Download .ics (Apple/Outlook)
                </a>
              </div>
            )}

            <p className="text-xs text-gray-500">
              If you can’t see the email, check Promotions or Spam (inboxes are a jungle).
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
