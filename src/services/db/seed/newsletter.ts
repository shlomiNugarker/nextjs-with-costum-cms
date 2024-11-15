import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { getClient } from "../../../config/database.config";

export async function ensureNewsletterSubscribersTableExists() {
  const client = await getClient();

  const result = await client`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'newsletter_subscribers'
      );`;

  if (!result[0].exists) {
    await client`
        CREATE TABLE "newsletter_subscribers" (
          id SERIAL PRIMARY KEY,
          email VARCHAR(64) NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT NOW()
        );`;

    console.log(
      "Created newsletter_subscribers table, seeding initial subscribers..."
    );

    await seedInitialSubscribers();
  }

  const table = pgTable("newsletter_subscribers", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 64 }).notNull().unique(),
    created_at: timestamp("created_at").defaultNow(),
  });

  return table;
}

async function seedInitialSubscribers() {
  const initialSubscribers = [
    {
      email: "subscriber1@example.com",
    },
    {
      email: "subscriber2@example.com",
    },
    {
      email: "subscriber3@example.com",
    },
  ];

  const client = await getClient();

  const insertPromises = initialSubscribers.map((subscriber) =>
    client
      ? client`
        INSERT INTO newsletter_subscribers (email)
        VALUES (${subscriber.email});`
      : null
  );

  await Promise.all(insertPromises);

  console.log("Initial subscribers added to newsletter_subscribers table.");
}
