import { BlockRenderer } from "@/cmps/BlockRenderer";
import { BlogCard } from "@/cmps/BlogCard";
import { getAllBlogs } from "@/services/db/repositories/blogRepository";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllBlogs();
  const blogPage = await getPageByName("blog");

  if (!blogPage) {
    return <div>דף הבלוג לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(blogPage.id);
  const sortedBlocks = contentBlocks.sort(
    (a, b) => (a.position || 0) - (b.position || 0)
  );

  return (
    <div className="min-h-screen pt-20 px-4 container m-auto">
      <h1 className="text-4xl font-bold text-center mb-12 text-customNavy">
        {blogPage.title || "הבלוג"}
      </h1>
      <p className="text-center text-gray-600 mb-8 text-2xl">
        {blogPage.description}
      </p>

      {sortedBlocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}

      <div className="grid gap-24 justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pb-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 transition-transform hover:scale-105 hover:shadow-xl max-w-[450px] "
          >
            <BlogCard post={post} />
            <Link
              href={`/blog/${post.id}`}
              className="mt-4 block text-center w-full py-2 px-4 bg-customGreen text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-700 transition-all"
            >
              קרא עוד
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
