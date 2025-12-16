// app/admin/rates/page.tsx
import "server-only";
import { headers } from "next/headers";

type RateRow = {
  id: string;
  lvrMax: number;
  rateType: string;
  annualRate: number;
  comparisonRate: number | null;
  fixedTermMonths: number | null;
  revertAnnualRate: number | null;
  effectiveFrom: string;
  product: {
    id: string;
    name: string;
    channel: string;
    purpose: string;
    ownerTypes: string;
    repaymentTypes: string;
    brand: { code: string; name: string } | null;
  };
};

function getBaseUrlFromHeaders(h: Headers): string {
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

async function getRates(): Promise<RateRow[]> {
  const h = await headers();
  const baseUrl = getBaseUrlFromHeaders(h);

  const res = await fetch(`${baseUrl}/api/rates?limit=200`, { cache: "no-store" });

  if (!res.ok) throw new Error(`Failed to load rates: ${res.status} ${res.statusText}`);

  const data = (await res.json()) as { rates: RateRow[] } | RateRow[];
  return Array.isArray(data) ? data : data.rates;
}

export default async function RatesPage() {
  const liveRates: RateRow[] = await getRates();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Live product rates</h1>
      <p className="text-sm text-gray-500 mb-6">
        Showing {liveRates.length} current rate tiers (effectiveTo = null).
      </p>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Channel</th>
              <th className="px-3 py-2">Purpose</th>
              <th className="px-3 py-2">Owner</th>
              <th className="px-3 py-2">Repay</th>
              <th className="px-3 py-2 text-right">LVR max</th>
              <th className="px-3 py-2">Rate type</th>
              <th className="px-3 py-2 text-right">Annual rate</th>
              <th className="px-3 py-2 text-right">Comp. rate</th>
              <th className="px-3 py-2 text-right">Fixed term</th>
              <th className="px-3 py-2">Effective from</th>
            </tr>
          </thead>

          <tbody>
            {liveRates.map((r: RateRow) => {
              const p = r.product;
              const brand = p.brand;

              const purpose = p.purpose?.split(",").join(" / ");
              const owners = p.ownerTypes?.split(",").join(" / ");
              const repay = p.repaymentTypes?.split(",").join(" / ");

              return (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="font-medium">{brand?.code ?? "—"}</div>
                    <div className="text-xs text-gray-500">{brand?.name ?? ""}</div>
                  </td>
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2">{p.channel}</td>
                  <td className="px-3 py-2">{purpose}</td>
                  <td className="px-3 py-2">{owners}</td>
                  <td className="px-3 py-2">{repay}</td>
                  <td className="px-3 py-2 text-right">{(r.lvrMax * 100).toFixed(0)}%</td>
                  <td className="px-3 py-2">{r.rateType}</td>

                  {/* NOTE: r.annualRate is already a percent in your DB (e.g. 5.43), so don't *100 */}
                  <td className="px-3 py-2 text-right">{Number(r.annualRate).toFixed(2)}%</td>

                  <td className="px-3 py-2 text-right">
                    {r.comparisonRate != null ? Number(r.comparisonRate).toFixed(2) + "%" : "—"}
                  </td>

                  <td className="px-3 py-2 text-right">{r.fixedTermMonths ?? "—"}</td>

                  <td className="px-3 py-2 text-xs text-gray-500 whitespace-nowrap">
                    {new Date(r.effectiveFrom).toLocaleString("en-AU")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
