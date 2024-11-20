"use server";

import { genSaltSync, hashSync } from "bcrypt-ts";
import { connectToDatabase } from "../../../config/database.config";
import { ensureUsersTableExists } from "../seed/users";
import { eq } from "drizzle-orm";

export async function getUser(email: string) {
  try {
    const db = await connectToDatabase();

    const users = await ensureUsersTableExists();
    const userArray = await db
      .select({
        username: users.username,
        email: users.email,
        role: users.role,
      })
      .from(users)
      .where(eq(users.email, email));

    const { username, email: mail, role } = userArray[0];
    return { email: mail, role, username };
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

// export async function getAllUsers() {
//   try {
//     const db = await connectToDatabase();

//     const users = await ensureUsersTableExists();

//     const allUsers = await db
//       .select({
//         username: users.username,
//         email: users.email,
//       })
//       .from(users);

//     return allUsers;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return [];
//   }
// }
