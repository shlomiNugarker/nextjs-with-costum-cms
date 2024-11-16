import React from "react";
import { NurseryCard } from "@/cmps/NurseryCard";
import { getNurseryProducts } from "@/services/db/repositories/productRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { BlockRenderer } from "@/cmps/BlockRenderer";

export default async function NurseryPage() {
  const nurseryProducts = await getNurseryProducts();
  const page = await getPageByName("nursery");

  if (!page) {
    return <div>דף המשתלה לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(page.id);

  const sortedBlocks = contentBlocks
    .slice()
    .sort((a, b) => (a.position || 0) - (b.position || 0));

  return (
    <>
      <div className="pb-12 px-4 max-w-screen-lg mx-auto  min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5">
        <div>
          <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
            {page.title}
          </h1>
          <p className="text-center text-gray-600 mb-12 text-2xl">
            {page.description}
          </p>
        </div>

        <div>
          {sortedBlocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>

        <div className="py-1 px-4 max-w-screen-lg mx-auto mt-8">
          <p className="text-center text-gray-600 mb-12 text-2xl">מוצרים</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
            {nurseryProducts.map((product) => (
              <NurseryCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
