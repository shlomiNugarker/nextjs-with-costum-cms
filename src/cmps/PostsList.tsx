/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
// import { tableApiService } from "@/services/client-api/tableApi";
import { genericRepository } from "@/services/db/repositories/genericRepository";
import { BlogCard } from "./BlogCard";

export const PostsList = async () => {
  try {
    // const posts: any = await tableApiService.getAllRecords("blogsTable");
    const posts: any = await genericRepository.getAll(
      process.env.NEXT_PUBLIC_POSTGRES_SITE_ID || "1",
      "blogsTable"
    );

    return (
      <div className="grid gap-4 justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pb-10">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="p-6 mb-9 bg-white rounded-lg shadow-lg border border-gray-200 transition-transform hover:scale-105 hover:shadow-xl max-w-[450px]"
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
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return (
      <div className="text-red-500 text-center mt-8">
        שגיאה בטעינת הפוסטים. נסה שוב מאוחר יותר.
      </div>
    );
  }
};
