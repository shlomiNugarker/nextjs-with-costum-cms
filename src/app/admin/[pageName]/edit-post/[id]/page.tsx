import { PostEditor } from "@/cmps/admin/PostEditor";
import { genericRepository } from "@/services/db/repositories/genericRepository";
import React from "react";

export default async function EditBlogPage(props: { params: { id: string } }) {
  try {
    const postId = parseInt(props.params.id, 10);
    if (isNaN(postId)) {
      throw new Error("Invalid post ID");
    }

    const post = await genericRepository.getById("blogsTable", postId);

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
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        שגיאה בטעינת המידע של הפוסט
      </div>
    );
  }
}
