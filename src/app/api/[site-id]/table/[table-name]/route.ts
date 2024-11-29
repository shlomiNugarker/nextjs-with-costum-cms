import { NextRequest, NextResponse } from "next/server";
import { genericRepository } from "@/services/db/repositories/genericRepository";
import { TableName } from "@/services/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { "site-id": string; "table-name": TableName } }
) {
  const table = params["table-name"];
  const siteId = params["site-id"];

  try {
    const records = await genericRepository.getAll(siteId, table);
    
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
  { params }: { params: { "site-id": string; "table-name": TableName } }
) {
  const table = params["table-name"];
  const siteId = params["site-id"];
  try {
    const data = await request.json();
    await genericRepository.addRecord(siteId, table, data);
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
