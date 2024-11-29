import { connectToDatabase } from "@/config/database.config";
import { genSalt, hash } from "bcrypt-ts";
import { usersTable } from "../../schema";

const default_image_url =
  "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const initialUsers = [
  {
    username: "Shlomi Nugarker",
    site_id: 1,
    email: "shlomin1231@gmail.com",
    password: "854350",
    profile_image_url: default_image_url,
  },
  {
    username: "Netanel Debuskin",
    site_id: 1,
    email: "nati@gmail.com",
    password: "12345677",
    profile_image_url: default_image_url,
  },
  {
    username: "John Smith",
    site_id: 1,
    email: "john.smith@example.com",
    password: "mypassword",
    profile_image_url: default_image_url,
  },
];

export async function seedUsers() {
  try {
    console.log("Seeding users...");
    const db = await connectToDatabase();

    const existingUsers = await db.select().from(usersTable);

    if (existingUsers.length === 0) {
      const usersWithHashedPasswords = await Promise.all(
        initialUsers.map(async (user) => {
          const salt = await genSalt(10); // שימוש אסינכרוני ב-genSalt
          const hashPassword = await hash(user.password, salt);
          return {
            ...user,
            password: hashPassword,
          };
        })
      );

      await db.insert(usersTable).values(usersWithHashedPasswords);
      console.log("Users seeded successfully!");
    } else {
      console.log("Users already exist. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}
