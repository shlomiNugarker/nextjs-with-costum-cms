import { connectToDatabase } from "@/config/database.config";
import { blogsTable } from "@/services/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id, 10);

    if (isNaN(postId)) {
      return NextResponse.json(
        { error: "לא סופק מזהה לפוסט למחיקה" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    await db.delete(blogsTable).where(eq(blogsTable.id, postId));

    return NextResponse.json({ message: "הפוסט נמחק בהצלחה" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "שגיאה במחיקת הפוסט" }, { status: 500 });
  }
}
