"use server";

import { genSaltSync, hashSync } from "bcrypt-ts";
import { connectToDatabase } from "../../../config/database.config";
import { eq } from "drizzle-orm";
import { users } from "../schema";

const siteId = Number(process.env.NEXT_PUBLIC_POSTGRES_SITE_ID!);

export async function getUser(email: string) {
  try {
    const db = await connectToDatabase();

    const userArray = await db
      .select({
        username: users.username,
        email: users.email,
        role: users.role,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, email));

    const { username, email: mail, role, password } = userArray[0];
    return { email: mail, role, username, password };
  } catch (error) {
    console.error("Error getting user:", error);
  }
}

export async function createUser(
  email: string,
  password: string,
  username: string,
  profile_image_url: string = "https://example.com"
) {
  try {
    const db = await connectToDatabase();
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    return await db.insert(users).values({
      email,
      password: hash,
      username,
      profile_image_url,
      site_id: siteId,
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function getAllUsers() {
  try {
    const db = await connectToDatabase();

    const allUsers = await db
      .select({
        username: users.username,
        email: users.email,
      })
      .from(users)
      .where(eq(users.site_id, siteId));

    return allUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
