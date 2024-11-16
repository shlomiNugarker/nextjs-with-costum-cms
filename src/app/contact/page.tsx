import { BlockRenderer } from "@/cmps/BlockRenderer";
import { Contact } from "@/cmps/Contact";
import { saveContactMessage } from "@/services/db/repositories/contactMessagesRepository";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";
import { redirect } from "next/navigation";

// export const revalidate = 60;

export default async function ContactPage() {
  const page = await getPageByName("contact");

  if (!page) {
    return <div>דף צור קשר לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(page.id);

  const sortedBlocks = contentBlocks.sort(
    (a, b) => (a.position || 0) - (b.position || 0)
  );

  return (
    <div className="min-h-screen">
      <Contact
        title={page.title || "צור קשר"}
        description={page.description || "תיאור"}
        action={async (formData: FormData) => {
          "use server";
          await saveContactMessage({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
          });
          redirect("/");
        }}
      />

      <div className="mt-8 pt-10">
        {sortedBlocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
}
