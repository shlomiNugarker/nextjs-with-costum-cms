import { Contact } from "@/cmps/Contact";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";

export default async function ContactPage() {
  const page = await getPageByName("contact");

  if (!page) {
    return <div>דף תוצרת שבועית לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(page.id);

  console.log({ contentBlocks });

  return (
    <div className="min-h-screen">
      <Contact
        title={page.title || ""}
        description={page.description || ""}
        contentBlocks={contentBlocks}
      />
    </div>
  );
}
