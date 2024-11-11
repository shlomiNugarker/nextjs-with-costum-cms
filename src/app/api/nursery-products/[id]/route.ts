import { NextRequest, NextResponse } from "next/server";
import {
  deleteProductById,
  saveProduct,
} from "@/services/db/repositories/productRepository";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = parseInt(params.id, 10);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    await deleteProductById(productId, "nursery");

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
    const data = await request.json();
    const { id, name, description, pot_size, category, price, image_url } =
      data;

    if (!id || !name || !price) {
      return NextResponse.json(
        { error: "ID, name, and price are required" },
        { status: 400 }
      );
    }

    const updatedProduct = await saveProduct(
      {
        id,
        name,
        description,
        pot_size,
        category,
        price,
        image_url,
      },
      "nursery"
    );

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating nursery product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
