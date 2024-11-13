import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder");

    if (!folder) {
      return NextResponse.json(
        { error: "Folder name is required" },
        { status: 400 }
      );
    }

    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      max_results: 100,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const images = result.resources.map((resource: any) => ({
      url: resource.secure_url,
      public_id: resource.public_id,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error fetching images from folder:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
