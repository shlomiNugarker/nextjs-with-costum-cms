import { NextResponse } from "next/server";
import { blogsTable } from "@/services/db/schema";
import { eq } from "drizzle-orm";
import { connectToDatabase } from "@/config/database.config";

export async function POST(request: Request) {
  try {
    const db = await connectToDatabase();

    const data = await request.json();
    const { title, description, content } = data;

    await db.insert(blogsTable).values({
      title,
      description,
      content,
    });

    return NextResponse.json({ message: "הפוסט נוסף בהצלחה" }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "שגיאה בהוספת הפוסט" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const db = await connectToDatabase();

    const data = await request.json();
    const { id, title, description, content } = data;

    if (!id) {
      return NextResponse.json(
        { error: "לא סופק מזהה לפוסט" },
        { status: 400 }
      );
    }

    await db
      .update(blogsTable)
      .set({
        title,
        description,
        content,
      })
      .where(eq(blogsTable.id, id));

    return NextResponse.json(
      { message: "הפוסט עודכן בהצלחה" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "שגיאה בעדכון הפוסט" }, { status: 500 });
  }
}

