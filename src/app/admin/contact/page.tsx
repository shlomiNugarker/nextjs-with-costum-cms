import { ContentBlockEditForm } from "@/cmps/admin/ContentBlockEditForm";
import { PageEditForm } from "@/cmps/admin/PageEditForm";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";

export const revalidate = 5;

export default async function BlogPage() {
  const contactPage = await getPageByName("contact");
  if (!contactPage) {
    return <div> לא נמצא דף כזה</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(contactPage.id);

  return (
    <section className="min-h-screen pt-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-customNavy">
        דף עריכת צור קשר
      </h1>
      <PageEditForm initialPage={contactPage} />
      <ContentBlockEditForm contentBlocks={contentBlocks} />
    </section>
  );
}
