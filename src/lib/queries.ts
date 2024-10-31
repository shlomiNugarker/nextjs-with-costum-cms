import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { weeklyProductsTable } from "./schema";

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
