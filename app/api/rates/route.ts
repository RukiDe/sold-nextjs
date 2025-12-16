// app/api/rates/route.ts
import "server-only";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const brandCode = url.searchParams.get("brand");
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 100), 500);

  // 🔑 Prisma v7 workaround
  const db: any = prisma;

  const products = await db.product.findMany({
    where: {
      isActive: true,
      ...(brandCode ? { brand: { code: brandCode } } : {}),
    },
    include: {
      brand: true,
      rates: {
        where: { effectiveTo: null },
        orderBy: { annualRate: "asc" },
      },
    },
    take: limit,
    orderBy: { updatedAt: "desc" },
  });

  // Serialize dates safely
  const out = products.map((p: any) => ({
    ...p,
    createdAt: p.createdAt?.toISOString?.(),
    updatedAt: p.updatedAt?.toISOString?.(),
    rates: p.rates.map((r: any) => ({
      ...r,
      effectiveFrom: r.effectiveFrom?.toISOString?.(),
      effectiveTo: r.effectiveTo?.toISOString?.() ?? null,
    })),
  }));

  return NextResponse.json({
    ok: true,
    count: out.length,
    products: out,
  });
}
