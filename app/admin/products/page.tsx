// app/admin/products/page.tsx
import "server-only";
import { headers } from "next/headers";

type ProductRow = {
  id: string;
  name: string;
  externalId: string;
  channel: string;
  purpose: string;
  updatedAt: string;
  brand: { code: string; name: string } | null;
  rates: Array<{
    id: string;
    lvrMax: number;
    rateType: string;
    annualRate: number;
    comparisonRate: number | null;
    fixedTermMonths: number | null;
    revertAnnualRate: number | null;
  }>;
};

async function getProducts(): Promise<ProductRow[]> {
  const h = headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${proto}://${host}/api/admin/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load products: ${res.status}`);
  }

  return (await res.json()) as ProductRow[];
}

export default async function ProductsAdminPage() {
  const products: ProductRow[] = await getProducts();

  return (
    <main style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
        Products
      </h1>

      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        Showing {products.length} active products (latest live tiers).
      </p>

      <div
        style={{
          overflowX: "auto",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
          }}
        >
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {[
                "Brand",
                "Product",
                "External ID",
                "Top tiers (live)",
                "Updated",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    borderBottom: "1px solid #e5e7eb",
                    fontWeight: 700,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map((p: ProductRow) => (
              <tr key={p.id}>
                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  {p.brand?.name ?? "—"}
                </td>

                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                  <div style={{ color: "#6b7280", fontSize: 12 }}>
                    {p.channel} • {p.purpose}
                  </div>
                </td>

                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  {p.externalId}
                </td>

                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  {p.rates.length ? (
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {p.rates.map((r) => (
                        <li key={r.id}>
                          {r.rateType}{" "}
                          <strong>{r.annualRate.toFixed(2)}%</strong>
                          {r.fixedTermMonths
                            ? ` • ${r.fixedTermMonths}m`
                            : ""}
                          {r.lvrMax
                            ? ` • LVR≤${Math.round(r.lvrMax * 100)}%`
                            : ""}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span style={{ color: "#6b7280" }}>
                      No tiers parsed yet
                    </span>
                  )}
                </td>

                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  {new Date(p.updatedAt).toLocaleString("en-AU")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 16, fontSize: 13 }}>
        Tip: run{" "}
        <code
          style={{
            background: "#f3f4f6",
            padding: "2px 6px",
            borderRadius: 6,
          }}
        >
          /api/admin/run-rates?force=1
        </code>{" "}
        to re-fetch PRDs.
      </div>
    </main>
  );
}
