export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/upload/cloudinary", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function getAllImagesFromCloudinary(
  folder: string
): Promise<{ url: string; public_id: string }[]> {
  try {
    const response = await fetch(`/api/cloudinary/?folder=${folder}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();
    return data.images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}
