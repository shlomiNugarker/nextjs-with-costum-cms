import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import { cwd } from "process";

loadEnvConfig(cwd());

export default defineConfig({
  schema: "./src/services/db/schema.ts",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  out: "./src/services/db/migrations",
  dialect: "postgresql",
});
