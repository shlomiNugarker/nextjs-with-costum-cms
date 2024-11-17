import { PostEditor } from "@/cmps/admin/PostEditor";
import { getBlogById } from "@/services/db/repositories/blogRepository";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditBlogPage(props: any) {
  const postId = parseInt(props.params.id, 10);
  const post = await getBlogById(postId);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-100 text-customNavy">
      <h2 className="text-4xl font-bold text-center mb-6 text-customNavy ">
        ערוך פוסט בבלוג
      </h2>

      {post ? (
        <div className="w-[90vw] p-7 text-right">
          <PostEditor initialPost={post} />
        </div>
      ) : (
        <p>לא נמצא פוסט עם מזהה זה</p>
      )}
    </div>
  );
}
