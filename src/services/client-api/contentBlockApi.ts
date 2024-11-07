export async function getContentBlocks(pageId: number) {
  const response = await fetch(`/api/content-blocks?pageId=${pageId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch content blocks");
  }
  return await response.json();
}

export async function getContentBlockById(blockId: number) {
  const response = await fetch(`/api/content-blocks/${blockId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch content block");
  }
  return await response.json();
}

export async function updateContentBlock(
  blockId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedBlockData: any
) {
  const response = await fetch(`/api/content-blocks/${blockId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBlockData),
  });

  if (!response.ok) {
    throw new Error("Failed to update content block");
  }

  return await response.json();
}

export async function deleteContentBlock(blockId: number) {
  const response = await fetch(`/api/content-blocks/${blockId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete content block");
  }

  return await response.json();
}
