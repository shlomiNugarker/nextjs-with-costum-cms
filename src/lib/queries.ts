import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { nurseryProductsTable, weeklyProductsTable } from "./schema";

const client = postgres(process.env.POSTGRES_URL || "");
const db = drizzle(client);

export async function getWeeklyProducts() {
  try {
    const products = await db.select().from(weeklyProductsTable);
    return products;
  } catch (error) {
    console.error("Error fetching weekly products:", error);
    return [];
  }
}

export async function getNurseryProducts() {
  try {
    const products = await db.select().from(nurseryProductsTable);
    return products;
  } catch (error) {
    console.error("Error fetching nursery products:", error);
    return [];
  }
}
