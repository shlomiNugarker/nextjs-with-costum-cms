import { connectToDatabase } from "../../../config/database.config";
import { eq, InferSelectModel, and } from "drizzle-orm";
import { TableName, tables, TableSchemas } from "@/services/db/schema";
import { AnyPgColumn } from "drizzle-orm/pg-core";

export const genericRepository = {
  getAll: async <T extends TableName>(
    siteId: string,
    tableName: T
  ): Promise<TableSchemas[T][]> => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName];
      const records = await db
        .select()
        .from(table)
        .where(eq(table.site_id, Number(siteId)));
      return records as TableSchemas[T][];
    } catch (error) {
      console.error(`Error fetching records from table ${tableName}:`, error);
      return [];
    }
  },

  getById: async <T extends TableName>(
    siteId: string,
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
      const records = await db
        .select()
        .from(table)
        .where(and(eq(idColumn, id), eq(table.site_id, Number(siteId))))
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

  getByField: async <T extends TableName>(
    siteId: string,
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
        .where(and(eq(column, value), eq(table.site_id, Number(siteId))))
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
    siteId: string,
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
        .where(and(eq(idColumn, id), eq(table.site_id, Number(siteId))));
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
    siteId: string,
    tableName: T,
    newRecord: TableSchemas[T]
  ): Promise<TableSchemas[T]> => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName];
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

  updateRecord: async <T extends TableName>(
    siteId: string,
    tableName: T,
    id: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatedFields: any // ??? TODO: find how to handle any field for spesific table
  ): Promise<TableSchemas[T]> => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName];
      const idColumn = table.id;

      if (!idColumn) {
        throw new Error(`No 'id' column found in table ${tableName}`);
      }
      const updatedRecord = await db
        .update(table)
        .set(updatedFields)
        .where(and(eq(idColumn, id), eq(table.site_id, Number(siteId))))
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
    siteId: string,
    tableName: T,
    filter: Partial<InferSelectModel<(typeof tables)[T]>>
  ): Promise<TableSchemas[T][]> => {
    try {
      const db = await connectToDatabase();
      const table = tables[tableName];

      const [columnKey, columnValue] = Object.entries(filter)[0];

      const column = table[columnKey as keyof typeof table] as AnyPgColumn;

      if (!column) {
        throw new Error(
          `Column '${columnKey}' not found in table ${tableName}`
        );
      }

      const records = await db
        .select()
        .from(table)
        .where(and(eq(column, columnValue), eq(table.site_id, Number(siteId))));

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
