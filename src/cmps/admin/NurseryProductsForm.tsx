"use client";

import { uploadImageToCloudinary } from "@/services/client-api/clodinaryApi";
import Image from "next/image";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  addProduct,
  deleteProductById,
  updateProduct,
} from "@/services/client-api/nurseryProductsApi";

type NurseryProduct = {
  id?: number;
  description: string | null;
  category: string | null;
  price: number;
  image_url: string | null;
  name: string;
  pot_size?: string;
};

export const NurseryProductsForm = ({
  initialProduct,
}: {
  initialProduct?: NurseryProduct;
}) => {
  const router = useRouter();

  const [product, setProduct] = useState<NurseryProduct>(
    initialProduct || {
      name: "",
      description: "",
      category: "",
      pot_size: "",
      price: 0,
      image_url: "",
    }
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setProduct((prev) => ({
        ...prev,
        [name]: name === "price" ? parseFloat(value) : value,
      }));
    },
    []
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setProduct((prev) => ({
          ...prev,
          image_url: imageUrl,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("שגיאה בהעלאת התמונה");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await handleNurseryProductSubmit(product);
    setIsSaving(false);
    router.push("/admin");
  };

  const handleNurseryProductSubmit = async (product: NurseryProduct) => {
    try {
      const isUpdate = Boolean(product.id);
      const response = isUpdate
        ? await updateProduct(product)
        : await addProduct(product);

      alert(`מוצר המשתלה ${isUpdate ? "עודכן" : "נוסף"} בהצלחה`);
      return response;
    } catch (err) {
      console.error("Error saving product:", err);
      alert("שגיאה בהוספה/עדכון מוצר המשתלה");
    }
  };

  const deleteProduct = async () => {
    if (!product.id) return;

    const confirmDelete = confirm("האם אתה בטוח שברצונך למחוק את המוצר?");
    if (!confirmDelete) return;

    try {
      await deleteProductById(product.id);
      alert("המוצר נמחק בהצלחה");
      setProduct({
        name: "",
        description: "",
        category: "",
        pot_size: "",
        price: 0,
        image_url: "",
      });
      router.push("/admin");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("שגיאה במחיקת המוצר");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 flex max-w-[500px] flex-col p-6 bg-white shadow-md rounded-lg mx-auto text-customNavy"
    >
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="שם המוצר"
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
      />
      <textarea
        name="description"
        value={product.description || ""}
        onChange={handleChange}
        placeholder="תיאור"
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
      />
      <input
        type="text"
        name="category"
        value={product.category || ""}
        onChange={handleChange}
        placeholder="קטגוריה"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
      />
      <input
        type="text"
        name="pot_size"
        value={product.pot_size}
        onChange={handleChange}
        placeholder="גודל עציץ"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="מחיר"
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
      />

      <label className="block text-sm font-semibold text-customNavy mb-2">
        תמונה:
      </label>
      <div className="relative flex flex-col items-center p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-150">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isUploading}
          className="w-full text-customGreen cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-customPeach file:text-customNavy hover:file:bg-opacity-80"
        />
        {isUploading && (
          <p className="mt-2 text-customNavy text-sm font-medium animate-pulse">
            מעלה את התמונה...
          </p>
        )}
        {product.image_url && (
          <div className="mt-4 w-32 h-32 rounded-lg overflow-hidden shadow-md">
            <Image
              src={product.image_url}
              alt="Uploaded"
              className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
              width={300}
              height={300}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className={`w-full py-3 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition ${
          isSaving ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSaving ? "שומר..." : "שמור מוצר"}
      </button>
      {product.id && (
        <button
          type="button"
          onClick={deleteProduct}
          className="w-full py-3 mt-2 bg-red-600 text-white font-bold rounded-lg hover:bg-opacity-90 transition"
        >
          מחק מוצר
        </button>
      )}
    </form>
  );
};
