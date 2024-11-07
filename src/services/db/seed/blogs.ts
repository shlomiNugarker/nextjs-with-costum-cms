import { getClient } from "../database";

export async function ensureBlogsTableExists() {
  const client = await getClient();

  const result = await client`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'blogs'
      );`;

  if (!result[0].exists) {
    await client`
        CREATE TABLE "blogs" (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          content TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `;
    console.log("Created blogs table.");

    await seedInitialBlogs();
  }
}

export async function seedInitialBlogs() {
  const initialBlogs = [
    {
      title: "ברוכים הבאים לבלוג שלנו",
      description: "הפוסט הראשון בבלוג שלנו עם מידע חשוב על הפרויקט.",
      content: `## ברוכים הבאים!\n\nזהו הפוסט הראשון בבלוג שלנו. כאן תמצאו עדכונים, מאמרים, ומידע נוסף.`,
    },
    {
      title: "Markdown - איך להוסיף תוכן עשיר לבלוג",
      description: "הסבר על Markdown ואיך להשתמש בו להוספת תוכן עשיר לפוסטים.",
      content: `**Markdown** היא שפה לסימון טקסט בצורה פשוטה וקריאה, והיא מאפשרת לנו ליצור פוסטים עשירים בבלוג.`,
    },
  ];

  const client = await getClient();

  const insertPromises = initialBlogs.map((blog) =>
    client
      ? client`
          INSERT INTO blogs (title, description, content, created_at)
          VALUES (${blog.title}, ${blog.description}, ${blog.content}, NOW());`
      : null
  );

  await Promise.all(insertPromises);

  console.log("Initial blogs added to blogs table.");
}
