/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { genericRepository } from "@/services/db/repositories/genericRepository";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface Params {
  params: {
    blogId: string;
  };
}

export default async function Page({ params }: Params) {
  const { blogId } = params;
  const post: any = await genericRepository.getById(
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
          }}
          className="prose prose-lg mx-auto max-w-full text-customNavy"
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
