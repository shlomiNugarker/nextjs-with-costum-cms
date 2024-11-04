"use client";
import { useState } from "react";
import Image from "next/image";

export function ImageUploader({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "hagina_bapardes");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/duajg3ah1/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUpload(data.secure_url);
      alert("התמונה הועלתה בהצלחה!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("שגיאה בהעלאת התמונה");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-lg shadow-md"
          width={200}
          height={200}
        />
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedImage || isUploading}
        className="py-2 px-4 bg-customGreen text-white font-semibold rounded-lg hover:bg-opacity-90 transition"
      >
        {isUploading ? "מעלה תמונה..." : "העלה תמונה"}
      </button>
    </div>
  );
}
