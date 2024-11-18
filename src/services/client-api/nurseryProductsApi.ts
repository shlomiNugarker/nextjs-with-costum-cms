import httpService from "../httpService";

const nurseryProductsTableName = "nurseryProductsTable";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addProduct(product: any) {
  try {
    const response = await httpService.post(
      "/table/" + nurseryProductsTableName,
      product
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add product", error);
    throw new Error("Failed to add product");
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateProduct(product: any) {
  try {
    const response = await httpService.put(
      `/table/${nurseryProductsTableName}/${product.id}`,
      product
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update product", error);
    throw new Error("Failed to update product");
  }
}

export async function deleteProductById(productId: number) {
  try {
    const response = await httpService.delete(
      `/table/${nurseryProductsTableName}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete product", error);
    throw new Error("Failed to delete product");
  }
}
