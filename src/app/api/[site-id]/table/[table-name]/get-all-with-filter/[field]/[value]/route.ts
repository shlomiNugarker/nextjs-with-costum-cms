import { genericRepository } from "@/services/db/repositories/genericRepository";
import { TableName } from "@/services/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      "site-id": string;
      "table-name": TableName;
      field: string;
      value: string;
    };
  }
) {
  const tableName = params["table-name"];
  const field = params.field;
  const value = params.value;
  const siteId = params["site-id"];

  try {
    const records = await genericRepository.getAllWithFilter(
      siteId,
      tableName,
      {
        [field]: value,
      }
    );
    return NextResponse.json(records);
  } catch (error) {
    console.error(`Error fetching records from ${tableName}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch records from ${tableName}` },
      { status: 500 }
    );
  }
}
