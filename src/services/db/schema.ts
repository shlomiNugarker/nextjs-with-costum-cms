/* eslint-disable @typescript-eslint/no-explicit-any */
import { InferSelectModel, sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const weeklyProductsTable = pgTable("weekly_products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  weight: varchar("weight", { length: 50 }),
  category: varchar("category", { length: 50 }),
  price: integer("price").notNull(),
  image_url: text("image_url"),
  created_at: timestamp("created_at").default(sql`NOW()`),
});

export const nurseryProductsTable = pgTable("nursery_products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  pot_size: varchar("pot_size", { length: 50 }),
  category: varchar("category", { length: 50 }),
  price: integer("price").notNull(),
  image_url: text("image_url"),
  created_at: timestamp("created_at").default(sql`NOW()`),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 64 }).notNull(),
  email: varchar("email", { length: 64 }).notNull().unique(),
  password: varchar("password", { length: 64 }).notNull(),
  profile_image_url: text("profile_image_url"),
  role: varchar("role", { length: 20 }).default("User"),
  created_at: varchar("created_at", { length: 255 }).default("now()"),
});

export const blogsTable = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  content: text("content").notNull(),
  image_url: varchar("image_url", { length: 255 }),
  created_at: timestamp("created_at").default(sql`NOW()`),
});

export const pagesTable = pgTable("pages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }),
  meta_title: varchar("meta_title", { length: 255 }),
  meta_description: text("meta_description"),
  meta_keywords: varchar("meta_keywords", { length: 255 }),
  description: text("description"),
  created_at: timestamp("created_at").default(sql`NOW()`),
});

export const contentBlocksTable = pgTable("content_blocks", {
  id: serial("id").primaryKey(),
  page_id: integer("page_id")
    .references(() => pagesTable.id)
    .notNull(),
  block_type: varchar("block_type", { length: 50 }).notNull(),
  content: text("content").notNull(),
  position: integer("position").default(0),
  created_at: timestamp("created_at").default(sql`NOW()`),
});

export const SiteInfo = pgTable("site_info", {
  id: serial("id").primaryKey(),
  site_name: text("site_name").notNull(),
  description: text("description"),
  address: text("address"),
  contact_email: text("contact_email"),
  phone_number: text("phone_number"),
  opening_hours: text("opening_hours"),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  og_title: text("og_title"),
  og_description: text("og_description"),
  og_url: text("og_url"),
  og_type: text("og_type").default("website"),
  facebook_url: text("facebook_url"),
  instagram_url: text("instagram_url"),
  twitter_url: text("twitter_url"),
  youtube_url: text("youtube_url"),
  created_at: timestamp("created_at").default(sql`NOW()`),
});

export const contactMessagesTable = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").default(sql`NOW()`),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  created_at: timestamp("created_at").defaultNow(),
});

export const getEmptyRecord = (tableName: TableName): Record<string, any> => {
  const tableSchema = tables[tableName];

  if (!tableSchema) {
    throw new Error(`Table ${tableName} not found in schema.`);
  }

  const emptyRecord: Record<string, any> = {};

  const excludedFields = ["id", "created_at", "updated_at"];

  for (const [key, column] of Object.entries(
    (tableSchema as any)[Symbol.for("drizzle:Columns")]
  )) {
    if (excludedFields.includes(key)) {
      continue;
    }

    const col = column as {
      columnType: string;
      hasDefault?: boolean;
      default?: any;
      enumValues?: string[];
    };

    if (col.hasDefault) {
      emptyRecord[key] = col.default ?? null;
      continue;
    }

    switch (col.columnType) {
      case "PgSerial":
        emptyRecord[key] = null;
        break;
      case "PgVarchar":
      case "PgText":
        emptyRecord[key] = "";
        break;
      case "PgInteger":
        emptyRecord[key] = 0;
        break;
      case "PgTimestamp":
        emptyRecord[key] = null;
        break;
      case "PgBoolean":
        emptyRecord[key] = false;
        break;
      case "PgEnum":
        emptyRecord[key] = col.enumValues?.[0] || null;
        break;
      default:
        emptyRecord[key] = null;
    }
  }

  return emptyRecord;
};

export type TableName = keyof typeof tables;

export const tables = {
  weeklyProductsTable,
  nurseryProductsTable,
  users,
  blogsTable,
  pagesTable,
  contentBlocksTable,
  SiteInfo,
  contactMessagesTable,
  newsletterSubscribers,
};

export type TableSchemas = {
  [K in TableName]: InferSelectModel<(typeof tables)[K]>;
};
