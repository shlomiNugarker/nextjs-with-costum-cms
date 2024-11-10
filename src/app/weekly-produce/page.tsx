/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ProductCard } from "@/cmps/ProductCard";
import { getWeeklyProducts } from "@/services/db/repositories/productRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { BlockRenderer } from "@/cmps/BlockRenderer";

export const revalidate = 60;

export default async function WeeklyProduce() {
  const weeklyProducts = await getWeeklyProducts();

  const page = await getPageByName("weekly-produce");
  if (!page) {
    return <div>דף תוצרת שבועית לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(page.id);

  const sortedBlocks = contentBlocks
    .slice()
    .sort((a: any, b: any) => (a.position || 0) - (b.position || 0));
  return (
    <section className="pb-12 pt-24 px-4 max-w-screen-lg mx-auto mt-2 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
        {page.title}
      </h1>
      <p className="text-center text-gray-600 mb-12 text-2xl">
        {page.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {weeklyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div>
        {sortedBlocks.map((block: any) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </section>
  );
}
