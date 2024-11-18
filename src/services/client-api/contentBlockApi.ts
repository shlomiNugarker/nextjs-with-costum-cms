import httpService from "../httpService";

const contentBlocksTableName = "contentBlocksTable";

export async function getContentBlocks(pageId: number) {
  try {
    const response = await httpService.get("/table/" + contentBlocksTableName, {
      params: { pageId },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch content blocks", error);
    throw new Error("Failed to fetch content blocks");
  }
}

export async function getContentBlockById(blockId: number) {
  try {
    const response = await httpService.get(
      `/table/${contentBlocksTableName}/${blockId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch content block", error);
    throw new Error("Failed to fetch content block");
  }
}

export async function updateContentBlock(
  blockId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedBlockData: any
) {
  try {
    const response = await httpService.put(
      `/table/${contentBlocksTableName}/${blockId}`,
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
    const response = await httpService.delete(
      `/table/${contentBlocksTableName}/${blockId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete content block", error);
    throw new Error("Failed to delete content block");
  }
}
