// "use server";

// import { connectToDatabase } from "@/config/database.config";
// import { contentBlocksTable } from "../schema";
// import { eq } from "drizzle-orm";

// export async function getContentBlocksByPageId(pageId: number) {
//   try {
//     const db = await connectToDatabase();
//     const blocks = await db
//       .select()
//       .from(contentBlocksTable)
//       .where(eq(contentBlocksTable.page_id, pageId));
//     return blocks;
//   } catch (error) {
//     console.error(
//       `Error fetching content blocks for page ID ${pageId}:`,
//       error
//     );
//     return [];
//   }
// }

// export async function getContentBlockById(id: number) {
//   const db = await connectToDatabase();
//   const block = await db
//     .select()
//     .from(contentBlocksTable)
//     .where(eq(contentBlocksTable.id, id))
//     .limit(1);
//   return block.length ? block[0] : null;
// }

// export async function createContentBlock(block: {
//   page_id: number;
//   block_type: string;
//   content: string;
//   position: number;
//   description?: string;
// }) {
//   try {
//     const db = await connectToDatabase();
//     const newBlock = await db
//       .insert(contentBlocksTable)
//       .values(block)
//       .returning();
//     return newBlock[0];
//   } catch (error) {
//     console.error("Error creating content block:", error);
//     throw new Error("Unable to create content block");
//   }
// }

// export async function updateContentBlock(
//   blockId: number,
//   updatedFields: Partial<{
//     page_id: number;
//     block_type: string;
//     content: string;
//     position: number;
//     description: string;
//   }>
// ) {
//   try {
//     const db = await connectToDatabase();
//     const updatedBlock = await db
//       .update(contentBlocksTable)
//       .set(updatedFields)
//       .where(eq(contentBlocksTable.id, blockId))
//       .returning();
//     return updatedBlock[0];
//   } catch (error) {
//     console.error(`Error updating content block with ID ${blockId}:`, error);
//     throw new Error("Unable to update content block");
//   }
// }

// export async function deleteContentBlock(blockId: number) {
//   try {
//     const db = await connectToDatabase();
//     await db
//       .delete(contentBlocksTable)
//       .where(eq(contentBlocksTable.id, blockId));
//     console.log(`Content block with ID ${blockId} deleted successfully.`);
//   } catch (error) {
//     console.error(`Error deleting content block with ID ${blockId}:`, error);
//     throw new Error("Unable to delete content block");
//   }
// }
