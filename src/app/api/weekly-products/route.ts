import { NextRequest, NextResponse } from "next/server";
import { weeklyProductsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    const db = await connectToDatabase();

    const products = await db.select().from(weeklyProductsTable);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching weekly products:", error);
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
    const { name, description, weight, category, price, image_url } = data;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    const newProduct = await db
      .insert(weeklyProductsTable)
      .values({
        name,
        description,
        weight,
        category,
        price,
        image_url,
      })
      .returning();

    return NextResponse.json(newProduct[0]);
  } catch (error) {
    console.error("Error adding weekly product:", error);
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
    const { id, name, description, weight, category, price, image_url } = data;

    if (!id || !name || !price) {
      return NextResponse.json(
        { error: "ID, name, and price are required" },
        { status: 400 }
      );
    }

    const updatedProduct = await db
      .update(weeklyProductsTable)
      .set({
        name,
        description,
        weight,
        category,
        price,
        image_url,
      })
      .where(eq(weeklyProductsTable.id, id))
      .returning();

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    console.error("Error updating weekly product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
