"use client";
import React, { useState, useCallback } from "react";
import { updateContentBlock } from "@/services/client-api/contentBlockApi";
import Image from "next/image";
import { uploadImageToCloudinary } from "@/services/client-api/clodinaryApi";

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
  const [loadingBlocks, setLoadingBlocks] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const safeJSONParse = (data: string) => {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  const handleContentChange = useCallback((id: number, newContent: string) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, content: newContent } : block
      )
    );
  }, []);

  const handleFormFieldChange = useCallback(
    (id: number, index: number, newValue: string) => {
      setBlocks((prevBlocks) =>
        prevBlocks.map((block) => {
          if (block.id === id && block.block_type === "form") {
            const parsedContent = safeJSONParse(block.content) || {
              fields: [],
            };
            parsedContent.fields[index] = newValue;
            return { ...block, content: JSON.stringify(parsedContent) };
          }
          return block;
        })
      );
    },
    []
  );

  const handleGalleryChange = useCallback(
    (id: number, index: number, newUrl: string) => {
      setBlocks((prevBlocks) =>
        prevBlocks.map((block) => {
          if (block.id === id && block.block_type === "gallery") {
            const gallery = safeJSONParse(block.content) || [];
            gallery[index] = newUrl;
            return { ...block, content: JSON.stringify(gallery) };
          }
          return block;
        })
      );
    },
    []
  );

  const handleAddGalleryImage = useCallback((id: number) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === id && block.block_type === "gallery") {
          const gallery = safeJSONParse(block.content) || [];
          gallery.push(""); // Add an empty URL
          return { ...block, content: JSON.stringify(gallery) };
        }
        return block;
      })
    );
  }, []);

  const handleRemoveGalleryImage = useCallback((id: number, index: number) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === id && block.block_type === "gallery") {
          const gallery = safeJSONParse(block.content) || [];
          gallery.splice(index, 1); // Remove the image URL at the given index
          return { ...block, content: JSON.stringify(gallery) };
        }
        return block;
      })
    );
  }, []);

  const handleUploadGalleryImage = async (
    id: number,
    index: number,
    file: File
  ) => {
    setLoadingBlocks((prev) => [...prev, id]);
    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      handleGalleryChange(id, index, uploadedUrl);
    } catch (error) {
      console.error("Failed to upload image to Cloudinary:", error);
      setErrorMessage("שגיאה בהעלאת התמונה. אנא נסה שוב.");
    } finally {
      setLoadingBlocks((prev) => prev.filter((blockId) => blockId !== id));
    }
  };

  const handleSave = async (id: number) => {
    const block = blocks.find((b) => b.id === id);
    if (!block) return;

    setLoadingBlocks((prev) => [...prev, id]);
    setErrorMessage("");

    try {
      if (
        block.block_type === "list" ||
        block.block_type === "form" ||
        block.block_type === "gallery"
      ) {
        const parsedContent = safeJSONParse(block.content);
        if (!parsedContent) {
          throw new Error("Invalid JSON format");
        }
      }

      await updateContentBlock(id, { content: block.content });
      alert("בלוק התוכן עודכן בהצלחה");
    } catch (error) {
      console.error("Failed to save content block:", error);
      setErrorMessage(
        block.block_type === "list" ||
          block.block_type === "form" ||
          block.block_type === "gallery"
          ? "שגיאה בעדכון בלוק התוכן. ודא כי הפורמט של JSON תקין."
          : "שגיאה בעדכון בלוק התוכן"
      );
    } finally {
      setLoadingBlocks((prev) => prev.filter((blockId) => blockId !== id));
    }
  };

  return (
    <div className="space-y-8 p-8 border border-customPeach bg-white shadow-lg rounded-lg max-w-2xl mx-auto mb-10 text-customNavy w-full">
      <h1 className="text-4xl font-semibold text-center mb-8 text-customNavy">
        עריכת בלוקים בעמוד
      </h1>
      {errorMessage && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
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
            <div>
              <input
                type="text"
                value={block.content}
                onChange={(e) => handleContentChange(block.id, e.target.value)}
                placeholder="כתובת URL של התמונה"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
              />
              {block.content && (
                <Image
                  src={block.content}
                  width={100}
                  height={100}
                  alt="Selected"
                  className="mt-4 max-w-full h-auto rounded-lg shadow-md"
                />
              )}
            </div>
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
              {(safeJSONParse(block.content)?.fields || []).map(
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

          {block.block_type === "gallery" && (
            <div>
              <h3 className="text-lg font-semibold text-customNavy mb-2">
                ערוך גלריה:
              </h3>
              {(safeJSONParse(block.content) || []).map(
                (imageUrl: string, index: number) => (
                  <div key={index} className="mb-4 flex items-center">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) =>
                        handleGalleryChange(block.id, index, e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg text-right"
                      placeholder="כתובת URL של תמונה"
                    />
                    <input
                      type="file"
                      onChange={(e) =>
                        e.target.files &&
                        handleUploadGalleryImage(
                          block.id,
                          index,
                          e.target.files[0]
                        )
                      }
                      className="ml-2"
                      disabled={loadingBlocks.includes(block.id)}
                    />
                    <button
                      onClick={() => handleRemoveGalleryImage(block.id, index)}
                      className="ml-2 p-2 bg-red-500 text-white rounded-lg"
                    >
                      הסר
                    </button>
                    {imageUrl && (
                      <Image
                        width={100}
                        height={100}
                        src={imageUrl}
                        alt={`Gallery item ${index + 1}`}
                        className="ml-4 max-w-xs h-auto rounded-lg shadow-md"
                      />
                    )}
                  </div>
                )
              )}
              <button
                onClick={() => handleAddGalleryImage(block.id)}
                className="mt-2 py-1 px-4 bg-customGreen text-white font-semibold rounded-lg"
              >
                הוסף תמונה לגלריה
              </button>
            </div>
          )}

          <button
            onClick={() => handleSave(block.id)}
            className={`mt-6 py-2 px-6 bg-customGreen text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition transform hover:scale-105 ${
              loadingBlocks.includes(block.id)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={loadingBlocks.includes(block.id)}
          >
            {loadingBlocks.includes(block.id) ? "שומר..." : "שמור"}
          </button>
        </div>
      ))}
    </div>
  );
};
