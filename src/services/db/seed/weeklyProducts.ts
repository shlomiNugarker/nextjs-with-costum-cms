"use server";

import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { getClient } from "../../../config/database.config";

export async function ensureWeeklyProductsTableExists() {
  const client = await getClient();

  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'weekly_products'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "weekly_products" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        weight VARCHAR(50),
        category VARCHAR(50),
        price INTEGER NOT NULL,
        image_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()    
        );
    `;

    console.log("Created weekly_products table, seeding initial products...");
    await seedInitialWeeklyProducts();
  }

  const produceTable = pgTable("weekly_products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    weight: varchar("weight", { length: 50 }),
    category: varchar("category", { length: 50 }),
    price: integer("price").notNull(),
    image_url: text("image_url"),
  });

  return produceTable;
}

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
