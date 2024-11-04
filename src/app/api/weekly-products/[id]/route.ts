import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { weeklyProductsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

// מחיקת מוצר לפי ID (DELETE)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = parseInt(params.id, 10);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
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
