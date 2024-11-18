import postgres from "postgres";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";

export let client: postgres.Sql | undefined;
let db: PostgresJsDatabase<Record<string, unknown>> | undefined;

export async function connectToDatabase(): Promise<
  PostgresJsDatabase<Record<string, unknown>>
> {
  try {
    if (db) {
      console.log("Reusing existing database connection.");
      return db;
    }

    client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
    db = drizzle(client);

    console.log("Connected to the database.");
    return db;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw new Error("Unable to connect to the database.");
  }
}

export async function getClient(): Promise<postgres.Sql> {
  if (!client) {
    await connectToDatabase();
  }
  if (!client) {
    throw new Error("Failed to initialize PostgreSQL client.");
  }
  return client;
}
