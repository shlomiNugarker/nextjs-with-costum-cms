import { siteInfoRepository } from "@/services/db/repositories/siteInfoRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { "table-name": string; id: string } }
) {
  const table = params["table-name"];

  try {
    const records = await siteInfoRepository.getSiteInfo();
    return NextResponse.json(records);
  } catch (error) {
    console.error(`Error fetching records from ${table}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch records from ${table}` },
      { status: 500 }
    );
  }
}
