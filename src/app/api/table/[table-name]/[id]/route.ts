import { NextRequest, NextResponse } from "next/server";
import { TableName } from "@/services/db/schema";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { "table-name": TableName; id: string } }
) {
  const recordId = parseInt(params.id, 10);

  if (isNaN(recordId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await genericRepository.deleteById(params["table-name"], recordId);
    return NextResponse.json(
      { message: `Record deleted successfully from ${params["table-name"]}` },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting record from ${params["table-name"]}:`, error);
    return NextResponse.json(
      { error: `Failed to delete record from ${params["table-name"]}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { "table-name": TableName; id: string } }
) {
  try {
    const data = await request.json();

    if (!params.id) {
      return NextResponse.json(
        { error: "ID is required for update" },
        { status: 400 }
      );
    }

    await genericRepository.updateRecord(
      params["table-name"],
      Number(params.id),
      data
    );
    return NextResponse.json(
      { message: `Record updated successfully in ${params["table-name"]}` },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error updating record in ${params["table-name"]}:`, error);
    return NextResponse.json(
      { error: `Failed to update record in ${params["table-name"]}` },
      { status: 500 }
    );
  }
}
