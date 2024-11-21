"use server";

import { getClient } from "../../../config/database.config";

export async function seedInitialUsers() {
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

  const client = await getClient();

  const insertPromises = initialUsers.map((user) =>
    client
      ? client`
        INSERT INTO users (username, email, password, profile_image_url)
        VALUES (${user.username}, ${user.email}, ${user.password}, ${user.profile_image_url});`
      : null
  );

  await Promise.all(insertPromises);

  console.log("Initial users added to users table.");
}
