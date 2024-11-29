import { connectToDatabase } from "@/config/database.config";
import { eq } from "drizzle-orm";
import { siteInfoTable } from "../schema";

export const siteInfoRepository = { getSiteInfo, updateSiteInfo };

async function getSiteInfo(id: string) {
  try {
    const db = await connectToDatabase();

    const record = await db
      .select()
      .from(siteInfoTable)
      .where(eq(siteInfoTable.id, Number(id)));

    return record[0];
  } catch (error) {
    console.error("Error getting:", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function updateSiteInfo(updatedData: any) {
  try {
    if (!updatedData.id) {
      console.log('id is not found');
      
      return;
    }
    const db = await connectToDatabase();

    await db
      .update(siteInfoTable)
      .set(updatedData)
      .where(eq(siteInfoTable.id, updatedData.id));

    console.log("Site information updated successfully");
  } catch (error) {
    console.error("Error updating site info:", error);
    throw new Error("Failed to update site information");
  }
}
