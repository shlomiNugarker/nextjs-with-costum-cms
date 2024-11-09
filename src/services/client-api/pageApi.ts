/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getPageById(pageId: number) {
  const response = await fetch(`/api/pages/${pageId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch page");
  }
  return await response.json();
}

export async function getAllPages() {
  const response = await fetch(`/api/pages`);
  if (!response.ok) {
    throw new Error("Failed to fetch pages");
  }
  return await response.json();
}

export async function savePage(pageData: any) {
  const method = pageData.id ? "PUT" : "POST";
  const url = pageData.id ? `/api/page/${pageData.id}` : `/api/page`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pageData),
  });

  if (!response.ok) {
    throw new Error("Failed to save page");
  }

  return await response.json();
}

export async function deletePage(pageId: number) {
  const response = await fetch(`/api/pages/${pageId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete page");
  }

  return await response.json();
}
