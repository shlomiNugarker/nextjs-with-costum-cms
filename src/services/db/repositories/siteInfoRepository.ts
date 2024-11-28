import { connectToDatabase } from "@/config/database.config";
import { eq } from "drizzle-orm";
import { siteInfo } from "../schema";

const siteId = Number(process.env.NEXT_PUBLIC_POSTGRES_SITE_ID!);

export const siteInfoRepository = { getSiteInfo ,updateSiteInfo};

async function getSiteInfo() {
  try {
    const db = await connectToDatabase();

    const record = await db
      .select()
      .from(siteInfo)
      .where(eq(siteInfo.id, siteId));

    return record[0];
  } catch (error) {
    console.error("Error getting user:", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function updateSiteInfo(updatedData: any) {
  try {
    const db = await connectToDatabase();

    await db
      .update(siteInfo)
      .set(updatedData)
      .where(eq(siteInfo.id, siteId));

    console.log("Site information updated successfully");
  } catch (error) {
    console.error("Error updating site info:", error);
    throw new Error("Failed to update site information");
  }
}