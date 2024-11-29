/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { tableApiService } from "@/services/client-api/tableApi";
import { genericRepository } from "@/services/db/repositories/genericRepository";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

interface Params {
  params: {
    slug: string;
    blogId: string;
  };
}

export const revalidate = 5;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { blogId } = params;
  const post: any = await genericRepository.getById(
    process.env.NEXT_PUBLIC_POSTGRES_SITE_ID || "1",
    "blogsTable",
    Number(blogId)
  );

  if (!post) {
    return {
      title: "בלוג לא נמצא",
      description: "הבלוג שחיפשת לא קיים במערכת.",
    };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.description,
    keywords: post.tags?.split(", ") || [
      "רכבים",
      "ביקורות רכבים",
      "תחזוקת רכב",
      "טכנולוגיות רכב",
    ],
    openGraph: {
      title: post.og_title || post.meta_title || post.title,
      description:
        post.og_description || post.meta_description || post.description,
      url: `https://example.com/blog/${post.slug}`,
      type: post.og_type || "article",
      images: [
        {
          url:
            post.og_image ||
            post.image_url ||
            "https://example.com/default-og-image-blog.jpg",
          width: 800,
          height: 600,
          alt: post.og_title || post.title || "תמונה של הבלוג",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@carWorld",
      title: post.meta_title || post.title,
      description:
        post.og_description || post.meta_description || post.description,
      images: [
        post.og_image ||
          post.image_url ||
          "https://example.com/default-twitter-image-blog.jpg",
      ],
    },
  };
}

export default async function Page({ params }: Params) {
  const { blogId } = params;
  // const post: any = await tableApiService.getRecordById(
  //   "blogsTable",
  //   Number(blogId)
  // );
  const post: any = await genericRepository.getById(
    process.env.NEXT_PUBLIC_POSTGRES_SITE_ID || "1",
    "blogsTable",
    Number(blogId)
  );

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        הבלוג לא נמצא
      </div>
    );
  }

  return (
    <div className="pb-12 px-4 max-w-screen-lg mx-auto  min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md  mb-6">
        <p className="text-gray-500 text-sm mb-8">
          {post.created_at
            ? new Date(post.created_at).toLocaleDateString()
            : null}
        </p>

        {post.image_url && (
          <div className="flex flex-col items-center ">
            <Image alt="" width={500} height={500} src={post.image_url} />
          </div>
        )}
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => (
              <p className="text-customNavy" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="text-customNavy" {...props} />
            ),
            h1: ({ node, ...props }) => (
              <h1
                className="text-customNavy font-bold text-4xl mt-4 mb-2"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h1
                className="text-customNavy font-bold text-3xl mt-4 mb-2"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h1
                className="text-customNavy font-bold text-3xl mt-4 mb-2"
                {...props}
              />
            ),
          }}
          className="prose prose-lg mx-auto max-w-full text-customNavy"
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
