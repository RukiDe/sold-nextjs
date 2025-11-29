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

  // 2) Once we have a valid email, ping Brevo update-contact
  useEffect(() => {
    if (!emailFromUrl || !emailFromUrl.includes("@")) return;

    let cancelled = false;

    const markConsentSigned = async () => {
      try {
        setStatus("loading");

        const res = await fetch("/api/brevo/update-contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailFromUrl,
            attributes: {
              REFI_CONSENT_SIGNED: true,
            },
          }),
        });

        if (!res.ok) {
          console.error(
            "Failed to update Brevo contact from refinance-success"
          );
          if (!cancelled) setStatus("error");
          return;
        }

        if (!cancelled) setStatus("ok");
      } catch (err) {
        console.error("Error calling /api/brevo/update-contact:", err);
        if (!cancelled) setStatus("error");
      }
    };

    markConsentSigned();

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

      <a
        href="https://calendly.com/rukid/sold-refi"
        className="inline-block bg-[#0B0F1B] text-white font-semibold text-[17px]
          rounded-full px-8 py-3.5 border border-[#0B0F1B]
          hover:bg-white hover:text-black hover:border-black transition-all"
      >
        Schedule a chat
      </a>

      {status === "loading" && (
        <p className="mt-4 text-sm text-neutral-500">
          Updating your consent status…
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">
          We had trouble updating your consent status. No stress — we can
          confirm it manually on our side.
        </p>
      )}
    </main>
  );
}
