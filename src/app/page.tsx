import { Gallery } from "@/cmps/Gallery";
import { HeroImg } from "@/cmps/HeroImg";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";

interface Page {
  id: number;
  name: string;
  title: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  description: string | null;
  created_at: Date | null;
}

interface ContentBlock {
  id: number;
  created_at: Date | null;
  page_id: number;
  block_type: string;
  content: string;
  position: number | null;
}

export default async function Home() {
  const homePage: Page | null = await getPageByName("home");

  if (!homePage) {
    return <div>דף הבית לא נמצא</div>;
  }

  const contentBlocks: ContentBlock[] = await getContentBlocksByPageId(
    homePage.id
  );

  const galleryImages = contentBlocks.find(
    (block) => block.block_type === "gallery"
  )?.content;

  return (
    <main>
      <section className="pb-12 px-4 max-w-screen-lg mx-auto  min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5 animate-float">
        <div className="max-w-[500px] text-center md:text-right animate-fade-in-up">
          <h1 className="text-4xl md:text-[70px] font-bold leading-tight">
            {homePage.title}
          </h1>
          <br />
          <p className="text-2xl">{homePage.description}</p>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8 flex justify-center animate-fade-in">
          <HeroImg
            href={
              "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        </div>
      </section>

      <section>
        <div className="animate-fade-in">
          <Gallery images={JSON.parse(galleryImages || "[]")} />
        </div>
      </section>
    </main>
  );
}
