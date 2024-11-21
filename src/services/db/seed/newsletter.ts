"use server";

import { getClient } from "../../../config/database.config";

export async function seedInitialSubscribers() {
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
