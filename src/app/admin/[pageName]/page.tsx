import { ContentBlockEditForm } from "@/cmps/admin/ContentBlockEditForm";
import { PageEditForm } from "@/cmps/admin/PageEditForm";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";

export const revalidate = 5;
interface Params {
  params: {
    pageName: string;
  };
}
export default async function AdminEditPage({ params }: Params) {
  const { pageName } = params;
  const page = await getPageByName(pageName);
  if (!page) {
    return <div> לא נמצא דף כזה</div>;
  }
  const contentBlocks = await getContentBlocksByPageId(page.id);

  return (
    <div className="max-w-screen-lg mt-10 pt-10 mx-auto p-6 text-customNavy">
      <h1 className="text-3xl font-semibold text-center mb-6">
        ערוך עמוד {pageName}
      </h1>
      <PageEditForm initialPage={page} />
      <ContentBlockEditForm contentBlocks={contentBlocks} />
    </div>
  );
}
