import { NextResponse } from "next/server";
import { addPost, updateBlog } from "@/services/db/repositories/blogRepository";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, description, content } = data;

    await addPost({ title, description, content });

    return NextResponse.json({ message: "הפוסט נוסף בהצלחה" }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "שגיאה בהוספת הפוסט" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, title, description, content, image_url } = data;

    if (!id) {
      return NextResponse.json(
        { error: "לא סופק מזהה לפוסט" },
        { status: 400 }
      );
    }

    await updateBlog(id, { title, description, content, image_url });

    return NextResponse.json(
      { message: "הפוסט עודכן בהצלחה" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "שגיאה בעדכון הפוסט" }, { status: 500 });
  }
}
