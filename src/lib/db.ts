import postgres from "postgres";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export let client: postgres.Sql | null = null;
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
  if (!client) return;

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
    {
      name: "נענע",
      description: "צמח רב שנתי בעל עלים רעננים, נהדר לתה, משקאות ותבשילים.",
      pot_size: "15 ס״מ",
      category: "תבלינים",
      price: 12,
      image_url:
        "https://images.unsplash.com/photo-1708481480624-f27f9c1cc891?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "בזיליקום מתוק",
      description:
        "צמח תבלין עם עלים גדולים וריחניים, מתאים לפסטה, סלטים ועוד.",
      pot_size: "15 ס״מ",
      category: "תבלינים",
      price: 18,
      image_url:
        "https://images.unsplash.com/photo-1515542647469-5f9a6b25ef5b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "עץ לימון",
      description:
        "עץ פרי קטן לגידול בגינה או בעציץ, מניב פירות טריים כל השנה.",
      pot_size: "25 ס״מ",
      category: "עצים",
      price: 75,
      image_url:
        "https://images.unsplash.com/photo-1605185189315-fc269c231e41?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "עץ זית",
      description:
        "עץ חזק ועמיד, מתאים לגידול בגינה או בעציץ גדול, מניב זיתים איכותיים.",
      pot_size: "30 ס״מ",
      category: "עצים",
      price: 120,
      image_url:
        "https://images.unsplash.com/photo-1541259418332-97b56947904f?q=80&w=989&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "לבנדר",
      description:
        "צמח נוי ותבלין עם פריחה סגולה מרהיבה, מתאים להרחיק מזיקים ולהשרות ריח נעים.",
      pot_size: "15 ס״מ",
      category: "נוי",
      price: 20,
      image_url:
        "https://images.unsplash.com/photo-1531112606622-e8174567b048?q=80&w=994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "מרווה",
      description:
        "צמח תבלין רב שנתי עם עלים ריחניים, מצוין לתיבול ולרפואה טבעית.",
      pot_size: "15 ס״מ",
      category: "תבלינים",
      price: 15,
      image_url:
        "https://images.unsplash.com/photo-1632346265081-eb7e5c507721?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "פטרוזיליה",
      description: "צמח תבלין עשיר בויטמינים, מושלם לסלטים ולתבשילים.",
      pot_size: "15 ס״מ",
      category: "תבלינים",
      price: 12,
      image_url:
        "https://images.unsplash.com/photo-1528796940112-4979b4a98424?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  if (!client) return;

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

async function ensureWeeklyProductsTableExists() {
  if (!client) return;

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

async function ensureUsersTableExists() {
  if (!client) return;

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

    console.log("Created users table, seeding initial users...");

    await seedInitialUsers();
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
