import { NextRequest, NextResponse } from "next/server";
import { TableName } from "@/services/db/schema";
import { genericRepository } from "@/services/db/repositories/genericRepository";
import { auth } from "@/services/auth";

export async function GET(
  request: NextRequest,
  {
    params,
  }: { params: { "site-id": string; "table-name": TableName; id: string } }
) {
  const table = params["table-name"];
  const id = params.id;
  const siteId = params["site-id"];

  try {
    const records = await genericRepository.getById(siteId, table, Number(id));
    return NextResponse.json(records);
  } catch (error) {
    console.error(`Error fetching records from ${table}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch records from ${table}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: { params: { "site-id": string; "table-name": TableName; id: string } }
) {
  const session = await auth();
  const siteId = params["site-id"];
  if (
    !session ||
    !session.user ||
    session.user.role !== "Admin" ||
    session.user.email !== "shlomin1231@gmail.com"
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const recordId = parseInt(params.id, 10);

  if (isNaN(recordId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await genericRepository.deleteById(siteId, params["table-name"], recordId);
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
  {
    params,
  }: { params: { "site-id": string; "table-name": TableName; id: string } }
) {
  try {
    const data = await request.json();
    const siteId = params["site-id"];

    if (!params.id) {
      return NextResponse.json(
        { error: "ID is required for update" },
        { status: 400 }
      );
    }

    await genericRepository.updateRecord(
      siteId,
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
