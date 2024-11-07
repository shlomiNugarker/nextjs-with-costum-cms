import { sql } from "drizzle-orm";
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
  created_at: timestamp("created_at").default(sql`NOW()`),
});

export const pagesTable = pgTable("pages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }),
  meta_title: varchar("meta_title", { length: 255 }),
  meta_description: text("meta_description"),
  meta_keywords: varchar("meta_keywords", { length: 255 }),
  created_at: timestamp("created_at").default(sql`NOW()`),
  updated_at: timestamp("updated_at").default(sql`NOW()`),
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
  updated_at: timestamp("updated_at").default(sql`NOW()`),
});
