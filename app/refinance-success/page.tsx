"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export default function RefinanceSuccessPage() {
  const [emailFromUrl, setEmailFromUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // 1) Grab email from the URL on the client
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const url = new URL(window.location.href);
      const email = url.searchParams.get("email") || "";
      setEmailFromUrl(email);
    } catch (err) {
      console.error("Failed to parse URL for email param", err);
    }
  }, []);

  // 2) Once we have a valid email, update Brevo and send the booking email
  useEffect(() => {
    if (!emailFromUrl || !emailFromUrl.includes("@")) return;

    let cancelled = false;

    const run = async () => {
      try {
        setStatus("loading");

        // 2a) Flip REFI_CONSENT_SIGNED on the contact
        const updateRes = await fetch("/api/brevo/update-contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailFromUrl,
            attributes: {
              REFI_CONSENT_SIGNED: true,
            },
          }),
        });

        if (!updateRes.ok) {
          console.error(
            "Failed to update Brevo contact from refinance-success"
          );
          if (!cancelled) setStatus("error");
          return;
        }

        // 2b) Fire the follow-up booking email immediately
        const emailRes = await fetch("/api/brevo/send-refi-booking-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailFromUrl,
          }),
        });

        if (!emailRes.ok) {
          console.error(
            "Failed to send Brevo booking email from refinance-success"
          );
          if (!cancelled) setStatus("error");
          return;
        }

        if (!cancelled) setStatus("ok");
      } catch (err) {
        console.error("Error in refinance-success Brevo flow:", err);
        if (!cancelled) setStatus("error");
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [emailFromUrl]);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl sm:text-5xl font-black mb-6">
        Thanks for signing 🎉
      </h1>

      <p className="text-lg text-neutral-700 leading-relaxed mb-4">
        We have received your Privacy &amp; Credit Guide, which means we can now
        properly review your situation and talk through options.
      </p>

      <p className="text-lg text-neutral-700 leading-relaxed mb-4">
        Next up, we will send you a secure Open Banking link so you can quickly
        verify your loan and account details in a fast, safe way — without
        uploading bank statements or digging through paperwork.
      </p>

      <p className="text-lg text-neutral-700 leading-relaxed mb-8">
        Once that is done, we will put together a personalised estimate that
        shows:
      </p>

      <ul className="list-disc ml-6 text-neutral-700 space-y-2 mb-8">
        <li>Your current cost versus what you could be paying</li>
        <li>Any potential savings based on your fact find</li>
        <li>The steps to switch if it makes sense for you</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Want to talk it through?</h2>

      <p className="text-lg text-neutral-700 leading-relaxed mb-6">
        If you would like to walk through your options or get a clearer picture
        sooner, you can grab a quick chat below. No pressure, just a straight
        explanation of what we can see.
      </p>

      <a
        href="https://calendly.com/soldfinancial/intro"
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-black text-white font-semibold text-lg rounded-full px-6 py-3 hover:bg-white hover:text-black border border-black transition-all"
      >
        👉 Book a quick chat
      </a>
      
    </main>
  );
}
