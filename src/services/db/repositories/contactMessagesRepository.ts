import { connectToDatabase } from "@/config/database.config";
import { contactMessagesTable } from "../schema";

export async function saveContactMessage(contact: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const db = await connectToDatabase();
    const savedContact = await db
      .insert(contactMessagesTable)
      .values(contact)
      .returning();
    return savedContact[0];
  } catch (error) {
    console.error("Error saving contact message:", error);
    throw new Error("Unable to save contact message");
  }
}
