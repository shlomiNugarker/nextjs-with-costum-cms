// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveBlogPost(blogPost: any) {
  const method = blogPost.id ? "PUT" : "POST";
  const response = await fetch("/api/blog", {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogPost),
  });

  if (!response.ok) {
    throw new Error("Failed to save blog post");
  }

  return await response.json();
}
