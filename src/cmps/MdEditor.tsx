"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MdEditor = ({ initialPost }: { initialPost?: any }) => {
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
      const response = await fetch("/api/blog", {
        method: initialPost?.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: initialPost?.id,
          title,
          description,
          content: editorContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save blog post");
      }

      const result = await response.json();
      alert(result.message || "הפוסט נשמר בהצלחה");
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("שגיאה בשמירת הפוסט");
    } finally {
      setIsSaving(false);
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
    </div>
  );
};

export default MdEditor;
