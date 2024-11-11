import { NextRequest, NextResponse } from "next/server";

import {
  // getWeeklyProducts,
  saveProduct,
} from "@/services/db/repositories/productRepository";

// export async function GET() {
//   try {
//     const products = await getWeeklyProducts();
//     return NextResponse.json(products);
//   } catch (error) {
//     console.error("Error fetching weekly products:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch products" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, description, weight, category, price, image_url } = data;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }
    const newProduct = await saveProduct(
      {
        name,
        description,
        weight,
        category,
        price,
        image_url,
      },
      "weekly"
    );

    return NextResponse.json(newProduct);
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
    const data = await request.json();
    const { id, name, description, weight, category, price, image_url } = data;

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
        weight,
        category,
        price,
        image_url,
      },
      "weekly"
    );

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating weekly product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
