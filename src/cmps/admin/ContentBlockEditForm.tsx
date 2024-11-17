"use client";
import React, { useState, useCallback, useEffect } from "react";
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

type BlockEditorProps = {
  block: ContentBlock;
  onChange: (id: number, newContent: string) => void;
  loading: boolean;
  onSave: (id: number) => void;
  onError: (message: string) => void;
};

function safeJSONParse<T>(data: string): T | null {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

const TextBlockEditor: React.FC<BlockEditorProps> = ({ block, onChange }) => (
  <textarea
    value={block.content}
    onChange={(e) => onChange(block.id, e.target.value)}
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition shadow-sm"
    rows={4}
  />
);

const ImageBlockEditor: React.FC<BlockEditorProps> = ({ block, onChange }) => (
  <div>
    <input
      type="text"
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
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
);

const ListBlockEditor: React.FC<BlockEditorProps> = ({ block, onChange }) => (
  <textarea
    value={block.content}
    onChange={(e) => onChange(block.id, e.target.value)}
    placeholder='הזן פריטים בפורמט JSON, למשל: ["פריט1", "פריט2"]'
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
    rows={4}
  />
);

const FormBlockEditor: React.FC<BlockEditorProps> = ({ block, onChange }) => {
  const parsedContent = safeJSONParse<{ fields: string[] }>(block.content) || {
    fields: [],
  };

  const handleFieldChange = (index: number, newValue: string) => {
    parsedContent.fields[index] = newValue;
    onChange(block.id, JSON.stringify(parsedContent));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-customNavy mb-2">
        ערוך שדות טופס:
      </h3>
      {parsedContent.fields.map((field, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={field}
            onChange={(e) => handleFieldChange(index, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-right"
            placeholder={`ערוך שדה ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

const GalleryBlockEditor: React.FC<
  BlockEditorProps & {
    onUpload: (id: number, index: number, file: File) => void;
    onAddImage: (id: number) => void;
    onRemoveImage: (id: number, index: number) => void;
  }
> = ({ block, onChange, onUpload, onAddImage, onRemoveImage, loading }) => {
  const gallery = safeJSONParse<string[]>(block.content) || [];

  const handleImageChange = (index: number, newUrl: string) => {
    gallery[index] = newUrl;
    onChange(block.id, JSON.stringify(gallery));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-customNavy mb-2">
        ערוך גלריה:
      </h3>
      {gallery.map((imageUrl, index) => (
        <div key={index} className="mb-4 flex items-center">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => handleImageChange(index, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-right"
            placeholder="כתובת URL של תמונה"
          />
          <input
            type="file"
            onChange={(e) =>
              e.target.files && onUpload(block.id, index, e.target.files[0])
            }
            className="ml-2"
            disabled={loading}
          />
          <button
            onClick={() => onRemoveImage(block.id, index)}
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
      ))}
      <button
        onClick={() => onAddImage(block.id)}
        className="mt-2 py-1 px-4 bg-customGreen text-white font-semibold rounded-lg"
      >
        הוסף תמונה לגלריה
      </button>
    </div>
  );
};

export const ContentBlockEditForm: React.FC<{
  contentBlocks: ContentBlock[];
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
              <TextBlockEditor
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
    </div>
  );
};
