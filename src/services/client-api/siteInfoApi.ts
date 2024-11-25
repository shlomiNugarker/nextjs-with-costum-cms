import httpService from "../httpService";

// export async function getSiteInfo() {
//   try {
//     const response = await httpService.get(`/table/siteInfo`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching site information:", error);
//     throw new Error("Unable to fetch site information");
//   }
// }

export async function saveSiteInfo(info: {
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
    const url = "/table/siteInfo" + (method === "put" ? `/${info.id}` : "");

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

// export async function deleteSiteInfo(id: number) {
//   try {
//     const response = await httpService.delete(`/table/siteInfo/${id}`);
//     console.log(`Site information with ID ${id} deleted successfully.`);
//   } catch (error) {
//     console.error(`Error deleting site information with ID ${id}:`, error);
//     throw new Error("Unable to delete site information");
//   }
// }
