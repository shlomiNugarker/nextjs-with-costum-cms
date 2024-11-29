/* eslint-disable @typescript-eslint/no-explicit-any */
import { InferSelectModel, sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

const DEFAULT_TIMESTAMP = sql`NOW()`;
const DEFAULT_ROLE = "User";
const DEFAULT_BLOCK_TYPE = "text";

export type StatusType = "Draft" | "Published" | "Archived";

export const siteInfoTable = pgTable("site_info", {
  id: serial("id").primaryKey(),
  site_name: text("site_name").notNull(),
  description: text("description"),
  address: text("address"),
  contact_email: text("contact_email"),
  phone_number: text("phone_number"),
  opening_hours: text("opening_hours"),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  meta_keywords: text("meta_keywords"),
  og_title: text("og_title"),
  og_description: text("og_description"),
  og_url: text("og_url"),
  og_type: text("og_type").default("website"),
  facebook_url: text("facebook_url"),
  instagram_url: text("instagram_url"),
  twitter_url: text("twitter_url"),
  youtube_url: text("youtube_url"),
  logo_url: text("logo_url"),
  favicon_url: text("favicon_url"),
  google_analytics_id: varchar("google_analytics_id", { length: 50 }),
  facebook_pixel_id: varchar("facebook_pixel_id", { length: 50 }),
  default_language: varchar("default_language", { length: 10 }).default("en"),
  supported_languages: text("supported_languages"),
  twitter_handle: varchar("twitter_handle", { length: 50 }),
  default_image_url: text("default_image_url"),
  created_at: timestamp("created_at").default(sql`NOW()`),
  is_active: boolean("is_active").default(true),
  is_deleted: boolean("is_deleted").default(false),
});

const baseTableFields: any = {
  site_id: integer("site_id")
    .notNull()
    .references(() => siteInfoTable.id),
  created_at: timestamp("created_at").default(DEFAULT_TIMESTAMP),
  is_active: boolean("is_active").default(true),
  is_deleted: boolean("is_deleted").default(false),
};

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  ...baseTableFields,
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  weight: varchar("weight", { length: 50 }),
  category: varchar("category", { length: 50 }),
  price: integer("price").notNull(),
  image_url: text("image_url"),
  stock_quantity: integer("stock_quantity").notNull().default(0),
  is_featured: boolean("is_featured").default(false),
  discount_percentage: integer("discount_percentage").default(0),
  tags: text("tags"), // לדוגמה: "organic,fresh"
  meta_title: varchar("meta_title", { length: 255 }),
  meta_description: text("meta_description"),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  additional_images: text("additional_images"), // JSON לדוגמה
  video_url: text("video_url"),
  status: varchar("status", { length: 20 }).default("Active"),
});

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  ...baseTableFields,
  username: varchar("username", { length: 64 }).notNull(),
  email: varchar("email", { length: 64 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(), // תמיכה בסיסמאות חזקות
  profile_image_url: text("profile_image_url"),
  role: varchar("role", { length: 20 }).default(DEFAULT_ROLE),
  is_verified: boolean("is_verified").default(false),
  last_login: timestamp("last_login"),
  reset_token: varchar("reset_token", { length: 255 }),
  bio: text("bio"),
  phone_number: varchar("phone_number", { length: 15 }),
});

export const blogsTable = pgTable("blogs", {
  id: serial("id").primaryKey(),
  ...baseTableFields,
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  content: text("content").notNull(),
  image_url: varchar("image_url", { length: 255 }),
  meta_title: varchar("meta_title", { length: 255 }),
  meta_description: text("meta_description"),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  tags: text("tags"), // "javascript,web-development"
  status: varchar("status", { length: 20 }).default("Draft"), // Draft, Published, Archived
  video_url: text("video_url"),
  gallery_urls: text("gallery_urls"), // פורמט JSON: ["url1", "url2"]
});

export const pagesTable = pgTable("pages", {
  id: serial("id").primaryKey(),
  ...baseTableFields,
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }),
  meta_title: varchar("meta_title", { length: 255 }),
  meta_description: text("meta_description"),
  meta_keywords: varchar("meta_keywords", { length: 255 }),
  description: text("description"),
  content: text("content"),
  image_url: text("image_url"),
  video_url: text("video_url"),
  template: varchar("template", { length: 50 }).default("default"),
  og_image: varchar("og_image", { length: 255 }),
  hero_image_url: varchar("hero_image_url", { length: 255 }),
  gallery_urls: text("gallery_urls"), // JSON: ["url1", "url2"]
  status: varchar("status", { length: 20 }).default("Draft"), // Draft, Published, Archived
  position: integer("position").notNull().default(0), // שדה חדש להצגת הסדר בתפריט
});

export const contentBlocksTable = pgTable("content_blocks", {
  id: serial("id").primaryKey(),
  ...baseTableFields,
  page_id: integer("page_id")
    .notNull()
    .references(() => pagesTable.id),
  block_type: varchar("block_type", { length: 50 }).default(DEFAULT_BLOCK_TYPE),
  content: text("content").notNull(),
  position: integer("position").default(0),
  is_published: boolean("is_published").default(true),
});

export const contactMessagesTable = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  ...baseTableFields,
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  ...baseTableFields,
  email: text("email").notNull().unique(),
  name: varchar("name", { length: 255 }),
  subscription_date: timestamp("subscription_date").default(sql`NOW()`),
  unsubscription_date: timestamp("unsubscription_date"),
  status: varchar("status", { length: 20 }).default("Subscribed"), // Subscribed, Unsubscribed, Pending
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
  productsTable,
  blogsTable,
  pagesTable,
  contentBlocksTable,
  contactMessagesTable,
  newsletterSubscribers,
};

export type TableSchemas = {
  [K in TableName]: InferSelectModel<(typeof tables)[K]>;
};
