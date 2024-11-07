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
