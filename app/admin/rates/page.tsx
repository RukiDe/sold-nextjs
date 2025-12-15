import { prisma } from "@/lib/prisma";

export default async function RatesPage() {
  const liveRates = await prisma.productRate.findMany({
    where: { effectiveTo: null },
    include: {
      product: {
        include: {
          brand: true,
        },
      },
    },
    orderBy: { annualRate: "asc" },
    take: 200,
  });

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
            {liveRates.map((r) => {
              const p = r.product;
              const brand = p.brand;

              const purpose = p.purpose?.split(",").join(" / ");
              const owners = p.ownerTypes?.split(",").join(" / ");
              const repay = p.repaymentTypes?.split(",").join(" / ");

              return (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="font-medium">{brand?.code}</div>
                    <div className="text-xs text-gray-500">
                      {brand?.name}
                    </div>
                  </td>
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2">{p.channel}</td>
                  <td className="px-3 py-2">{purpose}</td>
                  <td className="px-3 py-2">{owners}</td>
                  <td className="px-3 py-2">{repay}</td>
                  <td className="px-3 py-2 text-right">
                    {(r.lvrMax * 100).toFixed(0)}%
                  </td>
                  <td className="px-3 py-2">{r.rateType}</td>
                  <td className="px-3 py-2 text-right">
                    {(r.annualRate * 100).toFixed(2)}%
                  </td>
                  <td className="px-3 py-2 text-right">
                    {r.comparisonRate != null
                      ? (r.comparisonRate * 100).toFixed(2) + "%"
                      : "—"}
                  </td>
                  <td className="px-3 py-2 text-right">
                    {r.fixedTermMonths ?? "—"}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-500 whitespace-nowrap">
                    {new Date(r.effectiveFrom).toLocaleString()}
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
