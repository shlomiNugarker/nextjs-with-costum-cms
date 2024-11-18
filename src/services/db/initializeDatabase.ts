"use server";

import { connectToDatabase } from "@/config/database.config";
import { ensureBlogsTableExists } from "./seed/blogs";
import { ensureContactMessagesTableExists } from "./seed/contactMessages";
import { ensureContentBlocksTableExists } from "./seed/contentBlocks";
import { ensureNewsletterSubscribersTableExists } from "./seed/newsletter";
import { ensureNurseryProductsTableExists } from "./seed/nurseryProducts";
import { ensurePagesTableExists } from "./seed/pages";
import { ensureSiteInfoTableExists } from "./seed/siteInfo";
import { ensureUsersTableExists } from "./seed/users";
import { ensureWeeklyProductsTableExists } from "./seed/weeklyProducts";

export async function initialize() {
  try {
    console.log("Initializing database...");
    await connectToDatabase();
    await ensureAllTablesExists();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

export async function ensureAllTablesExists(): Promise<void> {
  const tableCreationFunctions = [
    { name: "Users", func: ensureUsersTableExists },
    { name: "Weekly Products", func: ensureWeeklyProductsTableExists },
    { name: "Nursery Products", func: ensureNurseryProductsTableExists },
    { name: "Blogs", func: ensureBlogsTableExists },
    { name: "Pages", func: ensurePagesTableExists },
    { name: "Content Blocks", func: ensureContentBlocksTableExists },
    { name: "Site Info", func: ensureSiteInfoTableExists },
    { name: "Contact Messages", func: ensureContactMessagesTableExists },
    {
      name: "Newsletter Subscribers",
      func: ensureNewsletterSubscribersTableExists,
    },
  ];

  console.log("Starting table creation process...");

  for (const table of tableCreationFunctions) {
    try {
      console.log(`Ensuring table exists: ${table.name}`);
      await table.func();
      console.log(`Table ensured: ${table.name}`);
    } catch (error) {
      console.error(`Failed to ensure table: ${table.name}`, error);
    }
  }

  console.log("Finished ensuring all tables.");
}
