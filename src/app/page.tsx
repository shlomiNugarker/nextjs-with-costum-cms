/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gallery } from "@/cmps/Gallery";
import { HeroImg } from "@/cmps/HeroImg";
import { YouTubeVideo } from "@/cmps/YouTubeVideo";
// import { tableApiService } from "@/services/client-api/tableApi";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export const revalidate = 5;

const SITE_ID = process.env.NEXT_PUBLIC_POSTGRES_SITE_ID!;

export default async function Home() {
  try {
    // const homePage: any = await tableApiService.getRecordByField(
    //   "pagesTable",
    //   "name",
    //   "home"
    // );
    const homePage: any = await genericRepository.getByField(
      SITE_ID,
      "pagesTable",
      "slug",
      "home"
    );

    if (!homePage) {
      return <div>דף הבית לא נמצא</div>;
    }

    // const contentBlocks: any = await tableApiService.getAllRecordsWithFilter(
    //   "contentBlocksTable",
    //   "page_id",
    //   homePage.id
    // );
    const contentBlocks: any = await genericRepository.getAllWithFilter(
      SITE_ID,
      "contentBlocksTable",
      { page_id: homePage.id }
    );

    const galleryImages = contentBlocks.find(
      (block: any) => block.block_type === "gallery"
    )?.content;

    return (
      <main>
        <section className="pb-12 px-4 max-w-screen-lg mx-auto  min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5 animate-float text-customNavy">
          <div className="max-w-[500px] text-center md:text-right animate-fade-in-up">
            <h1 className="text-4xl text-center md:text-[70px] font-bold leading-tight ">
              {homePage.title}
            </h1>
            <br />
            <p className="text-2xl text-center">{homePage.description}</p>
          </div>
          <div className="mt-8 md:mt-0 md:ml-8 flex justify-center animate-fade-in">
            <HeroImg
              href={
                homePage.hero_image_url ||
                "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </div>
        </section>

        <div className={"w-full min-h-[calc(100vh-70px)]"}>
          <YouTubeVideo videoId={"EdKDIph5IaM"} />
        </div>

        <section>
          <div className="animate-fade-in">
            <Gallery images={JSON.parse(galleryImages || "[]")} />
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error loading home page:", error);
    return <div>שגיאה בטעינת דף הבית</div>;
  }
}
