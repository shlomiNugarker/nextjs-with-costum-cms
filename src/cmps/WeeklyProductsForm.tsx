/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

export const WeeklyProductsForm = ({
  onSubmit,
  initialProduct,
}: {
  onSubmit: (product: any) => void;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
    </form>
  );
};
