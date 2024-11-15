import postgres from "postgres";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { ensureBlogsTableExists } from "../services/db/seed/blogs";
import { ensureContentBlocksTableExists } from "../services/db/seed/contentBlocks";
import { ensureNurseryProductsTableExists } from "../services/db/seed/nurseryProducts";
import { ensurePagesTableExists } from "../services/db/seed/pages";
import { ensureUsersTableExists } from "../services/db/seed/users";
import { ensureWeeklyProductsTableExists } from "../services/db/seed/weeklyProducts";
import { ensureSiteInfoTableExists } from "@/services/db/seed/siteInfo";
import { ensureContactMessagesTableExists } from "@/services/db/seed/contactMessages";

export let client: postgres.Sql;
let db: PostgresJsDatabase<Record<string, unknown>>;

export async function connectToDatabase() {
  try {
    if (db) return db;
    client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
    db = drizzle(client);
    console.log("Connected to the database.");
    return db;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw new Error("Unable to connect to the database");
  }
}

export async function getClient() {
  if (!client) {
    await connectToDatabase();
    return client;
  }
  return client;
}

export async function ensureAllTablesExists() {
  await ensureUsersTableExists();
  await ensureWeeklyProductsTableExists();
  await ensureNurseryProductsTableExists();
  await ensureBlogsTableExists();
  await ensurePagesTableExists();
  await ensureContentBlocksTableExists();
  await ensureSiteInfoTableExists();
  await ensureContactMessagesTableExists();
}
