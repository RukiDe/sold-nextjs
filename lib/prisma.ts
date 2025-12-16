// lib/prisma.ts
import "server-only";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

function makePrisma() {
  const accelerateUrl = process.env.PRISMA_ACCELERATE_URL;

  if (!accelerateUrl) {
    throw new Error(
      "Missing PRISMA_ACCELERATE_URL. Set it in .env/.env.local and in Vercel env vars."
    );
  }

  return new PrismaClient({
    log: ["warn", "error"],
    accelerateUrl, // ✅ REQUIRED for engine type "client"
  }).$extends(withAccelerate());
}

type PrismaExtendedClient = ReturnType<typeof makePrisma>;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaExtendedClient;
};

export const prisma: PrismaExtendedClient =
  globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
