import { NextRequest, NextResponse } from "next/server";
import {
  createContentBlock,
  deleteContentBlock,
  getContentBlockById,
  updateContentBlock,
} from "@/services/db/repositories/contentBlockRepository";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  try {
    const block = await getContentBlockById(id);
    if (!block) {
      return NextResponse.json(
        { message: "Content block not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(block);
  } catch (error) {
    console.error("Error fetching content block:", error);
    return NextResponse.json(
      { message: "Failed to fetch content block" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const { content } = await request.json();

  try {
    await updateContentBlock(id, { content });
    return NextResponse.json({ message: "Content block updated successfully" });
  } catch (error) {
    console.error("Error updating content block:", error);
    return NextResponse.json(
      { message: "Failed to update content block" },
      { status: 500 }
    );
  }
}

// Create a New Content Block
export async function POST(request: NextRequest) {
  const { content, block_type, position, page_id } = await request.json();

  try {
    const newBlock = await createContentBlock({
      content,
      block_type,
      position,
      page_id,
    });
    return NextResponse.json(newBlock, { status: 201 });
  } catch (error) {
    console.error("Error creating content block:", error);
    return NextResponse.json(
      { message: "Failed to create content block" },
      { status: 500 }
    );
  }
}

// Delete Content Block by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  try {
    await deleteContentBlock(id);
    return NextResponse.json({ message: "Content block deleted successfully" });
  } catch (error) {
    console.error("Error deleting content block:", error);
    return NextResponse.json(
      { message: "Failed to delete content block" },
      { status: 500 }
    );
  }
}
