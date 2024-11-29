import { connectToDatabase } from "@/config/database.config";
import { siteInfoTable, TableName, tables } from "../schema";
import { seedUsers } from "./initialData/users";
import { initialBlogs } from "./initialData/blogs";
import { initialBlocks } from "./initialData/contentBlocks";
import { initialMessages } from "./initialData/contactMessages";
import { initialSubscribers } from "./initialData/newsletter";
import { initialPages } from "./initialData/pages";
import { initialSiteInfo } from "./initialData/siteInfo";
import { initialProducts } from "./initialData/products";
import { eq } from "drizzle-orm";

const siteId = Number(process.env.NEXT_PUBLIC_POSTGRES_SITE_ID!);

export async function seedTable<T extends TableName>(
  tableName: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: any
): Promise<void> {
  try {
    console.log(`Starting seeding for table: ${tableName}`);
    const db = await connectToDatabase();
    const table = tables[tableName];

    const existingRecords = await db.select().from(table);
    if (existingRecords.length > 0) {
      console.log(
        `Table "${tableName}" already contains data. Skipping seeding.`
      );
      return;
    }

    await db.insert(table).values(initialData);
    console.log(`Table "${tableName}" seeded successfully!`);
  } catch (error) {
    console.error(`Error seeding table "${tableName}":`, error);
  }
}

export async function seedSiteInfo() {
  try {
    console.log("Starting seeding for site info...");
    const db = await connectToDatabase();

    const existingRecords = await db
      .select()
      .from(siteInfoTable)
      .where(eq(siteInfoTable.id, siteId));
    if (existingRecords.length > 0) {
      console.log(
        `Site info already contains data for site ${siteId}. Skipping seeding.`
      );
      return;
    }

    const dataToInsert = initialSiteInfo.map((record) => ({ ...record }));
    await db.insert(siteInfoTable).values(dataToInsert);
    console.log("Site info seeded successfully!");
  } catch (error) {
    console.error("Error seeding site info:", error);
  }
}

export async function runSeeds() {
  try {
    console.log("Starting the seeding process...");

    await seedSiteInfo();
    console.log("Site info seeded successfully.");

    await seedUsers();
    console.log("Users seeded successfully.");

    await seedTable("blogsTable", initialBlogs);
    console.log("Blogs seeded successfully.");

    await seedTable("contactMessagesTable", initialMessages);
    console.log("Contact messages seeded successfully.");

    await seedTable("newsletterSubscribers", initialSubscribers);
    console.log("Newsletter seeded successfully.");

    await seedTable("pagesTable", initialPages);
    console.log("Pages seeded successfully.");

    await seedTable("productsTable", initialProducts);
    console.log("Weekly products seeded successfully.");

    await seedTable("contentBlocksTable", initialBlocks);
    console.log("Content blocks seeded successfully.");

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}
