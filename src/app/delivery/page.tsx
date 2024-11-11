/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockRenderer } from "@/cmps/BlockRenderer";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";

export const revalidate = 60;

export default async function Delivery() {
  const deliveryPage = await getPageByName("delivery");

  if (!deliveryPage) {
    return <div>דף המשלוחים לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(deliveryPage.id);

  const sortedBlocks = contentBlocks.sort(
    (a, b) => (a.position || 0) - (b.position || 0)
  );

  return (
    <section className="pb-12 pt-24 px-4 max-w-screen-lg mx-auto mt-2 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
        {deliveryPage.title || "משלוחים"}
      </h1>
      <p className="text-center text-gray-600 mb-12 text-2xl">
        {deliveryPage.description}
      </p>

      <div className="mt-8">
        {sortedBlocks.map((block: any) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </section>
  );
}
