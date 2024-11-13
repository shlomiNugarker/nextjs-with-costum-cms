import { ContentBlockEditForm } from "@/cmps/admin/ContentBlockEditForm";
import { PageEditForm } from "@/cmps/admin/PageEditForm";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";

export const revalidate = 5;

export default async function Page() {
  const page = await getPageByName("home");
  if (!page) {
    return <div> לא נמצא דף כזה</div>;
  }
  const contentBlocks = await getContentBlocksByPageId(page.id);

  return (
    <section className="min-h-screen pt-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-customNavy">
        דף הבית
      </h1>
      <PageEditForm initialPage={page} />
      <ContentBlockEditForm contentBlocks={contentBlocks} />
    </section>
  );
}
