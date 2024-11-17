"use client";
import { savePage } from "@/services/client-api/pageApi";
import React, { useState } from "react";

type Page = {
  id?: number;
  name: string;
  description: string | null;
  created_at: Date | null;
  title: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
};

export const PageEditForm = ({
  initialPage,
}: {
  initialPage: Page | undefined;
}) => {
  const [page, setPage] = useState<Page>(
    initialPage || {
      name: "",
      description: null,
      created_at: null,
      title: null,
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
    }
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPage((prevPage) => ({
      ...prevPage,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await savePage(page);
      alert("הדף עודכן בהצלחה");
    } catch (error) {
      console.error("Failed to save page:", error);
      alert("שגיאה בעדכון הדף");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full space-y-8 p-8 border border-customPeach bg-white shadow-lg rounded-lg max-w-2xl mx-auto mb-10  text-customNavy">
      <h2 className="text-4xl font-extrabold text-center text-customNavy mb-8">
        עריכת דף
      </h2>

      {page.name !== "home" ||
        (!initialPage && (
          <div>
            <label className="block text-lg font-semibold text-customNavy mb-2">
              שם הדף (באנגלית)
            </label>
            <input
              type="text"
              name="name"
              value={page.name}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition placeholder-gray-400"
              placeholder="הזן את שם הדף לדוגמא: home, contact או blog"
            />
          </div>
        ))}

      <div>
        <label className="block text-lg font-semibold text-customNavy mb-2">
          כותרת
        </label>
        <input
          type="text"
          name="title"
          value={page.title || ""}
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
          value={page.description || ""}
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
          value={page.meta_title || ""}
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
          value={page.meta_description || ""}
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
          value={page.meta_keywords || ""}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition placeholder-gray-400"
          placeholder="הזן מילות מפתח (מופרדות בפסיק)"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`w-full py-3 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mt-6 shadow-md ${
          isSaving ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSaving ? "שומר..." : "שמור דף"}
      </button>
    </div>
  );
};
