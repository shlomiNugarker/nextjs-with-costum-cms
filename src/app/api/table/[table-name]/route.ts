import { NextRequest, NextResponse } from "next/server";
import { genericRepository } from "@/services/db/repositories/genericRepository";
import { TableName } from "@/services/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { table: TableName } }
) {
  const { table } = params;

  try {
    const records = await genericRepository.getAll(table);
    return NextResponse.json(records);
  } catch (error) {
    console.error(`Error fetching records from ${table}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch records from ${table}` },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { table: TableName } }
) {
  const { table } = params;
  try {
    const data = await request.json();
    await genericRepository.addRecord(table, data);
    return NextResponse.json(
      { message: `Record added successfully to ${table}` },
      { status: 201 }
    );
  } catch (error) {
    console.error(`Error adding record to ${table}:`, error);
    return NextResponse.json(
      { error: `Failed to add record to ${table}` },
      { status: 500 }
    );
  }
}
