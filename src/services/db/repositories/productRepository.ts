import {
  nurseryProductsTable,
  weeklyProductsTable,
} from "@/services/db/schema";
import { connectToDatabase } from "../../../config/database.config";
import { eq } from "drizzle-orm";

export async function saveProduct(
  product: {
    id?: number;
    name: string;
    description: string;
    category: string;
    pot_size?: string;
    weight?: string;
    price: number;
    image_url: string;
  },
  tableType: "nursery" | "weekly"
) {
  const table =
    tableType === "nursery" ? nurseryProductsTable : weeklyProductsTable;

  try {
    if (product.id) {
      const db = await connectToDatabase();
      const updatedProduct = await db
        .update(table)
        .set({
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          image_url: product.image_url,
          ...(tableType === "nursery" && { pot_size: product.pot_size }),
          ...(tableType === "weekly" && { weight: product.weight }),
        })
        .where(eq(table.id, product.id))
        .returning();
      return updatedProduct[0];
    } else {
      const db = await connectToDatabase();
      const newProduct = await db
        .insert(table)
        .values({
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          image_url: product.image_url,
          ...(tableType === "nursery" && { pot_size: product.pot_size }),
          ...(tableType === "weekly" && { weight: product.weight }),
        })
        .returning();
      return newProduct[0];
    }
  } catch (error) {
    console.error("Error saving product:", error);
    throw new Error("Unable to save product");
  }
}

export async function getProductById(
  id: number,
  tableType: "nursery" | "weekly"
) {
  try {
    const table =
      tableType === "nursery" ? nurseryProductsTable : weeklyProductsTable;

    const db = await connectToDatabase();

    const product = await db
      .select()
      .from(table)
      .where(eq(table.id, id))
      .limit(1);
    return product.length > 0 ? product[0] : null;
  } catch (error) {
    console.error(
      `Error fetching product with ID ${id} from ${tableType} table:`,
      error
    );
    return null;
  }
}

export async function getWeeklyProducts() {
  try {
    const db = await connectToDatabase();
    const products = await db.select().from(weeklyProductsTable);
    return products;
  } catch (error) {
    console.error("Error fetching weekly products:", error);
    return [];
  }
}

export async function getNurseryProducts() {
  try {
    const db = await connectToDatabase();
    const products = await db.select().from(nurseryProductsTable);
    return products;
  } catch (error) {
    console.error("Error fetching nursery products:", error);
    return [];
  }
}
