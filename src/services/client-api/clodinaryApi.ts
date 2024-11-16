import httpService from "../httpService";

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await httpService.post("/cloudinary/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (response.data as any).url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
}

export async function getAllImagesFromCloudinary(
  folder: string
): Promise<{ url: string; public_id: string }[]> {
  try {
    const response = await httpService.get(`/cloudinary`, {
      params: { folder },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (response.data as any).images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images");
  }
}
