import { siteInfoRepository } from "@/services/db/repositories/siteInfoRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const records = await siteInfoRepository.getSiteInfo(params.id);

    return NextResponse.json(records);
  } catch (error) {
    console.error(`Error fetching records from getSiteInfo:`, error);
    return NextResponse.json(
      { error: `Failed to fetch records from getSiteInfo` },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedData = await request.json();

    await siteInfoRepository.updateSiteInfo(updatedData);

    return NextResponse.json({
      message: "Site information updated successfully",
    });
  } catch (error) {
    console.error(`Error updating records in updateSiteInfo:`, error);
    return NextResponse.json(
      { error: `Failed to update records in updateSiteInfo` },
      { status: 500 }
    );
  }
}
