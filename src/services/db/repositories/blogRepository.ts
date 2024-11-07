import { blogsTable } from "@/services/db/schema";
import { connectToDatabase } from "../../../config/database.config";
import { eq } from "drizzle-orm";

export async function getAllBlogs() {
  try {
    const db = await connectToDatabase();

    return await db.select().from(blogsTable);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function getBlogById(id: number) {
  try {
    const db = await connectToDatabase();

    const blog = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.id, id));
    return blog.length ? blog[0] : null;
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    return null;
  }
}
