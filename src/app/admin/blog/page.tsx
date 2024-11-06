import { BlogCard } from "@/cmps/BlogCard";
import { getAllBlogs } from "@/lib/queries";
import Link from "next/link";

export const revalidate = 5;

export default async function BlogPage() {
  const posts = await getAllBlogs();

  return (
    <section className="min-h-screen pt-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-customNavy">
        הבלוג
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id}>
            <BlogCard post={post} />
            <Link
              href={`/admin/blog/edit-post/${post.id}`}
              className="block h-full w-full"
            >
              ערוך פוסט
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href={"blog/add-post"}>
          <button className="py-3 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition shadow-lg">
            הוסף פוסט
          </button>
        </Link>
      </div>
    </section>
  );
}
