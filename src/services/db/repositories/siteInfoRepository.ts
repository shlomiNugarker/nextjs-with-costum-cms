// "use server";

// import { connectToDatabase } from "@/config/database.config";
// import { SiteInfo } from "../schema";
// import { eq } from "drizzle-orm";

// export async function getSiteInfo() {
//   try {
//     const db = await connectToDatabase();
//     const siteInfo = await db.select().from(SiteInfo).limit(1);
//     return siteInfo.length ? siteInfo[0] : null;
//   } catch (error) {
//     console.error("Error fetching site information:", error);
//     return null;
//   }
// }

// export async function createSiteInfo(info: {
//   site_name: string;
//   description?: string;
//   address?: string;
//   contact_email?: string;
//   phone_number?: string;
//   opening_hours?: string;
//   meta_title?: string;
//   meta_description?: string;
//   og_title?: string;
//   og_description?: string;
//   og_url?: string;
//   og_type?: string;
//   facebook_url?: string;
//   instagram_url?: string;
//   twitter_url?: string;
//   youtube_url?: string;
// }) {
//   try {
//     const db = await connectToDatabase();
//     const newInfo = await db.insert(SiteInfo).values(info).returning();
//     return newInfo[0];
//   } catch (error) {
//     console.error("Error creating site information:", error);
//     throw new Error("Unable to create site information");
//   }
// }

// export async function updateSiteInfo(
//   id: number,
//   updatedFields: Partial<{
//     site_name: string;
//     description: string;
//     address: string;
//     contact_email: string;
//     phone_number: string;
//     opening_hours: string;
//     meta_title?: string;
//     meta_description?: string;
//     og_title?: string;
//     og_description?: string;
//     og_url?: string;
//     og_type?: string;
//     facebook_url?: string;
//     instagram_url?: string;
//     twitter_url?: string;
//     youtube_url?: string;
//   }>
// ) {
//   try {
//     const db = await connectToDatabase();
//     const updatedInfo = await db
//       .update(SiteInfo)
//       .set(updatedFields)
//       .where(eq(SiteInfo.id, id))
//       .returning();
//     return updatedInfo[0];
//   } catch (error) {
//     console.error(`Error updating site information with ID ${id}:`, error);
//     throw new Error("Unable to update site information");
//   }
// }

// export async function deleteSiteInfoById(id: number) {
//   try {
//     const db = await connectToDatabase();
//     const deletedInfo = await db
//       .delete(SiteInfo)
//       .where(eq(SiteInfo.id, id))
//       .returning();
//     if (deletedInfo.length === 0) {
//       throw new Error(`Site information with ID ${id} not found.`);
//     }
//     console.log(`Site information with ID ${id} deleted successfully.`);
//     return deletedInfo[0];
//   } catch (error) {
//     console.error(`Error deleting site information with ID ${id}:`, error);
//     throw new Error("Unable to delete site information");
//   }
// }
