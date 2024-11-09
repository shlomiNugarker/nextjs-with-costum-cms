import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";

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
        {sortedBlocks.map((block) => {
          if (block.block_type === "text") {
            return (
              <div key={block.id} className="my-6 text-center">
                <p className="text-gray-600 text-xl mb-4">{block.content}</p>
              </div>
            );
          }

          if (block.block_type === "list") {
            const listItems = JSON.parse(block.content || "[]");
            return (
              <div key={block.id} className="my-6 text-center">
                <ul className="list-disc list-inside text-gray-600 space-y-2 flex flex-col items-center">
                  {listItems.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
}
