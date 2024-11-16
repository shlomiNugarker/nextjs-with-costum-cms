"use server";

import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { getClient } from "../../../config/database.config";

export async function ensureUsersTableExists() {
  const client = await getClient();

  const result = await client`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );`;

  if (!result[0].exists) {
    await client`
        CREATE TABLE "users" (
          id SERIAL PRIMARY KEY,
          username VARCHAR(64) NOT NULL,
          email VARCHAR(64) NOT NULL UNIQUE,
          password VARCHAR(64) NOT NULL,
          profile_image_url TEXT, 
          role VARCHAR(20) DEFAULT 'User', 
          created_at TIMESTAMP DEFAULT NOW()  
        );`;

    console.log("Created users table, seeding initial users...");

    await seedInitialUsers();
  }

  const table = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 64 }).notNull(),
    email: varchar("email", { length: 64 }).notNull().unique(),
    password: varchar("password", { length: 64 }).notNull(),
    profile_image_url: varchar("profile_image_url"),
    role: varchar("role", { length: 20 }).default("User"),
    created_at: varchar("created_at", { length: 64 }).default("now()"),
  });

  return table;
}

async function seedInitialUsers() {
  const initialUsers = [
    {
      username: "Israel Israeli",
      email: "israel@example.com",
      password: "password123",
      profile_image_url: "https://example.com/profile1.jpg",
    },
    {
      username: "Jane Doe",
      email: "jane.doe@example.com",
      password: "securepassword",
      profile_image_url: "https://example.com/profile2.jpg",
    },
    {
      username: "John Smith",
      email: "john.smith@example.com",
      password: "mypassword",
      profile_image_url: "https://example.com/profile3.jpg",
    },
  ];

  const client = await getClient();

  const insertPromises = initialUsers.map((user) =>
    client
      ? client`
        INSERT INTO users (username, email, password, profile_image_url)
        VALUES (${user.username}, ${user.email}, ${user.password}, ${user.profile_image_url});`
      : null
  );

  await Promise.all(insertPromises);

  console.log("Initial users added to users table.");
}
