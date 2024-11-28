import { userReposiotry } from "@/services/db/repositories/userRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const record = await userReposiotry.getUser(params.email);
    return NextResponse.json(record);
  } catch (error) {
    console.error(`Error fetching records from users:`, error);
    return NextResponse.json(
      { error: `Failed to fetch records from users` },
      { status: 500 }
    );
  }
}
