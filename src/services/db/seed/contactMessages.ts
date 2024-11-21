"use server";

import { getClient } from "@/config/database.config";

export async function seedInitialContactMessages() {
  const initialMessages = [
    {
      name: "יוסי לוי",
      email: "yossi@example.com",
      message: "אני מעוניין לקבל מידע נוסף על השירותים שלכם. תודה!",
    },
    {
      name: "שרה כהן",
      email: "sara@example.com",
      message: "איך אפשר להזמין משלוח של תוצרת אורגנית לחדרה?",
    },
    {
      name: "דוד בן חמו",
      email: "david@example.com",
      message: "האם אפשר לבקר את החווה בשבת?",
    },
  ];

  const client = await getClient();

  const insertPromises = initialMessages.map((message) =>
    client
      ? client`
          INSERT INTO contact_messages (name, email, message, created_at)
          VALUES (${message.name}, ${message.email}, ${message.message}, NOW());`
      : null
  );

  await Promise.all(insertPromises);
  console.log("Initial contact messages added to contact_messages table.");
}
