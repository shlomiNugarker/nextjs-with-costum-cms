"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { deleteBlogPost, saveBlogPost } from "@/services/client-api/blogApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uploadImageToCloudinary } from "@/services/client-api/clodinaryApi";

const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PostEditor = ({ initialPost }: { initialPost?: any }) => {
  const router = useRouter();

  const [editorContent, setEditorContent] = useState(
    initialPost?.content || ""
  );
  const [title, setTitle] = useState(initialPost?.title || "");
  const [description, setDescription] = useState(
    initialPost?.description || ""
  );
  const [imageUrl, setImageUrl] = useState(initialPost?.image_url || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialPost) {
      setEditorContent(initialPost.content);
      setTitle(initialPost.title);
      setDescription(initialPost.description);
      setImageUrl(initialPost.image_url);
    }
  }, [initialPost]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const blogPost = {
        id: initialPost?.id,
        title,
        description,
        content: editorContent,
        image_url: imageUrl,
      };
      const result = await saveBlogPost(blogPost);

      alert(result.message || "הפוסט נשמר בהצלחה");
      router.push("/admin");
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("שגיאה בשמירת הפוסט");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
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
  };

  return (
    <div className="flex flex-col items-center ">
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
        className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
      />
      {isUploading && <p className="text-red-500 mt-2">מעלה את התמונה...</p>}
      {imageUrl && (
        <Image
          width={100}
          height={100}
          src={imageUrl}
          alt="Uploaded"
          className="mt-4 w-32 h-32 object-cover rounded-lg"
        />
      )}
      {MarkdownEditor ? (
        <MarkdownEditor
          style={{ textAlign: "right" }}
          minHeight="200px"
          previewWidth={"100%"}
          theme={"none"}
          className="max-h-[100vh] text-right w-[90vw] mt-7"
          value={editorContent}
          onChange={(value) => setEditorContent(value)}
        />
      ) : (
        "טוען עורך..."
      )}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="py-2 mt-5 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition"
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
