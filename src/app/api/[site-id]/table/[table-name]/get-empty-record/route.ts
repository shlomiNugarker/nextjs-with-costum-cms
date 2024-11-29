import { getEmptyRecord, TableName } from "@/services/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { "table-name": TableName } }
) {
  const tableName = params["table-name"];
  

  try {
    const emptyRecord = await getEmptyRecord(tableName)
    return NextResponse.json(emptyRecord);
  } catch (error) {
    console.error(`Error fetching records from ${tableName}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch records from ${tableName}` },
      { status: 500 }
    );
  }
}
