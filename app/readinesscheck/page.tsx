// app/readinesscheck/page.tsx

import React from "react";
import Link from "next/link";
import { ButtonPill } from "@/components/ButtonPill";

export default function ReadinessCheckPage() {
  return (
    <main className="w-full flex flex-col items-center">
      {/* ---------------------- */}
      {/* SECTION: HERO */}
      {/* ---------------------- */}
      <section className="w-full max-w-3xl mx-auto text-center py-24 px-4">
        <h1 className="text-4xl font-semibold mb-4">
          See how ready you are for a home loan.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your ReadinessCheck gives you a simple, objective view of where you
          stand today — with clear steps to move forward.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonPill href="/readinesscheck/start">
            Start your ReadinessCheck
          </ButtonPill>

          <ButtonPill
            href="#how-it-works"
            className="bg-white text-black border-gray-300 hover:bg-black hover:text-white hover:border-black"
          >
            How it works
          </ButtonPill>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          No credit check. No obligations. Just clarity.
        </p>
      </section>

      {/* ---------------------- */}
      {/* SECTION: WHY */}
      {/* ---------------------- */}
      <section className="w-full max-w-3xl mx-auto py-20 px-4" id="why">
        <h2 className="text-2xl font-semibold mb-4">
          Most people feel uncertain. You don&apos;t have to.
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Buying or refinancing shouldn&apos;t feel like guesswork. Banks speak in
          policies. Brokers speak in calculators. But most of us just want a
          straight answer:
        </p>

        <blockquote className="mt-6 p-4 border-l-4 border-black text-lg italic">
          “Am I ready — or what should I improve?”
        </blockquote>

        <p className="text-gray-600 mt-6 leading-relaxed">
          ReadinessCheck gives you that clarity in under a minute, in plain
          English.
        </p>
      </section>

      {/* ---------------------- */}
      {/* SECTION: HOW IT WORKS */}
      {/* ---------------------- */}
      <section
        className="w-full max-w-4xl mx-auto py-24 px-4 border-t border-gray-200"
        id="how-it-works"
      >
        <h2 className="text-3xl font-semibold mb-10">Two simple steps.</h2>

        {/* Step 1 */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-2">1. Quick ReadinessCheck</h3>
          <p className="text-gray-600 mb-4">
            60 seconds. No sharing of banking data. Just a quick snapshot of how
            lender-ready you might be.
          </p>

          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Where you stand today</li>
            <li>What&apos;s working in your favour</li>
            <li>What&apos;s holding you back</li>
            <li>
              Your top <strong>ReadyMoves</strong>
            </li>
          </ul>

          <div>
            <ButtonPill href="/readinesscheck/start" className="mt-6">
              Start your ReadinessCheck
            </ButtonPill>
          </div>
        </div>

        {/* Step 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-2">
            2. Deep ReadinessCheck (optional)
          </h3>
          <p className="text-gray-600 mb-4">
            Connect your bank accounts through our secure Frollo dashboard for
            the most accurate view:
          </p>

          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Your real monthly surplus</li>
            <li>Spending categories</li>
            <li>Subscription drift</li>
            <li>BNPL &amp; repayment conduct</li>
            <li>A more accurate ReadyScore</li>
          </ul>

          <ButtonPill
            href="https://app.frollo.com.au/register?types=consolidated&external_party_key=RUKI001"
            className="mt-6 bg-white text-black border-gray-800 hover:bg-black hover:text-white hover:border-black"
          >
            Create my Frollo Dashboard
          </ButtonPill>

          <p className="text-sm text-gray-500 mt-3">
            Secure, read-only access. You stay in control.
          </p>
        </div>
      </section>

      {/* ---------------------- */}
      {/* SECTION: WHAT YOU GET */}
      {/* ---------------------- */}
      <section className="w-full max-w-5xl mx-auto py-24 px-4 border-t border-gray-200">
        <h2 className="text-3xl font-semibold mb-10">
          Everything you need to understand your borrowing position.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Your ReadyScore</h3>
            <p className="text-gray-600">
              A simple score out of 100 showing how close you are to lender-ready.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">What&apos;s working for you</h3>
            <p className="text-gray-600">
              Strengths like surplus, deposit, equity, and stability.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">What needs attention</h3>
            <p className="text-gray-600">
              Plain-English insights into the areas holding you back.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Your ReadyMoves</h3>
            <p className="text-gray-600">
              Three specific, achievable actions to lift your ReadyScore.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------- */}
      {/* SECTION: REVIEW CALL */}
      {/* ---------------------- */}
      <section className="w-full max-w-3xl mx-auto py-24 px-4 border-t border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">
          Want help understanding your numbers?
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          After you complete a ReadinessCheck — or set up your Frollo dashboard —
          you can book a short session where we walk through your results together
          and outline potential next steps.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <ButtonPill href="/book">Book a Readiness Review</ButtonPill>

          <ButtonPill
            href="/readinesscheck/start"
            className="bg-white text-black border-gray-300 hover:bg-black hover:text-white hover:border-black"
          >
            Do another ReadinessCheck
          </ButtonPill>
        </div>
      </section>

      {/* ---------------------- */}
      {/* SECTION: FAQ */}
      {/* ---------------------- */}
      <section className="w-full max-w-3xl mx-auto py-24 px-4 border-t border-gray-200">
        <h2 className="text-2xl font-semibold mb-8">FAQ</h2>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold mb-1">
              Does ReadinessCheck affect my credit score?
            </h3>
            <p className="text-gray-600">No. We never run credit enquiries.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              Do I have to connect my bank accounts?
            </h3>
            <p className="text-gray-600">
              No. That&apos;s completely optional. The Quick ReadinessCheck still
              gives you meaningful insights.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              How accurate is the Quick ReadyScore?
            </h3>
            <p className="text-gray-600">
              It&apos;s a directional estimate. You&apos;ll get a more precise score
              after using the Deep ReadinessCheck with real data.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Is this financial advice?</h3>
            <p className="text-gray-600">
              No. This is general information and educational content. Always
              consult a qualified financial advisor for personalized advice.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
