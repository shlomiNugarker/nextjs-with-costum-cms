/* eslint-disable @typescript-eslint/no-unused-vars */
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
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md  mb-6">
        <p className="text-gray-500 text-sm mb-8">
          {post.created_at
            ? new Date(post.created_at).toLocaleDateString()
            : null}
        </p>
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => (
              <p className="text-customNavy" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="text-customNavy" {...props} />
            ),
            h1: ({ node, ...props }) => (
              <h1
                className="text-customNavy font-bold text-4xl mt-4 mb-2"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h1
                className="text-customNavy font-bold text-3xl mt-4 mb-2"
                {...props}
              />
            ),
          }}
          className="prose prose-lg mx-auto max-w-full text-customNavy"
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
