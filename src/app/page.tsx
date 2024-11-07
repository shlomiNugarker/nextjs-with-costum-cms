import { Gallery } from "@/cmps/Gallery";
import { HeroImg } from "@/cmps/HeroImg";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";

export default async function Home() {
  const homePage = await getPageByName("home");

  if (!homePage) {
    return <div>דף הבית לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(homePage.id);

  const heroUrl = contentBlocks.find(
    (block) => block.block_type === "text"
  )?.content;

  const galleryImages = contentBlocks.find(
    (block) => block.block_type === "gallery"
  )?.content;

  return (
    <main>
      <section className="mt-5 h-[100vh] w-full flex flex-col md:flex-row justify-center items-center text-customNavy px-4 animate-float">
        <div className="max-w-[500px] text-center md:text-right animate-fade-in-up">
          <h1 className="text-4xl md:text-[70px] font-bold leading-tight ">
            {homePage.title}
          </h1>
          <br />
          <p className="text-2xl">{homePage.description}</p>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8 flex justify-center animate-fade-in">
          <HeroImg href={heroUrl} />
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
