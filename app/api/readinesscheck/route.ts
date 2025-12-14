// app/api/readinesscheck/route.ts

import { NextResponse } from "next/server";
import { computeReadinessScore, ReadinessInput } from "@/lib/readinessScore";
import { createReadinessCheckRecord } from "@/lib/airtable";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const input: ReadinessInput = {
      goal: body.goal,
      householdIncome: Number(body.householdIncome),
      employmentType: body.employmentType,
      housingStatus: body.housingStatus,
      rentWeekly: body.housingStatus === "renting" ? Number(body.rentWeekly ?? 0) : null,
      loanBalance: body.housingStatus === "own_home" ? Number(body.loanBalance ?? 0) : null,
      loanRepaymentMonthly:
        body.housingStatus === "own_home"
          ? Number(body.loanRepaymentMonthly ?? 0)
          : null,
      creditCardLimits: Number(body.creditCardLimits ?? 0),
      personalLoanRepayments: Number(body.personalLoanRepayments ?? 0),
      hasHecs: Boolean(body.hasHecs),
      expenseBand: body.expenseBand,
    };

    const result = computeReadinessScore(input);

    const record = await createReadinessCheckRecord({
      ...input,
      ...result,
      email: body.email ?? null,
      source: body.source ?? "readiness_v1_web",
    });

    if (!record) {
      return NextResponse.json(
        { error: "Airtable write failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: record.id,
      score: result.score,
      band: result.band,
    });
  } catch (err) {
    console.error("POST /api/readinesscheck error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
