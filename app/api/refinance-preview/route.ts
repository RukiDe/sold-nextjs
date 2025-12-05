import { NextResponse } from "next/server";
import { baseScenarios } from "@/lib/rateOptions";
import { buildScenarioResults, type LoanInput } from "@/lib/loanCalculator";
import { getRefinanceFactFindByEmail } from "@/lib/airtable";

type ApiError = { error: string };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body?.email || "").toString().trim().toLowerCase();

    if (!email) {
      return NextResponse.json<ApiError>(
        { error: "Missing email" },
        { status: 400 }
      );
    }

    const factFind = await getRefinanceFactFindByEmail(email);
    if (!factFind) {
      return NextResponse.json<ApiError>(
        { error: "Fact find not found for this email" },
        { status: 404 }
      );
    }

    const loanInput: LoanInput = {
      currentBalance: factFind.currentLoanBalance,
      currentRate: factFind.currentInterestRatePercent,
      remainingYears: factFind.remainingTermYears,
    };

    const options = buildScenarioResults(loanInput, baseScenarios);

    return NextResponse.json(
      { email, loanInput, options },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in /api/refinance-preview", err);
    return NextResponse.json<ApiError>(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
