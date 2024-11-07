// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addProduct(product: any) {
  return fetch("/api/nursery-products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateProduct(product: any) {
  return fetch(`/api/nursery-products/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}

export async function deleteProductById(productId: number) {
  return fetch(`/api/nursery-products/${productId}`, { method: "DELETE" });
}
