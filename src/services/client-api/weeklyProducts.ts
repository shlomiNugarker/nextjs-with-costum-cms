// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveWeeklyProduct(product: any) {
  const method = product.id ? "PUT" : "POST";
  const response = await fetch("/api/weekly-products", {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to save product");
  }
  return await response.json();
}

export async function deleteWeeklyProduct(productId: number) {
  const response = await fetch(`/api/weekly-products/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return await response.json();
}
