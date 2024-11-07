import postgres from "postgres";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { ensureBlogsTableExists } from "./seed/blogs";
import { ensureContentBlocksTableExists } from "./seed/contentBlocks";
import { ensureNurseryProductsTableExists } from "./seed/nurseryProducts";
import { ensurePagesTableExists } from "./seed/pages";
import { ensureUsersTableExists } from "./seed/users";
import { ensureWeeklyProductsTableExists } from "./seed/weeklyProducts";

export let client: postgres.Sql;
let db: PostgresJsDatabase<Record<string, unknown>>;

export async function initialize() {
  try {
    console.log("Initializing database...");
    await connectToDatabase();
    await ensureAllTablesExists();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

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
}
