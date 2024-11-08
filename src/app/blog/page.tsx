import { BlogCard } from "@/cmps/BlogCard";
import { getAllBlogs } from "@/services/db/repositories/blogRepository";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";

import { getPageByName } from "@/services/db/repositories/pageRepository";
import Link from "next/link";
import React from "react";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllBlogs();

  const blogPage = await getPageByName("blog");

  if (!blogPage) {
    return <div>דף הבלוג לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(blogPage.id);

  console.log({ contentBlocks });

  const headerText = contentBlocks.find(
    (block) => block.block_type === "text"
  )?.content;

  return (
    <div className="min-h-screen pt-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-customNavy">
        {blogPage.title || "הבלוג"}
      </h1>
      <p className="text-center text-gray-600 mb-8 text-2xl">
        {blogPage.description}
      </p>
      <p className="text-center text-gray-600 mb-8 text-2xl">
        {headerText ||
          "כאן תוכלו לקרוא את כל המאמרים שלנו ולהתעדכן בנושאים האחרונים"}
      </p>
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
