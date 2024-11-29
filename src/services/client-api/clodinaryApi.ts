import httpService from "../httpService";

export async function uploadImageToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response: { data: { url: string } } = await httpService.post(
      "/cloudinary/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
}

export async function getAllImagesFromCloudinary(folder: string) {
  try {
    const response: { data: { images: string[] } } = await httpService.get(
      `/cloudinary`,
      {
        params: { folder },
      }
    );
    return response.data.images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images");
  }
}
