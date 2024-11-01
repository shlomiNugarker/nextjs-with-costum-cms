import { pgTable, serial, varchar, text, integer } from "drizzle-orm/pg-core";

export const weeklyProductsTable = pgTable("weekly_products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  weight: varchar("weight", { length: 50 }),
  category: varchar("category", { length: 50 }),
  price: integer("price").notNull(),
  image_url: text("image_url"),
});

export const nurseryProductsTable = pgTable("nursery_products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  pot_size: varchar("pot_size", { length: 50 }),
  category: varchar("category", { length: 50 }),
  price: integer("price").notNull(),
  image_url: text("image_url"),
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
