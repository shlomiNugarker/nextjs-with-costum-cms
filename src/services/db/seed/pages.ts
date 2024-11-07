import { getClient } from "../database";

export async function ensurePagesTableExists() {
  const client = await getClient();

  const result = await client`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'pages'
      );`;

  if (!result[0].exists) {
    await client`
        CREATE TABLE "pages" (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          title VARCHAR(255),
          meta_title VARCHAR(255),
          meta_description TEXT,
          meta_keywords VARCHAR(255),
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `;
    console.log("Created pages table, seeding initial pages...");
    await seedInitialPages();
  }
}

export async function seedInitialPages() {
  const initialPages = [
    {
      name: "home",
      title: "ברוכים הבאים לגינה בפרדס",
      meta_title: "הגינה בפרדס - חווה אורגנית",
      meta_description:
        "ברוכים הבאים לעמוד הבית של הגינה בפרדס, חווה אורגנית...",
      meta_keywords: "חווה, אורגני, משתלה, ירקות",
    },
    {
      name: "weekly-produce",
      title: "תוצרת שבועית - הגינה בפרדס",
      meta_title: "תוצרת שבועית - תוצרת אורגנית טרייה מהשדה",
      meta_description:
        "תוצרת אורגנית טרייה מהשדה של הגינה בפרדס, כולל עלים, ירקות, פירות, ועשבים מיוחדים שנקטפים במיוחד עבורכם בכל שבוע.",
      meta_keywords: "תוצרת שבועית, אורגני, ירקות, עלים, פירות, הגינה בפרדס",
    },
    {
      name: "nursery",
      title: "המשתלה של הגינה בפרדס",
      meta_title: "המשתלה - הגינה בפרדס",
      meta_description:
        "בקרו במשתלה שלנו ותוכלו להתרשם ממגוון הצמחים האורגניים שאנו מציעים, כולל צמחי נוי ותבלין שנבחרו בקפידה מתוך אהבה לשימור הטבע.",
      meta_keywords: "משתלה, צמחים, אורגני, תבלין, נוי, הגינה בפרדס",
    },
    {
      name: "delivery",
      title: "שירותי משלוחים - הגינה בפרדס",
      meta_title: "משלוחים - הגינה בפרדס",
      meta_description:
        "אנו מציעים שירות משלוחים מהיר ואמין של תוצרת אורגנית טרייה עד הבית. בקרו בעמוד זה כדי ללמוד על אפשרויות וזמני המשלוחים שלנו.",
      meta_keywords: "משלוחים, חווה, תוצרת אורגנית, הגינה בפרדס, ירקות, פירות",
    },
    {
      name: "contact",
      title: "צור קשר",
      meta_title: "צור קשר - הגינה בפרדס",
      meta_description:
        "אנחנו כאן לשירותכם. צרו קשר לכל שאלה או בקשה לגבי תוצרת אורגנית ומשלוחים.",
      meta_keywords: "צור קשר, הגינה בפרדס, תוצרת אורגנית, שירות לקוחות",
    },
    {
      name: "blog",
      title: "הבלוג",
      meta_title: "בלוג - הגינה בפרדס",
      meta_description:
        "קראו מאמרים, טיפים ועדכונים טריים מהבלוג של הגינה בפרדס על חקלאות אורגנית וטיפוח צמחים.",
      meta_keywords: "בלוג, הגינה בפרדס, חקלאות אורגנית, טיפים לגידול צמחים",
    },
    {
      name: "about",
      title: "אודות הגינה בפרדס",
      meta_title: "אודות - הגינה בפרדס",
      meta_description:
        "למדו על החווה האורגנית הגינה בפרדס ועל החזון שלנו לשמר את הטבע והסביבה בגידולים טבעיים.",
      meta_keywords: "אודות, חווה אורגנית, הגינה בפרדס, גידול אורגני",
    },
  ];

  const client = await getClient();

  const insertPromises = initialPages.map((page) =>
    client
      ? client`
          INSERT INTO pages (name, title, meta_title, meta_description, meta_keywords)
          VALUES (${page.name}, ${page.title}, ${page.meta_title}, ${page.meta_description}, ${page.meta_keywords});`
      : null
  );

  await Promise.all(insertPromises);
  console.log("Initial pages added to pages table.");
}
