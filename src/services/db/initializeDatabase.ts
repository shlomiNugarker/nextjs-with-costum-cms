"use server";

import {
  connectToDatabase,
  ensureAllTablesExists,
} from "@/config/database.config";

export async function initialize() {
  try {
    console.log("Initializing database...");
    await connectToDatabase();
    await ensureAllTablesExists();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}
