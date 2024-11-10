import { getClient } from "../../../config/database.config";

export async function ensureContentBlocksTableExists() {
  const client = await getClient();

  const result = await client`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'content_blocks'
      );`;

  if (!result[0].exists) {
    await client`
        CREATE TABLE "content_blocks" (
          id SERIAL PRIMARY KEY,
          page_id INTEGER REFERENCES pages(id) ON DELETE CASCADE,
          block_type VARCHAR(50) NOT NULL,
          content TEXT NOT NULL,
          position INTEGER DEFAULT 0,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `;
    console.log("Created content_blocks table, seeding initial blocks...");
    await seedInitialContentBlocks();
  }
}

export async function seedInitialContentBlocks() {
  const initialBlocks = [
    // דף הבית
    {
      page_id: 1,
      block_type: "text",
      content: "ברוכים הבאים לגינה בפרדס, חווה אורגנית בפרדס חנה",
      position: 1,
    },
    {
      page_id: 1,
      block_type: "gallery",
      content: JSON.stringify([
        "https://images.unsplash.com/photo-1488442942852-33c2dd3b7528?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]),
      position: 2,
    },
    // דף תוצרת שבועית
    {
      page_id: 3,
      block_type: "text",
      content: "תוצרת אורגנית טרייה, ישר מהשדה שלנו אליכם הביתה",
      position: 1,
    },
    // דף המשתלה
    {
      page_id: 4,
      block_type: "text",
      content:
        "ברוכים הבאים למשתלה של הגינה בפרדס, צמחי תבלין ונוי באיכות גבוהה",
      position: 1,
    },
    {
      page_id: 4,
      block_type: "gallery",
      content: JSON.stringify([
        "https://images.unsplash.com/photo-1488442942852-33c2dd3b7528?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1463123081488-789f998ac9c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]),
      position: 2,
    },
    // דף משלוחים
    {
      page_id: 2,
      block_type: "text",
      content: "משלוחים מהירים ואמינים של תוצרת אורגנית",
      position: 1,
    },
    {
      page_id: 2,
      block_type: "text",
      content: "זמני אספקה הם בימים א'-ה' בין השעות 9:00-17:00.",
      position: 2,
    },
    {
      page_id: 2,
      block_type: "text",
      content:
        "אזורים בהם אנו מספקים משלוחים: פרדס חנה, חדרה, קיסריה, חיפה והקריות.",
      position: 3,
    },
    {
      page_id: 2,
      block_type: "list",
      content: JSON.stringify([
        "משלוח מהיר (עד 24 שעות) - 50 ₪",
        "משלוח רגיל (עד 3 ימי עסקים) - 30 ₪",
        "איסוף עצמי ללא עלות מהחווה בפרדס חנה",
      ]),
      position: 4,
    },
    {
      page_id: 2,
      block_type: "text",
      content:
        "וודאו שהכתובת מלאה ומדויקת כדי להבטיח אספקה חלקה. לכל שאלה, צרו קשר.",
      position: 5,
    },
    // דף צור קשר
    {
      page_id: 5,
      block_type: "text",
      content: "צור קשר עם הגינה בפרדס לכל שאלה או בקשה",
      position: 1,
    },
    {
      page_id: 5,
      block_type: "form",
      content: JSON.stringify({ fields: ["שם", 'דוא"ל', "הודעה"] }),
      position: 2,
    },
    // דף הבלוג
    {
      page_id: 7,
      block_type: "text",
      content: "ברוכים הבאים לבלוג שלנו! כאן תמצאו מאמרים וטיפים מעולם החקלאות",
      position: 1,
    },
    // דף אודות
    {
      page_id: 6,
      block_type: "text",
      content: "אודות הגינה בפרדס - חזון וערכים לחקלאות אורגנית ושימור הסביבה",
      position: 1,
    },
    {
      page_id: 6,
      block_type: "image",
      content: JSON.stringify({
        url: "https://images.unsplash.com/photo-1488442942852-33c2dd3b7528?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }),
      position: 2,
    },
    {
      page_id: 6,
      block_type: "text",
      content:
        "החזון שלנו הוא לייצר תוצרת איכותית ובריאה בשיטות אורגניות ושמירה על הסביבה",
      position: 3,
    },
    {
      page_id: 6,
      block_type: "list",
      content: JSON.stringify([
        "גידול אורגני ללא כימיקלים",
        "מגוון רחב של צמחי תבלין ועצי פרי",
        "שירות אישי ואיכותי לכל לקוח",
        "מחויבות לשימור הטבע והסביבה",
      ]),
      position: 4,
    },
    {
      page_id: 6,
      block_type: "text",
      content:
        "המומחיות שלנו היא גידול חקלאי אורגני והענקת שירותים ברמה הגבוהה ביותר",
      position: 5,
    },
    {
      page_id: 6,
      block_type: "text",
      content: "בואו לבקר אותנו ולהתרשם מהמגוון הרחב והיופי של הטבע",
      position: 6,
    },
  ];

  const client = await getClient();

  const insertPromises = initialBlocks.map((block) =>
    client
      ? client`
          INSERT INTO content_blocks (page_id, block_type, content, position)
          VALUES (${block.page_id}, ${block.block_type}, ${block.content}, ${block.position});`
      : null
  );

  await Promise.all(insertPromises);
  console.log("Initial content blocks added to content_blocks table.");
}
