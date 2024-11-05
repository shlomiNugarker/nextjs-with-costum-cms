import postgres from "postgres";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import { genSaltSync, hashSync } from "bcrypt-ts";

export let client: postgres.Sql;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let db: PostgresJsDatabase<Record<string, unknown>>;

export async function initialize() {
  try {
    console.log("Initializing database...");
    await connectToDatabase();
    // await ensureAllTablesExists();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

export async function connectToDatabase() {
  try {
    if (db) return db;
    client = postgres(`${process.env.POSTGRES_URL!}?sslmode=disable`);
    db = drizzle(client);
    console.log("Connected to the database.");
    return db;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw new Error("Unable to connect to the database");
  }
}

// async function ensureAllTablesExists() {
//   await ensureUsersTableExists();
//   await ensureWeeklyProductsTableExists();
//   await ensureNurseryProductsTableExists();
// }

// Nursery Products:

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
        image_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()     
        );
        `;

    console.log("Created nursery_products table, seeding initial products...");
    await seedInitialNurseryProducts();
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

async function seedInitialNurseryProducts() {
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

// WeeklyProducts:

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

async function seedInitialWeeklyProducts() {
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

// Users:

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
        role VARCHAR(20) DEFAULT 'User', 
        created_at TIMESTAMP DEFAULT NOW()  
      );`;

    console.log("Created users table, seeding initial users...");

    await seedInitialUsers();
  }

  const table = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 64 }).notNull(),
    email: varchar("email", { length: 64 }).notNull().unique(),
    password: varchar("password", { length: 64 }).notNull(),
    profile_image_url: varchar("profile_image_url"),
    role: varchar("role", { length: 20 }).default("User"),
    created_at: varchar("created_at", { length: 64 }).default("now()"),
  });

  return table;
}

async function seedInitialUsers() {
  const initialUsers = [
    {
      username: "Israel Israeli",
      email: "israel@example.com",
      password: "password123",
      profile_image_url: "https://example.com/profile1.jpg",
    },
    {
      username: "Jane Doe",
      email: "jane.doe@example.com",
      password: "securepassword",
      profile_image_url: "https://example.com/profile2.jpg",
    },
    {
      username: "John Smith",
      email: "john.smith@example.com",
      password: "mypassword",
      profile_image_url: "https://example.com/profile3.jpg",
    },
  ];

  const insertPromises = initialUsers.map((user) =>
    client
      ? client`
      INSERT INTO users (username, email, password, profile_image_url)
      VALUES (${user.username}, ${user.email}, ${user.password}, ${user.profile_image_url});`
      : null
  );

  await Promise.all(insertPromises);

  console.log("Initial users added to users table.");
}

export async function getUser(email: string) {
  try {
    const users = await ensureUsersTableExists();
    return await db.select().from(users).where(eq(users.email, email));
  } catch (error) {
    console.error("Error getting user:", error);
  }
}

export async function createUser(
  email: string,
  password: string,
  username: string,
  profile_image_url: string = "https://example.com"
) {
  try {
    const users = await ensureUsersTableExists();
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    return await db
      .insert(users)
      .values({ email, password: hash, username, profile_image_url });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
