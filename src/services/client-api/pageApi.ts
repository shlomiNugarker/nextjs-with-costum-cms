/* eslint-disable @typescript-eslint/no-explicit-any */
import httpService from "../httpService";

// export async function getPageById(pageId: number) {
//   try {
//     const response = await httpService.get(`/pages/${pageId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch page", error);
//     throw new Error("Failed to fetch page");
//   }
// }

// export async function getAllPages() {
//   try {
//     const response = await httpService.get("/pages");
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch pages", error);
//     throw new Error("Failed to fetch pages");
//   }
// }

export async function savePage(pageData: any) {
  const method = pageData.id ? "put" : "post";
  const url = pageData.id ? `/page/${pageData.id}` : `/page`;
  try {
    const response = await httpService[method](url, pageData);
    return response.data;
  } catch (error) {
    console.error("Failed to save page", error);
    throw new Error("Failed to save page");
  }
}

export async function deletePage(pageId: number) {
  try {
    const response = await httpService.delete(`/pages/${pageId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete page", error);
    throw new Error("Failed to delete page");
  }
}
