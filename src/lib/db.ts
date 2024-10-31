import postgres from "postgres";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

let client: postgres.Sql;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let db: PostgresJsDatabase<Record<string, unknown>>;

export async function initialize() {
  try {
    await connectToDatabase();
    ensureAllTablesExists();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

async function connectToDatabase() {
  try {
    client = postgres(`${process.env.POSTGRES_URL!}?sslmode=disable`);
    db = drizzle(client);
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw new Error("Unable to connect to the database");
  }
}

async function ensureAllTablesExists() {
  await ensureUsersTableExists();
}

async function ensureUsersTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'users'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "users" (
        id SERIAL PRIMARY KEY,
        username VARCHAR(64) NOT NULL,
        email VARCHAR(64) NOT NULL UNIQUE,
        password VARCHAR(64) NOT NULL,
        profile_image_url TEXT, 
        created_at TIMESTAMP DEFAULT NOW()  
      );`;
  }

  const table = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 64 }).notNull(),
    email: varchar("email", { length: 64 }).notNull().unique(),
    password: varchar("password", { length: 64 }).notNull(),
    profile_image_url: varchar("profile_image_url"),
    created_at: varchar("created_at", { length: 64 }).default("now()"),
  });

  return table;
}
