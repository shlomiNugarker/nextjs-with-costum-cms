/* eslint-disable @typescript-eslint/no-explicit-any */

import httpService from "../httpService";

export async function saveBlogPost(blogPost: any) {
  const method = blogPost.id ? "put" : "post";
  const url = "/blog";
  try {
    const response = await httpService[method](url, blogPost);
    return response.data;
  } catch (error) {
    console.error("Failed to save blog post", error);
    throw new Error("Failed to save blog post");
  }
}

export async function deleteBlogPost(postId: number) {
  try {
    const response = await httpService.delete(`/blog/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete blog post", error);
    throw new Error("Failed to delete blog post");
  }
}
