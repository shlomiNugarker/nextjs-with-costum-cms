import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "hagina_bapardes" },
          (error, result) => {
            if (error || !result) {
              reject(new Error("Upload failed"));
            } else {
              resolve(result);
            }
          }
        );
        stream.pipe(uploadStream);
      }
    );

    return NextResponse.json({
      url: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Error uploading the image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const folder = searchParams.get("hagina_bapardes");

//     if (!folder) {
//       return NextResponse.json(
//         { error: "Folder name is required" },
//         { status: 400 }
//       );
//     }

//     const result = await cloudinary.api.resources({
//       type: "upload",
//       prefix: folder,
//       max_results: 100,
//     });

//     const images = result.resources.map((resource: any) => ({
//       url: resource.secure_url,
//       public_id: resource.public_id,
//     }));

//     return NextResponse.json({ images });
//   } catch (error) {
//     console.error("Error fetching images from folder:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch images" },
//       { status: 500 }
//     );
//   }
// }
