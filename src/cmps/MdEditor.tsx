"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { deleteBlogPost, saveBlogPost } from "@/services/client-api/blog";
import { useRouter } from "next/navigation";

const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MdEditor = ({ initialPost }: { initialPost?: any }) => {
  const router = useRouter();

  const [editorContent, setEditorContent] = useState(
    initialPost?.content || ""
  );
  const [title, setTitle] = useState(initialPost?.title || "");
  const [description, setDescription] = useState(
    initialPost?.description || ""
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialPost) {
      setEditorContent(initialPost.content);
      setTitle(initialPost.title);
      setDescription(initialPost.description);
    }
  }, [initialPost]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const blogPost = {
        id: initialPost?.id,
        title,
        description,
        content: editorContent,
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
    <div className="flex flex-col items-center space-y-4">
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
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
      />
      {MarkdownEditor ? (
        <MarkdownEditor
          style={{ textAlign: "right" }}
          className="min-h-[400px] max-h-[60vh] text-right w-full"
          value={editorContent}
          onChange={(value) => setEditorContent(value)}
        />
      ) : (
        "טוען עורך..."
      )}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition"
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

export default MdEditor;
