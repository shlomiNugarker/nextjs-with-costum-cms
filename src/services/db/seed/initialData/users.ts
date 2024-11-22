import { connectToDatabase } from "@/config/database.config";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { users } from "../../schema";

const initialUsers = [
  {
    username: "Israel Israeli",
    email: "israel@example.com",
    password: "password123",
    profile_image_url: "https://example.com/profile1.jpg",
  },
  {
    username: "Jane Doe",
    email: "jane.doe@example.com",
    password: "securepassword",
    profile_image_url: "https://example.com/profile2.jpg",
  },
  {
    username: "John Smith",
    email: "john.smith@example.com",
    password: "mypassword",
    profile_image_url: "https://example.com/profile3.jpg",
  },
];

export async function seedUsers() {
  try {
    console.log("Seeding users...");
    const db = await connectToDatabase();

    const existingUsers = await db.select().from(users);

    if (existingUsers.length === 0) {
      const usersWithHashedPasswords = await Promise.all(
        initialUsers.map(async (user) => {
          const salt = genSaltSync(10);
          const hash = hashSync(user.password, salt);
          return {
            ...user,
            password: hash,
          };
        })
      );

      await db.insert(users).values(usersWithHashedPasswords);
      console.log("Users seeded successfully!");
    } else {
      console.log("Users already exist. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}
