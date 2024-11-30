import { connectToDatabase } from "@/config/database.config";
import { eq } from "drizzle-orm";
import { siteInfoTable } from "../schema";

export const siteInfoRepository = { getSiteInfo, updateSiteInfo };

async function getSiteInfo(id: string) {
  try {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error(`Invalid ID: ${id}`);
    }

    const db = await connectToDatabase();

    const record = await db
      .select()
      .from(siteInfoTable)
      .where(eq(siteInfoTable.id, numericId));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { created_at, is_deleted, is_active, ...filteredRecord } = record[0];
    return filteredRecord;
  } catch (error) {
    console.error("Error getting:", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function updateSiteInfo(updatedData: any) {
  try {
    if (!updatedData.id) {
      throw new Error("ID is required for updating site information");

      return;
    }
    const db = await connectToDatabase();

    const result = await db
      .update(siteInfoTable)
      .set(updatedData)
      .where(eq(siteInfoTable.id, updatedData.id));

    if (!result) {
      throw new Error(`No records updated for ID: ${updatedData.id}`);
    }

    console.log("Site information updated successfully");
    return result; // מחזיר מספר הרשומות שעודכנו
  } catch (error) {
    console.error("Error updating site info:", error);
    throw new Error("Failed to update site information");
  }
}
