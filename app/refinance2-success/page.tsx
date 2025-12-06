import { ButtonPill } from "@/components/ButtonPill";
import SavingsPreviewClient from "@/components/SavingsPreviewClient";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Refinance2SuccessPage({ searchParams }: Props) {
  const emailParam = searchParams.email;

  const rawEmail =
    typeof emailParam === "string"
      ? emailParam
      : Array.isArray(emailParam)
      ? emailParam[0]
      : null;

  const email = rawEmail ? decodeURIComponent(rawEmail) : null;

  return (
    <div className="min-h-[70vh] flex flex-col">
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0B0F1B] mb-8">
            Thank you ✨
          </h1>

       {/* 🔍 Savings preview based on their fact find (Airtable + qualifier) */}
          <SavingsPreviewClient email={email} />
      
        </div>
      </main>
    </div>
  );
}
