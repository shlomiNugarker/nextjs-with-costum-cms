import { ContentBlockEditForm } from "@/cmps/ContentBlockEditForm";
import { PageEditForm } from "@/cmps/PageEditForm";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";

export default async function AdminAboutPage() {
  const aboutPage = await getPageByName("about");
  if (!aboutPage) {
    return <div> לא נמצא דף כזה</div>;
  }
  const contentBlocks = await getContentBlocksByPageId(aboutPage.id);

  return (
    <div className="max-w-screen-lg mt-10 pt-10 mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Edit About Page
      </h1>
      <PageEditForm initialPage={aboutPage} />
      <ContentBlockEditForm contentBlocks={contentBlocks} />
    </div>
  );
}
