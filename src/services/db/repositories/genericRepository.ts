/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from "../../../config/database.config";
import { eq } from "drizzle-orm";
import { TableName, tables } from "@/services/db/schema";

export const genericRepository = {
  getAll: async (tableName: TableName) => {
    try {
      const db = await connectToDatabase();
      return await db.select().from(tables[tableName]);
    } catch (error) {
      console.error(`Error fetching records from table ${tableName}:`, error);
      return [];
    }
  },

  getById: async (tableName: TableName, id: number) => {
    try {
      const db = await connectToDatabase();
      const record = await db
        .select()
        .from(tables[tableName])
        .where(eq(tables[tableName].id, id));
      return record.length ? record[0] : null;
    } catch (error) {
      console.error(
        `Error fetching record with id ${id} from table ${tableName}:`,
        error
      );
      return null;
    }
  },

  deleteById: async (tableName: TableName, id: number) => {
    try {
      const db = await connectToDatabase();
      await db.delete(tables[tableName]).where(eq(tables[tableName].id, id));
      console.log(
        `Record with ID ${id} deleted successfully from table ${tableName}.`
      );
    } catch (error) {
      console.error(
        `Error deleting record with id ${id} from table ${tableName}:`,
        error
      );
      throw new Error(`Unable to delete record from table ${tableName}`);
    }
  },

  addRecord: async (tableName: TableName, newRecord: any) => {
    try {
      const db = await connectToDatabase();
      const insertedRecord = await db
        .insert(tables[tableName])
        .values(newRecord)
        .returning();
      console.log(`Record added successfully to table ${tableName}`);
      return insertedRecord[0];
    } catch (error) {
      console.error(`Error adding record to table ${tableName}:`, error);
      throw new Error(`Unable to add record to table ${tableName}`);
    }
  },

  updateRecord: async (
    tableName: TableName,
    id: number,
    updatedFields: Record<string, any>
  ) => {
    try {
      const db = await connectToDatabase();
      const updatedRecord = await db
        .update(tables[tableName])
        .set(updatedFields)
        .where(eq(tables[tableName].id, id))
        .returning();

      console.log(`Record updated successfully in table ${tableName}`);
      return updatedRecord[0];
    } catch (error) {
      console.error(
        `Error updating record with id ${id} in table ${tableName}:`,
        error
      );
      throw new Error(`Unable to update record in table ${tableName}`);
    }
  },
};
