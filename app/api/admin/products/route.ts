// app/api/admin/products/route.ts
import "server-only";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Cast prisma to avoid Prisma v7 overload typing weirdness in TS checks
  const db: any = prisma;

  const products = await db.product.findMany({
    where: { isActive: true },
    include: {
      brand: true,
      rates: {
        where: { effectiveTo: null },
        orderBy: { annualRate: "asc" },
        take: 3,
      },
    },
    orderBy: { updatedAt: "desc" },
    take: 300,
  });

  // Serialize Dates for JSON
  const out = products.map((p: any) => ({
    ...p,
    updatedAt: p.updatedAt?.toISOString?.() ?? String(p.updatedAt),
    createdAt: p.createdAt?.toISOString?.() ?? String(p.createdAt),
    rates: (p.rates ?? []).map((r: any) => ({
      ...r,
      effectiveFrom: r.effectiveFrom?.toISOString?.() ?? String(r.effectiveFrom),
      effectiveTo: r.effectiveTo ? (r.effectiveTo?.toISOString?.() ?? String(r.effectiveTo)) : null,
    })),
  }));

  return NextResponse.json(out);
}
