import { NextRequest, NextResponse } from "next/server";
import {
  getPageById,
  deletePageById,
  updatePage,
} from "@/services/db/repositories/pageRepository";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  try {
    const page = await getPageById(id);
    if (!page) {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }
    return NextResponse.json(page);
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { message: "Failed to fetch page" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const data = await request.json();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { created_at, ...dataWithoutCreatedAt } = data;

  try {
    const updatedPage = await updatePage(id, dataWithoutCreatedAt);
    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { message: "Failed to update page" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  try {
    const deletedPage = await deletePageById(id);
    return NextResponse.json(deletedPage);
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { message: "Failed to delete page" },
      { status: 500 }
    );
  }
}
