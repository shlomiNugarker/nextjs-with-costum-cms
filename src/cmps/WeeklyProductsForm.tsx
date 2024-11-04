/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="שם המוצר"
        required
        className="input-style"
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="תיאור"
        required
        className="textarea-style"
      />
      <input
        type="text"
        name="weight"
        value={product.weight}
        onChange={handleChange}
        placeholder="משקל"
        className="input-style"
      />
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="קטגוריה"
        className="input-style"
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="מחיר"
        required
        className="input-style"
      />
      <input
        type="text"
        name="image_url"
        value={product.image_url}
        onChange={handleChange}
        placeholder="כתובת תמונה"
        className="input-style"
      />
      <button type="submit" className="btn-save">
        שמור מוצר
      </button>
      {product.id && (
        <button
          type="button"
          onClick={deleteProduct}
          className="btn-delete mt-4 text-red-600"
        >
          מחק מוצר
        </button>
      )}
    </form>
  );
};
