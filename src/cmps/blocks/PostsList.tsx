/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { BlogCard } from "../BlogCard";
import Link from "next/link";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export const PostsList = async () => {
  const posts = await genericRepository.getAll("blogsTable");

  return (
    <div className="grid gap-4 justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pb-10">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-6 mb-9 bg-white rounded-lg shadow-lg border border-gray-200 transition-transform hover:scale-105 hover:shadow-xl max-w-[450px] animate-float"
        >
          <BlogCard post={post} />
          <Link
            href={`/page/blog/${post.id}`}
            className="mt-4 block text-center w-full py-2 px-4 bg-customGreen text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-700 transition-all"
          >
            קרא עוד
          </Link>
        </div>
      ))}
    </div>
  );
};
