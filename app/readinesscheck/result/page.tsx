// app/readinesscheck/result/page.tsx

import { ButtonPill } from "@/components/ButtonPill";
import {
  ReadinessResult,
  ReadyBand,
} from "@/lib/readinessScore";
import { getReadinessCheckById } from "@/lib/airtable";

type ReadinessApiRecord = {
  id: string;
  createdTime: string;
  input: any;
  result: ReadinessResult;
  email?: string | null;
  source?: string | null;
};

function bandLabel(band: ReadyBand): string {
  switch (band) {
    case "not_ready":
      return "Not Ready (yet)";
    case "almost_there":
      return "Almost There";
    case "ready":
      return "Ready";
    case "very_ready":
      return "Very Ready";
    default:
      return "Readiness";
  }
}

function bandDescription(band: ReadyBand): string {
  switch (band) {
    case "not_ready":
      return "There are a few key areas to work on before most lenders are likely to say yes. The upside is that you know exactly what to focus on.";
    case "almost_there":
      return "You're closer than you might think. A few tweaks to debts, surplus or deposit could move you into a comfortable lender-ready zone.";
    case "ready":
      return "You're in a generally strong position. Many lenders are likely to consider you, subject to full assessment and policy checks.";
    case "very_ready":
      return "You're in a very strong position. You're likely to have a wide choice of lenders and products, subject to full assessment.";
    default:
      return "";
  }
}

export const dynamic = "force-dynamic";

export default async function ReadinessCheckResultPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const rawSessionId = searchParams.sessionId;
  const sessionId = Array.isArray(rawSessionId)
    ? rawSessionId[0]
    : rawSessionId;

  if (!sessionId) {
    return (
      <main className="w-full flex flex-col items-center">
        <section className="w-full max-w-3xl mx-auto py-24 px-4 text-center">
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find a recent ReadinessCheck session.
          </p>
          <ButtonPill href="/readinesscheck/start">
            Start a new ReadinessCheck
          </ButtonPill>
        </section>
      </main>
    );
  }

  // Directly read from Airtable via your lib function
  const record = (await getReadinessCheckById(
    sessionId
  )) as ReadinessApiRecord | null;

  if (!record || !record.result) {
    return (
      <main className="w-full flex flex-col items-center">
        <section className="w-full max-w-3xl mx-auto py-24 px-4 text-center">
          <p className="text-gray-600 mb-6">
            We couldn&apos;t load your ReadinessCheck result. Please try again.
          </p>
          <ButtonPill href="/readinesscheck/start">
            Start a new ReadinessCheck
          </ButtonPill>
        </section>
      </main>
    );
  }

  const { score, band, strengths, focusAreas, readyMoves } = record.result;

  return (
    <main className="w-full flex flex-col items-center">
      <section className="w-full max-w-3xl mx-auto py-16 px-4">
        {/* Top summary */}
        <h1 className="text-3xl font-semibold mb-4">
          Your ReadinessCheck results
        </h1>
        <p className="text-gray-600 mb-8">
          Here’s a high-level view of where you stand today, based on the
          details you just shared.
        </p>

        {/* Score card */}
        <div className="flex flex-col sm:flex-row items-center gap-8 mb-12">
          <div className="flex flex-col items-center justify-center">
            <div className="w-40 h-40 rounded-full border-[6px] border-black flex items-center justify-center">
              <span className="text-4xl font-semibold">
                {Math.round(score)}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              ReadyScore / 100
            </p>
          </div>

          <div className="flex-1">
            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
              Overall band
            </p>
            <p className="text-xl font-semibold mb-3">
              {bandLabel(band)}
            </p>
            <p className="text-gray-600">{bandDescription(band)}</p>

            <p className="text-xs text-gray-400 mt-4">
              This is an estimate only. It&apos;s not a credit assessment or
              approval.
            </p>
          </div>
        </div>

        {/* Strengths + focus areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 border rounded-lg">
            <h2 className="text-lg font-semibold mb-3">
              What&apos;s working for you
            </h2>
            {strengths.length ? (
              <ul className="list-disc ml-5 space-y-2 text-gray-600 text-sm">
                {strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">
                You have a reasonably solid base. Keeping debts low and
                repayments on time will help maintain this.
              </p>
            )}
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-lg font-semibold mb-3">
              What needs attention
            </h2>
            {focusAreas.length ? (
              <ul className="list-disc ml-5 space-y-2 text-gray-600 text-sm">
                {focusAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">
                There are no major red flags based on what you&apos;ve shared. A
                lender will still complete a full assessment.
              </p>
            )}
          </div>
        </div>

        {/* ReadyMoves */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-3">
            Your next ReadyMoves
          </h2>
          <p className="text-gray-600 mb-4">
            Here are a few practical steps that are likely to improve your
            ReadyScore over the next few months.
          </p>

          <ol className="list-decimal ml-5 space-y-3 text-gray-700 text-sm">
            {readyMoves.map((move) => (
              <li key={move}>{move}</li>
            ))}
          </ol>

          <p className="text-sm text-gray-500 mt-4">
            You don&apos;t need to do everything at once. Start with the step
            that feels most achievable for you.
          </p>
        </section>

        {/* Deep Check + actions */}
        <section className="border-t border-gray-200 pt-8 mt-8 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Want a more precise ReadyScore?
            </h2>
            <p className="text-gray-600 mb-3">
              For a deeper, data-backed view of your borrowing position, you
              can create a Frollo dashboard using secure Open Banking. We&apos;ll
              use that to understand your real surplus, spending patterns and
              repayment behaviour.
            </p>

            <ButtonPill
              href="https://app.frollo.com.au/register?types=consolidated&external_party_key=RUKI001"
              className="bg-white text-black border-gray-800 hover:bg-black hover:text-white hover:border-black"
            >
              Create my Frollo Dashboard
            </ButtonPill>

            <p className="text-xs text-gray-500 mt-3">
              Open Banking is secure and read-only. You can disconnect any
              time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="max-w-sm text-sm text-gray-500">
              Prefer to talk it through? You can book a short Readiness
              Review and we&apos;ll walk through your situation together.
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <ButtonPill href="/book">Book a Readiness Review</ButtonPill>

              <ButtonPill
                href="/readinesscheck/start"
                className="bg-white text-black border-gray-300 hover:bg-black hover:text-white hover:border-black"
              >
                Do another ReadinessCheck
              </ButtonPill>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
