import httpService from "../httpService";

export const siteInfoApiService = {
  getSiteInfo,
  saveSiteInfo,
};

const SITE_ID = process.env.NEXT_PUBLIC_POSTGRES_SITE_ID || "1";

async function getSiteInfo() {
  try {
    const response = await httpService.get(`/site-info/` + SITE_ID);
    return response.data;
  } catch (error) {
    console.error("Error fetching site information:", error);
    throw new Error("Unable to fetch site information");
  }
}

async function saveSiteInfo(info: {
  id?: number;
  site_name: string;
  description?: string;
  address?: string;
  contact_email?: string;
  phone_number?: string;
  opening_hours?: string;
}) {
  try {
    const method = info.id ? "put" : "post";
    const url = "/siteInfo" + (method === "put" ? `/${info.id}` : "");

    const response = await httpService[method](url, info);
    return response.data;
  } catch (error) {
    console.error(
      `Error ${info.id ? "updating" : "creating"} site information:`,
      error
    );
    throw new Error(
      `Unable to ${info.id ? "update" : "create"} site information`
    );
  }
}

