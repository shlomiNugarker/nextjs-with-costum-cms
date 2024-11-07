import { genSaltSync, hashSync } from "bcrypt-ts";
import { connectToDatabase } from "../database";
import { ensureUsersTableExists } from "../seed/users";
import { eq } from "drizzle-orm";

export async function getUser(email: string) {
  try {
    const db = await connectToDatabase();

    const users = await ensureUsersTableExists();
    return await db.select().from(users).where(eq(users.email, email));
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
    const users = await ensureUsersTableExists();
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    return await db
      .insert(users)
      .values({ email, password: hash, username, profile_image_url });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
