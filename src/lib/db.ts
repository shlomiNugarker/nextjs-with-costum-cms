import postgres from "postgres";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

let client: postgres.Sql;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let db: PostgresJsDatabase<Record<string, unknown>>;

export async function initialize() {
  try {
    console.log("init");

    await connectToDatabase();
    ensureAllTablesExists();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

async function connectToDatabase() {
  try {
    client = postgres(`${process.env.POSTGRES_URL!}?sslmode=disable`);
    db = drizzle(client);
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw new Error("Unable to connect to the database");
  }
}

async function ensureAllTablesExists() {
  await ensureUsersTableExists();
  await ensureWeeklyProductsTableExists();
  await ensureNurseryProductsTableExists();
}

async function ensureNurseryProductsTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'nursery_products'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "nursery_products" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        category VARCHAR(50),
        pot_size VARCHAR(50),
        price INTEGER NOT NULL,
        image_url TEXT
      );`;
  }

  const nurseryProductsTable = pgTable("nursery_products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    category: varchar("category", { length: 50 }),
    pot_size: varchar("pot_size", { length: 50 }),
    price: integer("price").notNull(),
    image_url: text("image_url"),
  });

  return nurseryProductsTable;
}

async function ensureWeeklyProductsTableExists() {
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
        image_url TEXT
      );`;

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

async function seedInitialWeeklyProducts() {
  const initialProducts = [
    {
      name: "תפוחי עץ",
      description: "תפוחי עץ אורגניים טריים ופריכים.",
      weight: '1 ק"ג',
      category: "פירות",
      price: "15",
      image_url: "https://example.com/apple.jpg",
    },
    {
      name: "מיקס עלי בטטה סגולה, אמרנט, תרד הודי אדום, ריג'לה ותרד ניו זילנדי",
      description: "מיקס עלים אידאלי לאידוי או להקפצה",
      weight: "350 גרם",
      category: "עלי ירק",
      price: "25",
      image_url:
        "https://images.unsplash.com/photo-1495758874721-e9da827a0581?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "רוקט",
      description: "עלים טריים ורעננים בשקית",
      weight: "120 גרם",
      category: "עלי ירק",
      price: "12",
      image_url:
        "https://images.unsplash.com/photo-1534940519139-f860fb3c6e38?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "צרור קייל",
      description: "עלים ירוקים ובריאים",
      weight: "100 גרם",
      category: "עלי ירק",
      price: "10",
      image_url:
        "https://plus.unsplash.com/premium_photo-1702313776770-e6f6fb5163bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "3 צרורות תבלין לבחירה",
      description:
        "מבחר תבלינים לבחירה: נענע, מרווה, אורגנו, זעתר, מלוח קיפח, רוזמרין, בזיליקום מתוק, תאילנדי או לימוני",
      weight: "צרור אחד לכל תבלין",
      category: "תבלינים",
      price: "15",
      image_url:
        "https://images.unsplash.com/photo-1486548730767-5c679e8eda6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "צרור מורינגה",
      description: "עלים עשירים בערכים תזונתיים, טריים ומזינים",
      weight: "120 גרם",
      category: "עלי ירק",
      price: "20",
      image_url:
        "https://images.unsplash.com/photo-1667928729816-0ed8c59cd3c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "כורכום טרי",
      description: "שורש כורכום טרי ואיכותי, מתאים לתיבול ולשימושים בריאותיים",
      weight: "כ-200 גרם",
      category: "שורשים",
      price: "18",
      image_url:
        "https://images.unsplash.com/photo-1666818398897-381dd5eb9139?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "גולדן ברי",
      description: "פרי מתוק ועסיסי, עשיר בויטמינים ונוגדי חמצון",
      weight: "כ-120 גרם",
      category: "פירות",
      price: "22",
      image_url:
        "https://recipe-cpsa.com/wp-content/uploads/2022/12/Dizajn-bez-naslova-49.png",
    },
  ];

  const insertPromises = initialProducts.map(
    (product) =>
      client`
        INSERT INTO weekly_products (name, description, weight, category, price, image_url) 
        VALUES (${product.name}, ${product.description}, ${product.weight}, ${product.category}, ${product.price}, ${product.image_url});`
  );

  await Promise.all(insertPromises);

  console.log("Initial products added to weekly_products table.");
}

async function ensureUsersTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'users'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "users" (
        id SERIAL PRIMARY KEY,
        username VARCHAR(64) NOT NULL,
        email VARCHAR(64) NOT NULL UNIQUE,
        password VARCHAR(64) NOT NULL,
        profile_image_url TEXT, 
        created_at TIMESTAMP DEFAULT NOW()  
      );`;
  }

  const table = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 64 }).notNull(),
    email: varchar("email", { length: 64 }).notNull().unique(),
    password: varchar("password", { length: 64 }).notNull(),
    profile_image_url: varchar("profile_image_url"),
    created_at: varchar("created_at", { length: 64 }).default("now()"),
  });

  return table;
}
