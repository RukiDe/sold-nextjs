import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const raw = await prisma.rawProduct.findUnique({
    where: { productId: params.id },
  });

  return Response.json(raw ?? { error: "Not found" });
}
