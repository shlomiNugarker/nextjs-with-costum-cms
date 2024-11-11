import { connectToDatabase } from "@/config/database.config";
import { SiteInfo } from "@/services/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { deleteSiteInfoById } from "@/services/db/repositories/siteInfoRepository";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await connectToDatabase();

    const id = parseInt(params.id);
    const data = await request.json();
    const {
      site_name,
      description,
      address,
      contact_email,
      phone_number,
      opening_hours,
    } = data;

    if (!id || !site_name) {
      return NextResponse.json(
        { error: "ID and site name are required" },
        { status: 400 }
      );
    }

    const updatedSiteInfo = await db
      .update(SiteInfo)
      .set({
        site_name,
        description,
        address,
        contact_email,
        phone_number,
        opening_hours,
      })
      .where(eq(SiteInfo.id, id))
      .returning();

    return NextResponse.json(updatedSiteInfo[0]);
  } catch (error) {
    console.error("Error updating site information:", error);
    return NextResponse.json(
      { error: "Failed to update site information" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  try {
    const deletedSiteInfo = await deleteSiteInfoById(id);
    return NextResponse.json(deletedSiteInfo);
  } catch (error) {
    console.error("Error deleting site information:", error);
    return NextResponse.json(
      { message: "Failed to delete site information" },
      { status: 500 }
    );
  }
}
