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
    <div className="space-y-6 p-6 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Page</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Page Name
        </label>
        <input
          type="text"
          name="name"
          value={page.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={page.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={page.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meta Title
        </label>
        <input
          type="text"
          name="meta_title"
          value={page.meta_title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meta Description
        </label>
        <textarea
          name="meta_description"
          value={page.meta_description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meta Keywords
        </label>
        <input
          type="text"
          name="meta_keywords"
          value={page.meta_keywords}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Save Page
      </button>
    </div>
  );
};
