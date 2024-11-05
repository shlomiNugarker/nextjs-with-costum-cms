/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadImageToCloudinary } from "@/lib/clodinary";

export const WeeklyProductsForm = ({
  initialProduct,
}: {
  initialProduct?: any;
}) => {
  const [product, setProduct] = useState<any>(
    initialProduct || {
      name: "",
      description: "",
      weight: "",
      category: "",
      price: 0,
      image_url: "",
    }
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev: any) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value, 10) : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setProduct((prev: any) => ({
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
    await handleWeeklyProductSubmit(product);
  };

  const handleWeeklyProductSubmit = async (product: any) => {
    try {
      const isUpdate = Boolean(product.id);
      const response = await fetch("/api/weekly-products", {
        method: isUpdate ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Failed to save product");

      alert(`מוצר התוצרת השבועית ${isUpdate ? "עודכן" : "נוסף"} בהצלחה`);
    } catch (err) {
      console.error("Error saving product:", err);
      alert("שגיאה בהוספה/עדכון מוצר התוצרת השבועית");
    }
  };

  const deleteProduct = async () => {
    if (!product.id) return;

    const confirmDelete = confirm("האם אתה בטוח שברצונך למחוק את המוצר?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/weekly-products/${product.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      const result = await response.json();
      alert(result.message || "המוצר נמחק בהצלחה");

      setProduct({
        name: "",
        description: "",
        weight: "",
        category: "",
        price: 0,
        image_url: "",
      });
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("שגיאה במחיקת המוצר");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 flex flex-col p-6 bg-white shadow-md rounded-lg w-1/2 mx-auto"
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
        value={product.description}
        onChange={handleChange}
        placeholder="תיאור"
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
      />
      <input
        type="text"
        name="weight"
        value={product.weight}
        onChange={handleChange}
        placeholder="משקל"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
      />
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="קטגוריה"
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

      <label className="block text-sm font-medium text-gray-700">תמונה:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isUploading}
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
      {isUploading && <p>מעלה את התמונה...</p>}
      {product.image_url && (
        <Image
          src={product.image_url}
          alt="Uploaded"
          className="w-32 h-32 object-cover rounded-lg mt-4"
          width={300}
          height={300}
        />
      )}

      <button
        type="submit"
        className="w-full py-3 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition"
      >
        שמור מוצר
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
