// app/refinance-success/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function RefinanceSuccess() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";
  const hasUpdatedRef = useRef(false);

  // 🔒 Mark REFI_CONSENT_SIGNED = true in Brevo when they land here
  useEffect(() => {
    if (hasUpdatedRef.current) return;
    if (!emailFromUrl || !emailFromUrl.includes("@")) return;

    hasUpdatedRef.current = true;

    fetch("/api/brevo/update-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailFromUrl,
        attributes: {
          REFI_CONSENT_SIGNED: true,
        },
      }),
    }).catch((err) => {
      console.error("Failed to mark REFI_CONSENT_SIGNED:", err);
    });
  }, [emailFromUrl]);

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-6">
        You&apos;re in ✨
      </h1>

      <p className="text-lg text-neutral-700 leading-relaxed mb-6">
        Thanks for signing your <strong>Credit Guide &amp; Privacy Consent</strong>.
        That is the important legal step done, which means we can now properly
        review your home loan and look for real savings.
      </p>

      <p className="text-lg text-neutral-700 leading-relaxed mb-6">
        Next, we will start analysing your situation. You will get a secure{" "}
        <strong>Open Banking</strong> link so you can verify your loan details in
        a fast, safe way — without uploading bank statements or hunting through
        your emails.
      </p>

      <hr className="my-10 border-neutral-200" />

      <h2 className="text-2xl font-bold mb-4">Want to talk it through?</h2>

      <p className="text-lg text-neutral-700 leading-relaxed mb-6">
        If you would like to walk through your options or get a clearer picture
        sooner, you can grab a quick chat below. No pressure, just a straight
        explanation of what we can see.
      </p>

      <a
        href="https://calendly.com/soldfinancial/intro"
        target="_blank"
        className="inline-block bg-black text-white font-semibold text-lg rounded-full px-6 py-3 hover:bg-white hover:text-black border border-black transition-all"
      >
        👉 Book a quick chat
      </a>

      <p className="mt-10 text-neutral-500 text-sm">
        The Sold Team ✨
        <br />
        Making home loans easy.
      </p>
    </main>
  );
}
