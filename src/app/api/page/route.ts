import { NextRequest, NextResponse } from "next/server";
import {
  // getAllPages,
  savePage,
} from "@/services/db/repositories/pageRepository";

// export async function GET() {
//   try {
//     const pages = await getAllPages();
//     return NextResponse.json(pages);
//   } catch (error) {
//     console.error("Error fetching all pages:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch pages" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const newPage = await savePage(data);
    return NextResponse.json(newPage);
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json(
      { message: "Failed to create page" },
      { status: 500 }
    );
  }
}
