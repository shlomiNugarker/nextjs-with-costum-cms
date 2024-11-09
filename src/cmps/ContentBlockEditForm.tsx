"use client";
import React, { useState } from "react";
import { updateContentBlock } from "@/services/client-api/contentBlockApi";

type ContentBlock = {
  id: number;
  position: number;
  block_type: "text" | "image" | "list" | "form";
  content: string;
};

export const ContentBlockEditForm = ({
  contentBlocks,
}: {
  contentBlocks: ContentBlock[];
}) => {
  const [blocks, setBlocks] = useState(
    contentBlocks.slice().sort((a, b) => (a.position || 0) - (b.position || 0))
  );

  const handleContentChange = (id: number, newContent: string) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, content: newContent } : block
      )
    );
  };

  const handleSave = async (id: number) => {
    const block = blocks.find((b) => b.id === id);
    if (!block) return;

    try {
      if (block.block_type === "list" || block.block_type === "form") {
        JSON.parse(block.content);
      }

      await updateContentBlock(id, { content: block.content });
      alert("Content block updated successfully");
    } catch (error) {
      console.error("Failed to save content block:", error);
      alert(
        block.block_type === "list" || block.block_type === "form"
          ? "Error updating content block. Ensure JSON format is correct."
          : "Error updating content block"
      );
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold text-center mb-8 text-customNavy">
        עריכת בלוקים בעמוד
      </h1>
      {blocks.map((block) => (
        <div
          key={block.id}
          className="p-6 border border-customPeach bg-white shadow-md rounded-lg"
        >
          <label className="block text-lg font-medium text-customNavy mb-4">
            {`ערוך ${block.block_type}`}
          </label>
          {block.block_type === "text" && (
            <textarea
              value={block.content}
              onChange={(e) => handleContentChange(block.id, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
              rows={4}
            />
          )}
          {block.block_type === "image" && (
            <input
              type="text"
              value={block.content}
              onChange={(e) => handleContentChange(block.id, e.target.value)}
              placeholder="כתובת URL של התמונה"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
            />
          )}
          {block.block_type === "list" && (
            <textarea
              value={block.content}
              onChange={(e) => handleContentChange(block.id, e.target.value)}
              placeholder='הזן פריטים בפורמט JSON, למשל: ["פריט1", "פריט2"]'
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
              rows={4}
            />
          )}
          {block.block_type === "form" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                הגדרת שדות טופס (בפורמט JSON)
              </label>
              <textarea
                value={block.content}
                onChange={(e) => handleContentChange(block.id, e.target.value)}
                placeholder='Enter form fields as JSON array, e.g., {"fields":["שם","דוא"ל","הודעה"]}'
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
                rows={4}
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-customNavy mb-2">
                  תצוגה מקדימה של שדות הטופס:
                </h3>
                {JSON.parse(block.content).fields.map(
                  (field: string, index: number) => (
                    <div key={index} className="mb-2">
                      <label className="block text-sm font-medium text-gray-600 text-right">
                        {field}
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg text-right"
                        placeholder={`הזן ${field}`}
                        disabled
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          <button
            onClick={() => handleSave(block.id)}
            className="mt-6 py-2 px-6 bg-customGreen text-white font-semibold rounded-lg shadow hover:bg-opacity-90 transition"
          >
            שמור
          </button>
        </div>
      ))}
    </div>
  );
};
