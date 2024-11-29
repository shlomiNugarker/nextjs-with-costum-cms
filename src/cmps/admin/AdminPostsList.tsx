/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogCard } from "../BlogCard";
import Link from "next/link";
// import { tableApiService } from "@/services/client-api/tableApi";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export const AdminPostsList = async () => {
  try {
    // const posts: any = await tableApiService.getAllRecords("blogsTable");
    const posts: any = await genericRepository.getAll(
      process.env.NEXT_PUBLIC_POSTGRES_SITE_ID || "1",
      "blogsTable"
    );

    return (
      <>
        <h1 className="text-4xl font-semibold text-center mb-8 text-customNavy">
          פוסטים
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center container m-auto">
          {posts.map((post: any) => (
            <div key={post.id} className="m-5 bg-white">
              <BlogCard post={post} />
              <Link
                href={`/admin/edit/blogsTable/${post.id}`}
                className="py-3 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition shadow-lg"
              >
                ערוך פוסט
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8 mb-8">
          <Link href={"/admin/add/blogsTable"}>
            <button className="py-3 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition shadow-lg">
              הוסף פוסט
            </button>
          </Link>
        </div>
      </>
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
