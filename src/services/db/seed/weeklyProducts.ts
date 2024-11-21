"use server";

import { getClient } from "../../../config/database.config";

export async function seedInitialWeeklyProducts() {
  const initialProducts = [
    {
      name: "מיקס עלי בטטה סגולה, אמרנט, תרד הודי אדום, ריג'לה ותרד ניו זילנדי",
      description: "מיקס עלים אידאלי לאידוי או להקפצה",
      weight: "350 גרם",
      category: "עלי ירק",
      price: "25",
      image_url:
        "https://images.unsplash.com/photo-1495758874721-e9da827a0581?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const client = await getClient();

  const insertPromises = initialProducts.map((product) =>
    client
      ? client`
          INSERT INTO weekly_products (name, description, weight, category, price, image_url)
          VALUES (${product.name}, ${product.description}, ${product.weight}, ${product.category}, ${product.price}, ${product.image_url});`
      : null
  );

  await Promise.all(insertPromises);

  console.log("Initial products added to weekly_products table.");
}
