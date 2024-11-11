import { NextRequest, NextResponse } from "next/server";
import {
  // getNurseryProducts,
  saveProduct,
} from "@/services/db/repositories/productRepository";

// export async function GET() {
//   try {
//     const products = await getNurseryProducts();
//     return NextResponse.json(products);
//   } catch (error) {
//     console.error("Error fetching nursery products:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch products" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, description, pot_size, category, price, image_url } = data;

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
        pot_size,
        category,
        price,
        image_url,
      },
      "nursery"
    );

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("Error adding nursery product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
