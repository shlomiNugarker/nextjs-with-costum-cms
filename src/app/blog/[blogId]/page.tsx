import React from "react";
import { getBlogById } from "@/lib/queries";
import ReactMarkdown from "react-markdown";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const { blogId } = params;
  const blog = await getBlogById(blogId);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        הבלוג לא נמצא
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-customNavy mb-4">
          {blog.title}
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          {blog.created_at
            ? new Date(blog.created_at).toLocaleDateString()
            : null}
        </p>
        <p className="text-gray-700 text-lg mb-6">{blog.description}</p>
        <ReactMarkdown className="prose prose-lg max-w-full text-gray-800">
          {blog.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
