import { NextRequest, NextResponse } from "next/server";
import { nurseryProductsTable } from "@/services/db/schema";
import { eq } from "drizzle-orm";
import { connectToDatabase } from "@/config/database.config";

export async function GET() {
  try {
    const db = await connectToDatabase();

    const products = await db.select().from(nurseryProductsTable);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching nursery products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await connectToDatabase();

    const data = await request.json();
    const { name, description, pot_size, category, price, image_url } = data;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    const newProduct = await db
      .insert(nurseryProductsTable)
      .values({
        name,
        description,
        pot_size,
        category,
        price,
        image_url,
      })
      .returning();

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("Error adding nursery product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const db = await connectToDatabase();

    const data = await request.json();
    const { id, name, description, pot_size, category, price, image_url } =
      data;

    if (!id || !name || !price) {
      return NextResponse.json(
        { error: "ID, name, and price are required" },
        { status: 400 }
      );
    }

    const updatedProduct = await db
      .update(nurseryProductsTable)
      .set({
        name,
        description,
        pot_size,
        category,
        price,
        image_url,
      })
      .where(eq(nurseryProductsTable.id, id))
      .returning();

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating nursery product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
