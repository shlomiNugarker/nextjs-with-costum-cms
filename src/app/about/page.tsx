/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockRenderer } from "@/cmps/BlockRenderer";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";

// export const revalidate = 60;

export default async function About() {
  const aboutPage = await getPageByName("about");

  if (!aboutPage) {
    return <div>דף האודות לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(aboutPage.id);

  const sortedBlocks = contentBlocks.sort(
    (a, b) => (a.position || 0) - (b.position || 0)
  );

  return (
    <section className="pb-12 pt-24 px-4 max-w-screen-lg mx-auto mt-2 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
        {aboutPage.title}
      </h1>
      <p className="text-2xl text-center text-gray-600 mb-8">
        {aboutPage.description}
      </p>

      {sortedBlocks.map((block: any) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </section>
  );
}
