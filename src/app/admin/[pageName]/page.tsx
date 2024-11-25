import { AdminNurseryList } from "@/cmps/admin/AdminNurseryList";
import { AdminPostsList } from "@/cmps/admin/AdminPostsList";
import { AdminWeeklyList } from "@/cmps/admin/AdminWeeklyList";
import { ContentBlockEditForm } from "@/cmps/admin/blocksEditors/ContentBlockEditForm";
import { GenericEditForm } from "@/cmps/admin/GenericEditForm";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export const revalidate = 5;

interface Params {
  params: {
    pageName: string;
  };
}

export default async function AdminEditPage({ params }: Params) {
  try {
    const { pageName } = params;

    const page = await genericRepository.getByField(
      "pagesTable",
      "name",
      pageName
    );

    const contentBlocks = page?.id
      ? await genericRepository.getAllWithFilter("contentBlocksTable", {
          page_id: page.id,
        })
      : null;

    if (!page) {
      return <div>לא נמצא רשומה</div>;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { created_at, site_id, ...rest } = page;
    const pageFields = Object.keys(rest);

    return (
      <div className="pb-12 px-4 max-w-screen-lg mx-auto min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5 text-customNavy">
        <h1 className="text-3xl font-semibold text-center mb-6 mt-6">
          ערוך עמוד {pageName}
        </h1>
        <GenericEditForm
          fields={pageFields}
          tableName={"pagesTable"}
          record={rest}
        />
        {page?.id && (
          <ContentBlockEditForm contentBlocks={contentBlocks || []} />
        )}

        {pageName === "blog" ? <AdminPostsList /> : null}
        {pageName === "nursery" ? <AdminNurseryList /> : null}
        {pageName === "weekly-produce" ? <AdminWeeklyList /> : null}
      </div>
    );
  } catch (error) {
    console.error("Error fetching page or content blocks:", error);
    return <div>שגיאה בטעינת המידע של הדף</div>;
  }
}
