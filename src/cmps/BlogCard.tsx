import Image from "next/image";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BlogCard = ({ post }: { post: any }) => {
  return (
    <Link href={`/blog/${post.id}`}>
      <article className="cursor-pointer m-auto min-h-full overflow-hidden rounded-lg pb-2 transition-transform duration-200 hover:shadow-lg">
        <Image
          width={300}
          height={300}
          className="max-h-40 w-full object-cover transition-all duration-300 group-hover:scale-125"
          alt="featured image"
          src={post.image_url || ""}
        />
        <div className="w-full bg-white p-4">
          <h1 className="mb-2 sm:text-xl font-medium text-customNavy">
            {post.title}
          </h1>
          <p className="font-light text-gray-500 mb-6 line-clamp-3">
            {post.content}
          </p>
        </div>
      </article>
    </Link>
  );
};
