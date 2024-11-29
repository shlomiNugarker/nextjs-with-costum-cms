import httpService from "../httpService";

const SITE_ID = process.env.NEXT_PUBLIC_POSTGRES_SITE_ID || '1';

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
    if (SITE_ID) {
      const response = await httpService.post(`/user/`, {
        email,
        password,
        username,
        site_id: SITE_ID,
      });
      return response.data;
    }
    console.log(`siteId is not set`);
  } catch (error) {
    console.error(`Failed to create record from users`, error);
    throw new Error(`Failed to create record from users`);
  }
}
