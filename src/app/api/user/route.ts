import { userReposiotry } from "@/services/db/repositories/userRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    await userReposiotry.createUser(data.email, data.password, data.username);
    return NextResponse.json(
      { message: `Record added successfully to users` },
      { status: 201 }
    );
  } catch (error) {
    console.error(`Error adding record to users:`, error);
    return NextResponse.json(
      { error: `Failed to add record to users` },
      { status: 500 }
    );
  }
}
