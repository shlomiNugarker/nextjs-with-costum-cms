import { genSaltSync, hashSync } from "bcrypt-ts";
import { connectToDatabase } from "../../../config/database.config";
import { eq } from "drizzle-orm";
import { usersTable } from "../schema";

const siteId = Number(process.env.NEXT_PUBLIC_POSTGRES_SITE_ID!);

export const userReposiotry = { getUser, createUser, getAllUsers };

async function getUser(email: string) {
  try {
    const db = await connectToDatabase();

    const userArray = await db
      .select({
        username: usersTable.username,
        email: usersTable.email,
        role: usersTable.role,
        password: usersTable.password,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    const { username, email: mail, role, password } = userArray[0];
    return { email: mail, role, username, password };
  } catch (error) {
    console.error("Error getting user:", error);
  }
}

async function createUser(
  email: string,
  password: string,
  username: string,
  profile_image_url: string = "https://example.com"
) {
  try {
    const db = await connectToDatabase();
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    return await db.insert(usersTable).values({
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

async function getAllUsers() {
  try {
    const db = await connectToDatabase();

    const allUsers = await db
      .select({
        username: usersTable.username,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.site_id, siteId));

    return allUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
