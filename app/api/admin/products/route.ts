// app/api/admin/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      brand: true,
      rates: {
        where: { effectiveTo: null },
        orderBy: { annualRate: "asc" },
        take: 5,
      },
    },
    orderBy: { updatedAt: "desc" },
    take: 500,
  });

  return NextResponse.json({
    count: products.length,
    products: products.map((p) => ({
      id: p.id,
      brand: p.brand?.name ?? "—",
      brandCode: p.brand?.code ?? "—",
      externalId: p.externalId,
      name: p.name,
      channel: p.channel,
      purpose: p.purpose,
      ownerTypes: p.ownerTypes,
      repaymentTypes: p.repaymentTypes,
      liveRates: p.rates.map((r) => ({
        rateType: r.rateType,
        annualRate: r.annualRate,
        fixedTermMonths: r.fixedTermMonths,
        lvrMax: r.lvrMax,
      })),
      updatedAt: p.updatedAt,
    })),
  });
}
