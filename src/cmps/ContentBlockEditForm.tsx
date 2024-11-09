"use client";
import React, { useState } from "react";
import { updateContentBlock } from "@/services/client-api/contentBlockApi";

type ContentBlock = {
  block_type: string;
  id: number;
  created_at: Date | null;
  page_id: number;
  content: string;
  position: number | null;
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

  const handleFormFieldChange = (
    id: number,
    index: number,
    newValue: string
  ) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === id && block.block_type === "form") {
          const parsedContent = JSON.parse(block.content);
          parsedContent.fields[index] = newValue;
          return { ...block, content: JSON.stringify(parsedContent) };
        }
        return block;
      })
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
    <div className="space-y-8 p-8 border border-customPeach bg-white shadow-lg rounded-lg max-w-2xl mx-auto mb-10  text-customNavy">
      <h1 className="text-4xl font-semibold text-center mb-8 text-customNavy">
        עריכת בלוקים בעמוד
      </h1>
      {blocks.map((block) => (
        <div
          key={block.id}
          className="p-6 border border-customPeach bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-lg"
        >
          <label className="block text-lg font-medium text-customNavy mb-4">
            {`ערוך ${block.block_type}`}
          </label>

          {block.block_type === "text" && (
            <textarea
              value={block.content}
              onChange={(e) => handleContentChange(block.id, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition shadow-sm"
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
              <h3 className="text-lg font-semibold text-customNavy mb-2">
                ערוך שדות טופס:
              </h3>
              {JSON.parse(block.content).fields.map(
                (field: string, index: number) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      value={field}
                      onChange={(e) =>
                        handleFormFieldChange(block.id, index, e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg text-right"
                      placeholder={`ערוך שדה ${index + 1}`}
                    />
                  </div>
                )
              )}
            </div>
          )}

          <button
            onClick={() => handleSave(block.id)}
            className="mt-6 py-2 px-6 bg-customGreen text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition transform hover:scale-105"
          >
            שמור
          </button>
        </div>
      ))}
    </div>
  );
};
