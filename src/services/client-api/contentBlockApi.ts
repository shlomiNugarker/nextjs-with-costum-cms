import httpService from "../httpService";

// export async function getContentBlocks(pageId: number) {
//   try {
//     const response = await httpService.get("/content-blocks", {
//       params: { pageId },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch content blocks", error);
//     throw new Error("Failed to fetch content blocks");
//   }
// }

// export async function getContentBlockById(blockId: number) {
//   try {
//     const response = await httpService.get(`/content-blocks/${blockId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch content block", error);
//     throw new Error("Failed to fetch content block");
//   }
// }

export async function updateContentBlock(
  blockId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedBlockData: any
) {
  try {
    const response = await httpService.put(
      `/content-blocks/${blockId}`,
      updatedBlockData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update content block", error);
    throw new Error("Failed to update content block");
  }
}

export async function deleteContentBlock(blockId: number) {
  try {
    const response = await httpService.delete(`/content-blocks/${blockId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete content block", error);
    throw new Error("Failed to delete content block");
  }
}
