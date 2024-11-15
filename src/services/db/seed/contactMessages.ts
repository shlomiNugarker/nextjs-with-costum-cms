import { getClient } from "@/config/database.config";

export async function ensureContactMessagesTableExists() {
  const client = await getClient();

  const result = await client`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'contact_messages'
        );`;

  if (!result[0].exists) {
    await client`
          CREATE TABLE "contact_messages" (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
          );
        `;
    console.log("Created contact_messages table, seeding initial messages...");
    await seedInitialContactMessages();
  }
}

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
