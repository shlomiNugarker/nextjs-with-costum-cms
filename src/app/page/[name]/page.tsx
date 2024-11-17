/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockRenderer } from "@/cmps/BlockRenderer";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";
import React from "react";

interface Params {
  params: {
    name: string;
  };
}

export default async function page({ params }: Params) {
  const { name } = params;
  const page = await getPageByName(name);

  if (!page) {
    return <div>דף לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(page.id);

  const sortedBlocks = contentBlocks.sort(
    (a, b) => (a.position || 0) - (b.position || 0)
  );

  return (
    <div>
      <section className="pb-12 px-4 max-w-screen-lg mx-auto  min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5">
        <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
          {page.title}
        </h1>
        <p className="text-center text-gray-600 text-2xl">{page.description}</p>

        <div className="mt-8">
          {sortedBlocks.map((block: any) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </section>
    </div>
  );
}
