import postgres from "postgres";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

let client: postgres.Sql;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let db: PostgresJsDatabase<Record<string, unknown>>;

export async function initialize() {
  try {
    console.log("init");

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
  await ensureWeeklyProductsTableExists();
  await ensureNurseryProductsTableExists();
}

async function ensureNurseryProductsTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'nursery_products'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "nursery_products" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        category VARCHAR(50),
        pot_size VARCHAR(50),
        price INTEGER NOT NULL,
        image_url TEXT
      );`;
  }

  const nurseryProductsTable = pgTable("nursery_products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    category: varchar("category", { length: 50 }),
    pot_size: varchar("pot_size", { length: 50 }),
    price: integer("price").notNull(),
    image_url: text("image_url"),
  });

  return nurseryProductsTable;
}

async function ensureWeeklyProductsTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'weekly_products'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "weekly_products" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        weight VARCHAR(50),
        category VARCHAR(50),
        price INTEGER NOT NULL,
        image_url TEXT
      );`;
  }

  const produceTable = pgTable("weekly_products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    weight: varchar("weight", { length: 50 }),
    category: varchar("category", { length: 50 }),
    price: integer("price").notNull(),
    image_url: text("image_url"),
  });

  return produceTable;
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
