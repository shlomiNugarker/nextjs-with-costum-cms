import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const { blogId } = await params;

  return <div className="min-h-screen">blog id:{blogId}</div>;
}
