import httpService from "../httpService";

export const siteInfoApiService = {
  getSiteInfo,
  saveSiteInfo,
};

const siteId = process.env.NEXT_PUBLIC_POSTGRES_SITE_ID || "1";

async function getSiteInfo() {
  try {
    const response = await httpService.get(`/site-info/` + siteId);
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

//  async function deleteSiteInfo(id: number) {
//   try {
//     const response = await httpService.delete(`/api/table/siteInfo/${id}`);
//     console.log(`Site information with ID ${id} deleted successfully.`);
//   } catch (error) {
//     console.error(`Error deleting site information with ID ${id}:`, error);
//     throw new Error("Unable to delete site information");
//   }
// }
