// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },

  // Prisma 7: connection URLs live here for the CLI
  datasource: {
    url: env("DIRECT_DATABASE_URL"),
  },
});
