export async function getSiteInfo() {
  try {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        : "";

    const response = await fetch(`${baseUrl}/api/site-info`);
    if (!response.ok) {
      throw new Error("Failed to fetch site information");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching site information:", error);
    throw new Error("Unable to fetch site information");
  }
}

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
    const method = info.id ? "PUT" : "POST";
    const url = "/api/site-info" + (method === "PUT" ? `/${info.id}` : "");

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to ${method === "POST" ? "create" : "update"} site information`
      );
    }
    return await response.json();
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
//     const response = await fetch(`/api/site-info/${id}`, {
//       method: "DELETE",
//     });
//     if (!response.ok) {
//       throw new Error("Failed to delete site information");
//     }
//     console.log(`Site information with ID ${id} deleted successfully.`);
//   } catch (error) {
//     console.error(`Error deleting site information with ID ${id}:`, error);
//     throw new Error("Unable to delete site information");
//   }
// }
