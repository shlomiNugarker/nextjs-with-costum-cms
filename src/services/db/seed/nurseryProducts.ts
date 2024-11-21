"use server";

import { getClient } from "@/config/database.config";

export async function seedInitialNurseryProducts() {
  const initialProducts = [
    {
      name: "רוזמרין",
      description: "צמח תבלין ארומטי, אידיאלי לתיבול מנות בשר, מרקים וסלטים.",
      pot_size: "15 ס״מ",
      category: "תבלינים",
      price: 15,
      image_url:
        "https://images.unsplash.com/photo-1523738914649-b0d2753887a1?q=80&w=1030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const client = await getClient();

  const insertPromises = initialProducts.map((product) =>
    client
      ? client`
          INSERT INTO nursery_products (name, description, category, pot_size, price, image_url)
          VALUES (${product.name}, ${product.description}, ${product.category}, ${product.pot_size}, ${product.price}, ${product.image_url});`
      : null
  );

  await Promise.all(insertPromises);

  console.log("Initial products added to nursery_products table.");
}
