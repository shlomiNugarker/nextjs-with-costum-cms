"use client";
import { updateContentBlock } from "@/services/client-api/contentBlockApi";
import React, { useState } from "react";

export const ContentBlockEditForm = ({ contentBlocks }: any) => {
  const [blocks, setBlocks] = useState(
    contentBlocks.slice().sort((a: any, b: any) => a.position - b.position)
  );

  const handleContentChange = (id: number, newContent: string) => {
    setBlocks((prevBlocks: any[]) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, content: newContent } : block
      )
    );
  };

  const handleSave = async (id: number) => {
    const block = blocks.find((b: any) => b.id === id);
    if (!block) return;

    try {
      await updateContentBlock(id, { content: block.content });
      alert("Content block updated successfully");
    } catch (error) {
      console.error("Failed to save content block:", error);
      alert("Error updating content block");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold text-center mb-8 text-customNavy">
        עריכת בלוקים בעמוד
      </h1>
      {blocks.map((block: any) => (
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
