/* eslint-disable @typescript-eslint/no-explicit-any */
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

export async function deleteBlogById(id: number) {
  try {
    const db = await connectToDatabase();
    await db.delete(blogsTable).where(eq(blogsTable.id, id));
    console.log(`Blog with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting blog with id ${id}:`, error);
    throw new Error("Unable to delete blog");
  }
}

export async function addPost(newBlog: any) {
  try {
    const db = await connectToDatabase();
    const insertedBlog = await db
      .insert(blogsTable)
      .values(newBlog)
      .returning();
    console.log("Blog added successfully");
    return insertedBlog[0];
  } catch (error) {
    console.error("Error adding blog:", error);
    throw new Error("Unable to add blog");
  }
}

export async function updateBlog(
  id: number,
  updatedFields: {
    title?: string;
    description?: string;
    content?: string;
    image_url?: string;
  }
) {
  try {
    const db = await connectToDatabase();
    const updatedBlog = await db
      .update(blogsTable)
      .set(updatedFields)
      .where(eq(blogsTable.id, id))
      .returning();

    console.log("Blog updated successfully");
    return updatedBlog[0];
  } catch (error) {
    console.error(`Error updating blog with id ${id}:`, error);
    throw new Error("Unable to update blog");
  }
}
