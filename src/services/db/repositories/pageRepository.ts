import { connectToDatabase } from "@/config/database.config";
import { pagesTable } from "../schema";
import { eq } from "drizzle-orm";

export async function savePage(page: {
  id?: number;
  name: string;
  title: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}) {
  const db = await connectToDatabase();

  try {
    if (page.id) {
      const updatedPage = await db
        .update(pagesTable)
        .set({
          name: page.name,
          title: page.title,
          description: page.description,
          meta_title: page.meta_title,
          meta_description: page.meta_description,
          meta_keywords: page.meta_keywords,
        })
        .where(eq(pagesTable.id, page.id))
        .returning();
      return updatedPage[0];
    } else {
      const newPage = await db
        .insert(pagesTable)
        .values({
          name: page.name,
          title: page.title,
          description: page.description,
          meta_title: page.meta_title,
          meta_description: page.meta_description,
          meta_keywords: page.meta_keywords,
        })
        .returning();
      return newPage[0];
    }
  } catch (error) {
    console.error("Error saving page:", error);
    throw new Error("Unable to save page");
  }
}

export async function updatePage(id: number, updatedFields: any) {
  const db = await connectToDatabase();

  try {
    const updatedPage = await db
      .update(pagesTable)
      .set(updatedFields)
      .where(eq(pagesTable.id, id))
      .returning();
    return updatedPage[0];
  } catch (error) {
    console.error(`Error updating page with ID ${id}:`, error);
    throw new Error("Unable to update page");
  }
}

export async function getPageById(id: number) {
  try {
    const db = await connectToDatabase();
    const page = await db
      .select()
      .from(pagesTable)
      .where(eq(pagesTable.id, id))
      .limit(1);
    return page.length > 0 ? page[0] : null;
  } catch (error) {
    console.error(`Error fetching page with ID ${id}:`, error);
    return null;
  }
}

export async function getAllPages() {
  try {
    const db = await connectToDatabase();
    const pages = await db.select().from(pagesTable);
    return pages;
  } catch (error) {
    console.error("Error fetching all pages:", error);
    return [];
  }
}

export async function deletePageById(id: number) {
  try {
    const db = await connectToDatabase();
    const deletedPage = await db
      .delete(pagesTable)
      .where(eq(pagesTable.id, id))
      .returning();
    return deletedPage[0];
  } catch (error) {
    console.error(`Error deleting page with ID ${id}:`, error);
    return null;
  }
}

export async function getPageByName(name: string) {
  try {
    const db = await connectToDatabase();
    const page = await db
      .select()
      .from(pagesTable)
      .where(eq(pagesTable.name, name))
      .limit(1);
    return page[0] || null;
  } catch (error) {
    console.error(`Error fetching page with name ${name}:`, error);
    return null;
  }
}
