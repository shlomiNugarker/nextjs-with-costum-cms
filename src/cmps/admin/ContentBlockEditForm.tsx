"use client";
import React, { useState, useCallback, useEffect } from "react";
import { uploadImageToCloudinary } from "@/services/client-api/clodinaryApi";
import { updateContentBlock } from "@/services/client-api/contentBlockApi";
import { TextAreaBlockEditor } from "./blocksEditors/TextAreaBlockEditor";
import { ListBlockEditor } from "./blocksEditors/ListBlockEditor";
import { safeJSONParse } from "@/services/utilService";
import { GalleryBlockEditor } from "./blocksEditors/GalleryBlockEditor";
import { FormBlockEditor } from "./blocksEditors/FormBlockEditor";
import { ImageBlockEditor } from "./blocksEditors/ImageBlockEditor";
import Link from "next/link";

type ContentBlock = {
  block_type: string;
  id: number;
  created_at: Date | null;
  page_id: number;
  content: string;
  position: number | null;
};

export type BlockEditorProps = {
  block: ContentBlock;
  onChange: (id: number, newContent: string) => void;
  loading: boolean;
  onSave: (id: number) => void;
  onError: (message: string) => void;
};

export const ContentBlockEditForm: React.FC<{
  contentBlocks: ContentBlock[] | [];
}> = ({ contentBlocks }) => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loadingBlocks, setLoadingBlocks] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setBlocks(
      contentBlocks
        .slice()
        .sort((a, b) => (a.position || 0) - (b.position || 0))
    );
  }, [contentBlocks]);

  const handleContentChange = useCallback((id: number, newContent: string) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, content: newContent } : block
      )
    );
  }, []);

  const handleUploadGalleryImage = useCallback(
    async (id: number, index: number, file: File) => {
      setLoadingBlocks((prev) => [...prev, id]);
      try {
        const uploadedUrl = await uploadImageToCloudinary(file);
        const block = blocks.find((b) => b.id === id);
        if (block && block.block_type === "gallery") {
          const gallery = safeJSONParse<string[]>(block.content) || [];
          gallery[index] = uploadedUrl;
          handleContentChange(id, JSON.stringify(gallery));
        }
      } catch (error) {
        console.error("Failed to upload image to Cloudinary:", error);
        setErrorMessage("שגיאה בהעלאת התמונה. אנא נסה שוב.");
      } finally {
        setLoadingBlocks((prev) => prev.filter((blockId) => blockId !== id));
      }
    },
    [blocks, handleContentChange]
  );

  const handleAddGalleryImage = useCallback(
    (id: number) => {
      const block = blocks.find((b) => b.id === id);
      if (block && block.block_type === "gallery") {
        const gallery = safeJSONParse<string[]>(block.content) || [];
        gallery.push("");
        handleContentChange(id, JSON.stringify(gallery));
      }
    },
    [blocks, handleContentChange]
  );

  const handleRemoveGalleryImage = useCallback(
    (id: number, index: number) => {
      const block = blocks.find((b) => b.id === id);
      if (block && block.block_type === "gallery") {
        const gallery = safeJSONParse<string[]>(block.content) || [];
        gallery.splice(index, 1);
        handleContentChange(id, JSON.stringify(gallery));
      }
    },
    [blocks, handleContentChange]
  );

  const handleSave = useCallback(
    async (id: number) => {
      const block = blocks.find((b) => b.id === id);
      if (!block) return;

      setLoadingBlocks((prev) => [...prev, id]);
      setErrorMessage("");

      try {
        if (
          ["list", "form", "gallery"].includes(block.block_type) &&
          !safeJSONParse(block.content)
        ) {
          throw new Error("Invalid JSON format");
        }

        await updateContentBlock(id, { content: block.content });

        alert("בלוק התוכן עודכן בהצלחה");
      } catch (error) {
        console.error("Failed to save content block:", error);
        setErrorMessage(
          ["list", "form", "gallery"].includes(block.block_type)
            ? "שגיאה בעדכון בלוק התוכן. ודא כי הפורמט של JSON תקין."
            : "שגיאה בעדכון בלוק התוכן"
        );
      } finally {
        setLoadingBlocks((prev) => prev.filter((blockId) => blockId !== id));
      }
    },
    [blocks]
  );

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

      {blocks.length === 0 && (
        <div
          className="p-6 border border-customPeach bg-gradient
        -to-br from-white to-gray-50 shadow-lg rounded-lg"
        >
          <label className="block text-lg font-medium text-customNavy mb-4">
            לא נמצאו בלוקים לעריכה
          </label>
        </div>
      )}

      {blocks.map((block) => {
        const loading = loadingBlocks.includes(block.id);
        return (
          <div
            key={block.id}
            className="p-6 border border-customPeach bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-lg"
          >
            <label className="block text-lg font-medium text-customNavy mb-4">
              {`ערוך ${block.block_type}`}
            </label>

            {block.block_type === "text" && (
              <TextAreaBlockEditor
                block={block}
                onChange={handleContentChange}
                loading={loading}
                onSave={handleSave}
                onError={setErrorMessage}
              />
            )}

            {block.block_type === "image" && (
              <ImageBlockEditor
                block={block}
                onChange={handleContentChange}
                loading={loading}
                onSave={handleSave}
                onError={setErrorMessage}
              />
            )}

            {block.block_type === "list" && (
              <ListBlockEditor
                block={block}
                onChange={handleContentChange}
                loading={loading}
                onSave={handleSave}
                onError={setErrorMessage}
              />
            )}

            {block.block_type === "form" && (
              <FormBlockEditor
                block={block}
                onChange={handleContentChange}
                loading={loading}
                onSave={handleSave}
                onError={setErrorMessage}
              />
            )}

            {block.block_type === "gallery" && (
              <GalleryBlockEditor
                block={block}
                onChange={handleContentChange}
                loading={loading}
                onSave={handleSave}
                onError={setErrorMessage}
                onUpload={handleUploadGalleryImage}
                onAddImage={handleAddGalleryImage}
                onRemoveImage={handleRemoveGalleryImage}
              />
            )}

            <button
              onClick={() => handleSave(block.id)}
              className={`mt-6 py-2 px-6 bg-customGreen text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition transform hover:scale-105 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "שומר..." : "שמור"}
            </button>
          </div>
        );
      })}

      <button className="block text-lg font-medium text-customNavy mt-8">
        <Link href={`/admin/add/contentBlocksTable`}>הוסף בלוק</Link>
      </button>
    </div>
  );
};
