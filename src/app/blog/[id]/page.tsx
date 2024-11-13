import { getBlogById } from "@/services/db/repositories/blogRepository";
import React from "react";
import ReactMarkdown from "react-markdown";

export const revalidate = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const { id } = params;
  const post = await getBlogById(id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        הבלוג לא נמצא
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* <h1 className="text-4xl font-bold text-customNavy mb-4">
          {post.title}
        </h1> */}
        <p className="text-gray-500 text-sm mb-8">
          {post.created_at
            ? new Date(post.created_at).toLocaleDateString()
            : null}
        </p>
        {/* <p className="text-customNavy text-lg mb-6">{post.description}</p> */}
        <ReactMarkdown className="prose prose-lg mx-auto max-w-full text-customNavy">
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
