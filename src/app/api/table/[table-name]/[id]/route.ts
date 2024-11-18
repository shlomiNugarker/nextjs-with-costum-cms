import { NextRequest, NextResponse } from "next/server";
import { TableName } from "@/services/db/schema";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { table: TableName; id: string } }
) {
  const { table, id } = params;
  const recordId = parseInt(id, 10);

  if (isNaN(recordId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await genericRepository.deleteById(table, recordId);
    return NextResponse.json(
      { message: `Record deleted successfully from ${table}` },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting record from ${table}:`, error);
    return NextResponse.json(
      { error: `Failed to delete record from ${table}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { table: TableName; id: string } }
) {
  const { table, id } = params;
  try {
    const data = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for update" },
        { status: 400 }
      );
    }

    await genericRepository.updateRecord(table, Number(id), data);
    return NextResponse.json(
      { message: `Record updated successfully in ${table}` },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error updating record in ${table}:`, error);
    return NextResponse.json(
      { error: `Failed to update record in ${table}` },
      { status: 500 }
    );
  }
}
