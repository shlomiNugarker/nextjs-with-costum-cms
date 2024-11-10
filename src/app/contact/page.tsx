import { Contact } from "@/cmps/Contact";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";

export default async function ContactPage() {
  const page = await getPageByName("contact");

  if (!page) {
    return <div>דף תוצרת שבועית לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(page.id);

  const sortedBlocks = contentBlocks.sort(
    (a, b) => (a.position || 0) - (b.position || 0)
  );

  return (
    <div className="min-h-screen">
      <Contact
        title={page.title || ""}
        description={page.description || ""}
        contentBlocks={sortedBlocks}
      />
    </div>
  );
}
