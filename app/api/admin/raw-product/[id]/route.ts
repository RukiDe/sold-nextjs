// app/api/admin/raw-product/[id]/route.ts
import "server-only";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const db: any = prisma;

  const raw = await db.rawProduct.findUnique({
    where: { id: params.id },
    include: { brand: true }, // optional but handy
  });

  if (!raw) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  // Ensure Dates serialize cleanly
  const out = {
    ...raw,
    fetchedAt: raw.fetchedAt?.toISOString?.() ?? String(raw.fetchedAt),
    createdAt: raw.createdAt?.toISOString?.() ?? undefined,
    updatedAt: raw.updatedAt?.toISOString?.() ?? undefined,
  };

  return NextResponse.json({ ok: true, raw: out });
}
