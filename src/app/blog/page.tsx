import { getAllBlogs } from "@/lib/queries";
import Link from "next/link";
import React from "react";

export const revalidate = 60;

export default async function BlogPage() {
  const blogs = await getAllBlogs();
  return (
    <div className="min-h-screen pt-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-customNavy">
        הבלוג
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-customNavy mb-4">
              {blog.title}
            </h2>
            <p className="text-gray-600 mb-6 line-clamp-3">
              {blog.description}
            </p>
            <Link
              href={`/blog/${blog.id}`}
              className="text-customGreen font-bold hover:underline"
            >
              קרא עוד
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
