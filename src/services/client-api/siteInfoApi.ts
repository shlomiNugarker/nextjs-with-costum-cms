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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function saveSiteInfo(info: any) {
  try {
    const method = info.id ? "put" : "post";
    const url = "/site-info" + (method === "put" ? `/${info.id}` : "");

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
