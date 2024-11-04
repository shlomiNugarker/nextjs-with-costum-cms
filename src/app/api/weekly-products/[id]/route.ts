import { NextRequest, NextResponse } from "next/server";
import { weeklyProductsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { connectToDatabase } from "@/lib/db";

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
      .delete(weeklyProductsTable)
      .where(eq(weeklyProductsTable.id, productId));
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting weekly product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
