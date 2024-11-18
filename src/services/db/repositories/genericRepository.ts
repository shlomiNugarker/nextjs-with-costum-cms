/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from "../../../config/database.config";
import { eq } from "drizzle-orm";
import { TableName, tables } from "@/services/db/schema";
import { PgTableWithColumns, AnyPgColumn } from "drizzle-orm/pg-core";

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
      const table = tables[tableName] as PgTableWithColumns<any>;
      const idColumn = (table as any)["id"] as AnyPgColumn;
      if (!idColumn) {
        throw new Error(`No 'id' column found in table ${tableName}`);
      }
      const record = await db
        .select()
        .from(table)
        .where(eq(idColumn, id))
        .limit(1);
      return record.length ? record[0] : null;
    } catch (error) {
      console.error(
        `Error fetching record with id ${id} from table ${tableName}:`,
        error
      );
      return null;
    }
  },

  getByField: async (tableName: TableName, fieldName: string, value: any) => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName];
      const column = (table as any)[fieldName] as AnyPgColumn;
      if (!column) {
        throw new Error(
          `Column '${fieldName}' not found in table ${tableName}`
        );
      }
      const record = await db
        .select()
        .from(table)
        .where(eq(column, value))
        .limit(1);
      return record.length ? record[0] : null;
    } catch (error) {
      console.error(
        `Error fetching record with ${fieldName} = ${value} from table ${tableName}:`,
        error
      );
      return null;
    }
  },

  deleteById: async (tableName: TableName, id: number) => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName] as PgTableWithColumns<any>;
      const idColumn = (table as any)["id"] as AnyPgColumn;
      if (!idColumn) {
        throw new Error(`No 'id' column found in table ${tableName}`);
      }
      await db.delete(table).where(eq(idColumn, id));
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
      const table = tables[tableName] as PgTableWithColumns<any>;
      const insertedRecord = await db
        .insert(table)
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
      const table = tables[tableName] as PgTableWithColumns<any>;
      const idColumn = (table as any)["id"] as AnyPgColumn;
      if (!idColumn) {
        throw new Error(`No 'id' column found in table ${tableName}`);
      }
      const updatedRecord = await db
        .update(table)
        .set(updatedFields)
        .where(eq(idColumn, id))
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

  getAllWithFilter: async (
    tableName: TableName,
    filter: Record<string, any>
  ) => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName] as PgTableWithColumns<any>;
      const columnKey = Object.keys(filter)[0];
      const columnValue = Object.values(filter)[0];
      const column = (table as any)[columnKey] as AnyPgColumn;
      if (!column) {
        throw new Error(
          `Column '${columnKey}' not found in table ${tableName}`
        );
      }
      const records = await db
        .select()
        .from(table)
        .where(eq(column, columnValue));
      return records;
    } catch (error) {
      console.error(
        `Error fetching filtered records from table ${tableName}:`,
        error
      );
      return [];
    }
  },
};
