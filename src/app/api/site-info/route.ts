import { NextRequest, NextResponse } from "next/server";
import { SiteInfo } from "@/services/db/schema";
import { connectToDatabase } from "@/config/database.config";

export async function GET() {
  try {
    const db = await connectToDatabase();

    const siteInfo = await db.select().from(SiteInfo).limit(1);
    return NextResponse.json(siteInfo.length > 0 ? siteInfo[0] : {});
  } catch (error) {
    console.error("Error fetching site information:", error);
    return NextResponse.json(
      { error: "Failed to fetch site information" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await connectToDatabase();

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

    if (!site_name) {
      return NextResponse.json(
        { error: "Site name is required" },
        { status: 400 }
      );
    }

    const newSiteInfo = await db
      .insert(SiteInfo)
      .values({
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
      })
      .returning();

    return NextResponse.json(newSiteInfo[0]);
  } catch (error) {
    console.error("Error adding site information:", error);
    return NextResponse.json(
      { error: "Failed to add site information" },
      { status: 500 }
    );
  }
}
