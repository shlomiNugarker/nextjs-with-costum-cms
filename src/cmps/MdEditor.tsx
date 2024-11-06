"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MdEditor = ({ content }: any) => {
  const [editorContent, setEditorContent] = useState(content);

  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  return (
    <MarkdownEditor
      style={{ textAlign: "right" }}
      className="min-h-[400px] max-h-[60vh] text-right"
      value={editorContent}
      onChange={(value, viewUpdate) => {
        console.log({ value, viewUpdate });
        setEditorContent(value);
      }}
    />
  );
};

export default MdEditor;
