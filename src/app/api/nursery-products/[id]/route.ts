import { NextRequest, NextResponse } from "next/server";
import { nurseryProductsTable } from "@/services/db/schema";
import { eq } from "drizzle-orm";
import { connectToDatabase } from "@/config/database.config";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = parseInt(params.id, 10);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();

    await db
      .delete(nurseryProductsTable)
      .where(eq(nurseryProductsTable.id, productId));
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
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
