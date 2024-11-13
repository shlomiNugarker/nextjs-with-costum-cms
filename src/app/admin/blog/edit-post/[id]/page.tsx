import MdEditor from "@/cmps/admin/MdEditor";
import { getBlogById } from "@/services/db/repositories/blogRepository";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditBlogPage(props: any) {
  const postId = parseInt(props.params.id, 10);
  const post = await getBlogById(postId);

  return (
    <div className="min-h-screen mt-10 pt-10 flex flex-col justify-center items-center text-customNavy">
      <h2 className="text-4xl font-bold text-center mb-6 text-customNavy ">
        ערוך פוסט בבלוג
      </h2>

      {post ? (
        <div className="w-[90vw] p-7 text-right">
          <MdEditor initialPost={post} />
        </div>
      ) : (
        <p>לא נמצא פוסט עם מזהה זה</p>
      )}
    </div>
  );
}
