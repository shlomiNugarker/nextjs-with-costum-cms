/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
// import { ImageUploader } from "./ImageUploader";

export const NurseryProductsForm = ({
  initialProduct,
}: {
  initialProduct?: any;
}) => {
  const [product, setProduct] = useState<any>(
    initialProduct || {
      name: "",
      description: "",
      category: "",
      pot_size: "",
      price: 0,
      image_url: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev: any) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleNurseryProductSubmit(product);
  };

  const handleNurseryProductSubmit = async (product: any) => {
    try {
      console.log({ product });

      const isUpdate = Boolean(product.id);
      const response = await fetch("/api/nursery-products", {
        method: isUpdate ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Failed to save product");

      alert(`מוצר המשתלה ${isUpdate ? "עודכן" : "נוסף"} בהצלחה`);
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
      const response = await fetch(`/api/nursery-products/${product.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      const result = await response.json();
      alert(result.message || "המוצר נמחק בהצלחה");

      setProduct({
        name: "",
        description: "",
        category: "",
        pot_size: "",
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
      className="space-y-6 flex flex-col p-6 bg-white shadow-md rounded-lg min-w-full mx-auto text-customNavy"
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
        name="category"
        value={product.category}
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
      <input
        type="text"
        name="image_url"
        value={product.image_url}
        onChange={handleChange}
        placeholder="כתובת תמונה"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
      />
      {/* <ImageUploader
        onUpload={(url) => {
          console.log(url);
        }}
      ></ImageUploader> */}
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
