"use client";
import React, { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { deleteBlogPost, saveBlogPost } from "@/services/client-api/blogApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uploadImageToCloudinary } from "@/services/client-api/clodinaryApi";

const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});

type BlogPost = {
  id: number | undefined;
  description: string | null;
  title: string;
  content: string;
  image_url: string | null;
};

export const PostEditor = ({
  initialPost,
}: {
  initialPost?: BlogPost | null;
}) => {
  const router = useRouter();

  const [editorContent, setEditorContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (initialPost) {
      setEditorContent(initialPost.content || "");
      setTitle(initialPost.title || "");
      setDescription(initialPost.description || "");
      setImageUrl(initialPost.image_url || "");
    }
  }, [initialPost]);

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          const uploadedImageUrl = await uploadImageToCloudinary(file);
          setImageUrl(uploadedImageUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("שגיאה בהעלאת התמונה");
        } finally {
          setIsUploading(false);
        }
      }
    },
    []
  );

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const blogPost: BlogPost = {
        id: initialPost?.id,
        title,
        description,
        content: editorContent,
        image_url: imageUrl,
      };
      await saveBlogPost(blogPost);

      alert("הפוסט נשמר בהצלחה");
      router.push("/admin");
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("שגיאה בשמירת הפוסט");
    } finally {
      setIsSaving(false);
    }
  }, [initialPost?.id, title, description, editorContent, imageUrl, router]);

  const handleDelete = useCallback(async () => {
    if (!initialPost?.id) return;

    const confirmDelete = confirm("האם אתה בטוח שברצונך למחוק את הפוסט?");
    if (!confirmDelete) return;

    try {
      await deleteBlogPost(initialPost.id);
      alert("הפוסט נמחק בהצלחה");
      router.push("/admin");
    } catch (error) {
      console.error("Error deleting blog post:", error);
      alert("שגיאה במחיקת הפוסט");
    }
  }, [initialPost?.id, router]);

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="כותרת הפוסט"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="תיאור הפוסט"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen mt-4"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isUploading}
        className="bg-white w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
      />
      {isUploading && (
        <p className="text-customNavy mt-2 animate-pulse">מעלה את התמונה...</p>
      )}
      {imageUrl && (
        <div className="mt-4 w-32 h-32 rounded-lg overflow-hidden shadow-md">
          <Image
            width={128}
            height={128}
            src={imageUrl}
            alt="Uploaded"
            className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
          />
        </div>
      )}
      <div className="w-full mt-7">
        <MarkdownEditor
          style={{ textAlign: "right" }}
          minHeight="200px"
          previewWidth="100%"
          theme="none"
          className="max-h-[100vh] text-right w-full"
          value={editorContent}
          onChange={(value) => setEditorContent(value)}
        />
      </div>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`py-2 mt-5 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition ${
          isSaving ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSaving ? "שומר..." : "שמור פוסט"}
      </button>

      {initialPost?.id && (
        <button
          onClick={handleDelete}
          className="py-2 px-6 bg-red-600 text-white font-bold rounded-lg hover:bg-opacity-90 transition mt-2"
        >
          מחק פוסט
        </button>
      )}
    </div>
  );
};
