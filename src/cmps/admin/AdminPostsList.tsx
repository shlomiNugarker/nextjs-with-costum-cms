import { genericRepository } from "@/services/db/repositories/genericRepository";
import { BlogCard } from "../BlogCard";
import Link from "next/link";

export const AdminPostsList = async () => {
  const posts = await genericRepository.getAll("blogsTable");

  return (
    <>
      <h1 className="text-4xl font-semibold text-center mb-8 text-customNavy">
        פוסטים
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center container m-auto">
        {posts.map((post) => (
          <div key={post.id} className="m-5 bg-white">
            <BlogCard post={post} />
            <Link
              href={`/admin/blog/edit-post/${post.id}`}
              className="py-3 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition shadow-lg"
            >
              ערוך פוסט
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 mb-8">
        <Link href={"blog/add-post"}>
          <button className="py-3 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition shadow-lg">
            הוסף פוסט
          </button>
        </Link>
      </div>
    </>
  );
};
