import { NextRequest, NextResponse } from "next/server";
import {
  deleteSiteInfoById,
  updateSiteInfo,
} from "@/services/db/repositories/siteInfoRepository";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const data = await request.json();
    const {
      site_name,
      description,
      address,
      contact_email,
      phone_number,
      opening_hours,
      meta_title,
      meta_description,
      og_title,
      og_description,
      og_url,
      og_type,
    } = data;

    if (!id || !site_name) {
      return NextResponse.json(
        { error: "ID and site name are required" },
        { status: 400 }
      );
    }

    const updatedSiteInfo = updateSiteInfo(id, {
      site_name,
      description,
      address,
      contact_email,
      phone_number,
      opening_hours,
      meta_title,
      meta_description,
      og_title,
      og_description,
      og_url,
      og_type,
    });

    return NextResponse.json(updatedSiteInfo);
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
