import { connectToDatabase } from "@/config/database.config";
import { eq } from "drizzle-orm";
import { siteInfo } from "../schema";

const siteId = Number(process.env.NEXT_PUBLIC_POSTGRES_SITE_ID!);

export const siteInfoRepository = { getSiteInfo };

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
