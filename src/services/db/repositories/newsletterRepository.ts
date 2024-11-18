"use server";

import { connectToDatabase } from "@/config/database.config";
import { newsletterSubscribers } from "../schema";

export const addSubscriber = async (email: string) => {
  try {
    const db = await connectToDatabase();

    await db.insert(newsletterSubscribers).values({ email });
    return { success: true };
  } catch (error) {
    console.error("Error adding subscriber:", error);
    return { success: false, error: "Failed to add subscriber." };
  }
};

export const getAllSubscribers = async () => {
  try {
    const db = await connectToDatabase();

    const subscribers = await db.select().from(newsletterSubscribers);
    return subscribers;
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
};
