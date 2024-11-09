/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { savePage } from "@/services/client-api/pageApi";
import React, { useState } from "react";

export const PageEditForm = ({ initialPage }: any) => {
  const [page, setPage] = useState(initialPage);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPage((prevPage: any) => ({
      ...prevPage,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await savePage(page);
      alert("Page updated successfully");
    } catch (error) {
      console.error("Failed to save page:", error);
      alert("Error updating page");
    }
  };

  return (
    <div className="space-y-8 p-8 border border-customPeach bg-white shadow-lg rounded-lg max-w-2xl mx-auto mb-10">
      <h2 className="text-4xl font-extrabold text-center text-customNavy mb-8">
        עריכת דף
      </h2>

      <div>
        <label className="block text-lg font-semibold text-customNavy mb-2">
          שם הדף
        </label>
        <input
          type="text"
          name="name"
          value={page.name}
          // onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition placeholder-gray-400"
          placeholder="הזן את שם הדף"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-customNavy mb-2">
          כותרת
        </label>
        <input
          type="text"
          name="title"
          value={page.title}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition placeholder-gray-400"
          placeholder="הזן את כותרת הדף"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-customNavy mb-2">
          תיאור
        </label>
        <textarea
          name="description"
          value={page.description}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition placeholder-gray-400"
          rows={3}
          placeholder="הזן תיאור לדף"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-customNavy mb-2">
          כותרת מטא
        </label>
        <input
          type="text"
          name="meta_title"
          value={page.meta_title}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition placeholder-gray-400"
          placeholder="הזן כותרת מטא"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-customNavy mb-2">
          תיאור מטא
        </label>
        <textarea
          name="meta_description"
          value={page.meta_description}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition placeholder-gray-400"
          rows={3}
          placeholder="הזן תיאור מטא"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-customNavy mb-2">
          מילות מפתח
        </label>
        <input
          type="text"
          name="meta_keywords"
          value={page.meta_keywords}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition placeholder-gray-400"
          placeholder="הזן מילות מפתח (מופרדות בפסיק)"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full py-3 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mt-6 shadow-md"
      >
        שמור דף
      </button>
    </div>
  );
};
