import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";
import Link from "next/link";

export default async function About() {
  const aboutPage = await getPageByName("about");

  if (!aboutPage) {
    return <div>דף האודות לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(aboutPage.id);

  // const introText = contentBlocks.find(
  //   (block) => block.block_type === "text" && block.position === 1
  // )?.content;

  const missionText = contentBlocks.find(
    (block) => block.block_type === "text" && block.position === 2
  )?.content;

  const uniquenessPoints = contentBlocks.find(
    (block) => block.block_type === "list"
  )?.content;

  const expertiseText = contentBlocks.find(
    (block) => block.block_type === "text" && block.position === 3
  )?.content;

  const visitInvitation = contentBlocks.find(
    (block) => block.block_type === "text" && block.position === 4
  )?.content;

  return (
    <section className="pb-12 pt-24 px-4 max-w-screen-lg mx-auto mt-2 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
        {aboutPage.title}
      </h1>
      <p className="text-2xl text-center text-gray-600 mb-8">
        {aboutPage.description}
      </p>
      <p className="text-2xl text-center text-gray-600 mb-8">
        {aboutPage.description}
      </p>

      <div className="my-12">
        <h2 className="text-3xl font-semibold text-customNavy mb-4">
          החזון שלנו
        </h2>
        <p className="text-gray-600 mb-6">{missionText}</p>
      </div>

      <div className="my-12">
        <h2 className="text-3xl font-semibold text-customNavy mb-4">
          מה מייחד אותנו
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-3">
          {JSON.parse(uniquenessPoints || "[]").map(
            (point: string, index: number) => (
              <li key={index}>{point}</li>
            )
          )}
        </ul>
      </div>

      <div className="my-12">
        <h2 className="text-3xl font-semibold text-customNavy mb-4">
          המומחיות שלנו
        </h2>
        <p className="text-gray-600 mb-6">{expertiseText}</p>
      </div>

      <div className="my-12 text-center">
        <h2 className="text-3xl font-semibold text-customNavy mb-4">
          בואו לבקר אותנו!
        </h2>
        <p className="text-gray-600 mb-6">{visitInvitation}</p>
        <p className="text-gray-600">
          <Link
            href="https://www.google.com/maps/search/?api=1&query=רחוב+השדה+10,+פרדס+חנה-כרכור,+ישראל"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-customGreen hover:underline"
          >
            כתובת: רחוב השדה 10, פרדס חנה-כרכור, ישראל
          </Link>
        </p>
      </div>
    </section>
  );
}
