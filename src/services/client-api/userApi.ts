import httpService from "../httpService";

export const userApiService = { getUser, createUser };

async function getUser(email: string) {
  try {
    const response = await httpService.get(`/user/${email}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch record from users`, error);
    throw new Error(`Failed to fetch record from users`);
  }
}

async function createUser({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) {
  try {
    const response = await httpService.post(`/user/`,{ email, password, username });
    return response.data;
  } catch (error) {
    console.error(`Failed to create record from users`, error);
    throw new Error(`Failed to create record from users`);
  }
}
