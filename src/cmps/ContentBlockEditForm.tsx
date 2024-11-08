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
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Edit Blocks</h1>
      {blocks.map((block: any) => (
        <div
          key={block.id}
          className="p-4 border border-gray-300 rounded-lg mb-4"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {`Edit ${block.block_type}`}
          </label>

          {block.block_type === "text" && (
            <textarea
              value={block.content}
              onChange={(e) => handleContentChange(block.id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={4}
            />
          )}

          {block.block_type === "image" && (
            <input
              type="text"
              value={block.content}
              onChange={(e) => handleContentChange(block.id, e.target.value)}
              placeholder="Image URL"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          )}

          {block.block_type === "list" && (
            <textarea
              value={block.content}
              onChange={(e) => handleContentChange(block.id, e.target.value)}
              placeholder='Enter list items as JSON array, e.g., ["item1", "item2"]'
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={4}
            />
          )}

          <button
            onClick={() => handleSave(block.id)}
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
};
