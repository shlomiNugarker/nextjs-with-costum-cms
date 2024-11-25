/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from "../../../config/database.config";
import { eq, InferSelectModel, and } from "drizzle-orm";
import { TableName, tables, TableSchemas } from "@/services/db/schema";
import { AnyPgColumn } from "drizzle-orm/pg-core";

const siteId = process.env.POSTGRES_SITE_ID || 0;

export const genericRepository = {
  getAll: async <T extends TableName>(
    tableName: T
  ): Promise<TableSchemas[T][]> => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName];
      const records = await db
        .select()
        .from(table)
        .where(eq((table as any).site_id as AnyPgColumn, siteId));
      return records as TableSchemas[T][];
    } catch (error) {
      console.error(`Error fetching records from table ${tableName}:`, error);
      return [];
    }
  },

  // Get a single record by ID filtered by site_id
  getById: async <T extends TableName>(
    tableName: T,
    id: number
  ): Promise<TableSchemas[T] | null> => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName];
      const idColumn = table.id;
      if (!idColumn) {
        throw new Error(`No 'id' column found in table ${tableName}`);
      }

      if (tableName === "siteInfo") {
        const records = await db
          .select()
          .from(table)
          .where(and(eq(idColumn, id)))
          .limit(1);
        return records.length ? (records[0] as TableSchemas[T]) : null;
      }
      const records = await db
        .select()
        .from(table)
        .where(
          and(
            eq((table as any).site_id as AnyPgColumn, siteId),
            eq(idColumn, id)
          )
        )
        .limit(1);
      return records.length ? (records[0] as TableSchemas[T]) : null;
    } catch (error) {
      console.error(
        `Error fetching record with id ${id} from table ${tableName}:`,
        error
      );
      return null;
    }
  },

  // Add a new record and ensure site_id is included
  getByField: async <T extends TableName>(
    tableName: T,
    fieldName: string,
    value: unknown
  ): Promise<TableSchemas[T] | null> => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName];
      const column = table[fieldName as keyof typeof table] as AnyPgColumn;
      if (!column) {
        throw new Error(
          `Column '${fieldName}' not found in table ${tableName}`
        );
      }
      const records = await db
        .select()
        .from(table)
        .where(
          and(
            eq(column, value),
            eq((table as any).site_id as AnyPgColumn, siteId)
          )
        )
        .limit(1);
      return records.length ? (records[0] as TableSchemas[T]) : null;
    } catch (error) {
      console.error(
        `Error fetching record with ${fieldName} = ${value} from table ${tableName}:`,
        error
      );
      return null;
    }
  },

  deleteById: async <T extends TableName>(
    tableName: T,
    id: number
  ): Promise<void> => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName];
      const idColumn = table.id;

      if (!idColumn) {
        throw new Error(`No 'id' column found in table ${tableName}`);
      }

      await db
        .delete(table)
        .where(
          and(
            eq(idColumn, id),
            eq((table as any).site_id as AnyPgColumn, siteId)
          )
        );
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
  addRecord: async <T extends TableName>(
    tableName: T,
    newRecord: any
  ): Promise<TableSchemas[T]> => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName];

      if (tableName === "siteInfo") {
        const insertedRecord = await db
          .insert(table)
          .values({ ...newRecord })
          .returning();
        return insertedRecord[0] as TableSchemas[T];
      }
      const insertedRecord = await db
        .insert(table)
        .values({ ...newRecord, site_id: siteId })
        .returning();
      return insertedRecord[0] as TableSchemas[T];
    } catch (error) {
      console.error(`Error adding record to table ${tableName}:`, error);
      throw new Error(`Unable to add record to table ${tableName}`);
    }
  },

  // Update a record by ID filtered by site_id
  updateRecord: async <T extends TableName>(
    tableName: T,
    id: number,
    updatedFields: any
  ): Promise<TableSchemas[T]> => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName];
      const idColumn = table.id;
      if (!idColumn) {
        throw new Error(`No 'id' column found in table ${tableName}`);
      }

      if (tableName === "siteInfo") {
        const updatedRecord = await db
          .update(table)
          .set(updatedFields)
          .where(and(eq(idColumn, id)))
          .returning();
        return updatedRecord[0] as TableSchemas[T];
      }

      const updatedRecord = await db
        .update(table)
        .set(updatedFields)
        .where(
          and(
            eq((table as any).site_id as AnyPgColumn, siteId),
            eq(idColumn, id)
          )
        )
        .returning();
      return updatedRecord[0] as TableSchemas[T];
    } catch (error) {
      console.error(
        `Error updating record with id ${id} in table ${tableName}:`,
        error
      );
      throw new Error(`Unable to update record in table ${tableName}`);
    }
  },

  getAllWithFilter: async <T extends TableName>(
    tableName: T,
    filters: Partial<InferSelectModel<(typeof tables)[T]>>
  ): Promise<TableSchemas[T][]> => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName];

      const filterConditions = [
        eq((table as any).site_id as AnyPgColumn, siteId),
        ...Object.entries(filters).map(([key, value]) =>
          eq(table[key as keyof typeof table] as AnyPgColumn, value)
        ),
      ];

      const records = await db
        .select()
        .from(table)
        .where(and(...filterConditions));
      return records as TableSchemas[T][];
    } catch (error) {
      console.error(
        `Error fetching filtered records from table ${tableName}:`,
        error
      );
      return [];
    }
  },
};
