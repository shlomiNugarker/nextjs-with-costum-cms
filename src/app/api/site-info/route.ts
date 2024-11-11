import { NextRequest, NextResponse } from "next/server";

import {
  createSiteInfo,
  // getSiteInfo,
} from "@/services/db/repositories/siteInfoRepository";

// export async function GET() {
//   try {
//     const siteInfo = await getSiteInfo();
//     return NextResponse.json(siteInfo ? siteInfo : {});
//   } catch (error) {
//     console.error("Error fetching site information:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch site information" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: NextRequest) {
  try {
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
    const newSiteInfo = await createSiteInfo({
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

    return NextResponse.json(newSiteInfo);
  } catch (error) {
    console.error("Error adding site information:", error);
    return NextResponse.json(
      { error: "Failed to add site information" },
      { status: 500 }
    );
  }
}
