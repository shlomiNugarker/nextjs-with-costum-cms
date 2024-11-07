import { getClient } from "../../../config/database.config";

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
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
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
      description: "עמוד הבית הכולל מידע על החווה ותמונות מהחווה",
    },
    {
      name: "weekly-produce",
      title: "תוצרת שבועית",
      meta_title: "תוצרת אורגנית טרייה - הגינה בפרדס",
      meta_description:
        "התוצרת השבועית שלנו כוללת ירקות ופירות אורגניים הישר מהשדה.",
      meta_keywords: "תוצרת שבועית, ירקות, פירות, אורגני",
      description: "עמוד המציג את התוצרת השבועית הטרייה שלנו",
    },
    {
      name: "nursery",
      title: "המשתלה של הגינה בפרדס",
      meta_title: "המשתלה - הגינה בפרדס",
      meta_description: "בואו להתרשם ממבחר הצמחים והעשבייה שאנו מגדלים במשתלה.",
      meta_keywords: "משתלה, צמחים, תבלינים, פרחים",
      description: "עמוד המשתלה עם מידע על הצמחים והעשבייה שלנו",
    },
    {
      name: "delivery",
      title: "שירות משלוחים",
      meta_title: "משלוחים - הגינה בפרדס",
      meta_description: "שירות משלוחים מהיר לכל אזור פרדס חנה והסביבה.",
      meta_keywords: "משלוחים, חקלאות, חווה, שירות",
      description: "מידע על שירות המשלוחים שלנו וזמני אספקה",
    },
    {
      name: "contact",
      title: "צור קשר",
      meta_title: "צור קשר - הגינה בפרדס",
      meta_description: "ניתן ליצור עמנו קשר לגבי הזמנות, שאלות ומידע נוסף.",
      meta_keywords: "צור קשר, תמיכה, שירות לקוחות",
      description: "עמוד יצירת קשר עם פרטי התקשרות וכתובת",
    },
    {
      name: "blog",
      title: "הבלוג",
      meta_title: "בלוג - הגינה בפרדס",
      meta_description: "בלוג עם מאמרים ועדכונים מהחווה שלנו.",
      meta_keywords: "בלוג, מאמרים, חקלאות, חווה",
      description: "עמוד הבלוג עם מאמרים ומידע מהחווה",
    },
    {
      name: "about",
      title: "אודות",
      meta_title: "אודות - הגינה בפרדס",
      meta_description: "מידע על החווה והחזון של הגינה בפרדס.",
      meta_keywords: "אודות, חווה אורגנית, חקלאות",
      description: "עמוד אודות עם מידע על החזון וההיסטוריה של החווה",
    },
  ];
  const client = await getClient();

  const insertPromises = initialPages.map((page) =>
    client
      ? client`
        INSERT INTO pages (name, title, meta_title, meta_description, meta_keywords, description)
        VALUES (${page.name}, ${page.title}, ${page.meta_title}, ${page.meta_description}, ${page.meta_keywords}, ${page.description});`
      : null
  );

  await Promise.all(insertPromises);
  console.log("Initial pages added to pages table.");
}
