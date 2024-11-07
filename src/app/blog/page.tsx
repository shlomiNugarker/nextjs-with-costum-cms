import { BlogCard } from "@/cmps/BlogCard";
import { getAllBlogs } from "@/services/db/repositories/blogRepository";
import Link from "next/link";
import React from "react";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllBlogs();
  return (
    <div className="min-h-screen pt-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-customNavy">
        הבלוג
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id}>
            <BlogCard post={post} />
            <Link href={`/blog/${post.id}`}>קרא עוד</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
