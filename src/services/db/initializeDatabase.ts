/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { connectToDatabase } from "@/config/database.config";
// import { runSeeds } from "./seed/seed";
// import { migrate } from "drizzle-orm/node-postgres/migrator";

export async function initialize() {
  try {
    console.log("Initializing database...");

    // // Run migrations
    const db = await connectToDatabase();
    // console.log("Running migrations...");
    // await migrate(db, { migrationsFolder: "src/services/db/migrations" });
    // await runSeeds();

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}
