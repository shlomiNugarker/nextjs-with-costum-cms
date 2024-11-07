import { Contact } from "@/cmps/Contact";
import { getPageByName } from "@/services/db/repositories/pageRepository";

export default async function ContactPage() {
  const page = await getPageByName("contact");

  if (!page) {
    return <div>דף תוצרת שבועית לא נמצא</div>;
  }

  return (
    <div className="min-h-screen">
      <Contact title={page.title} description={page.description} />
    </div>
  );
}
