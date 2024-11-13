import { ContentBlockEditForm } from "@/cmps/admin/ContentBlockEditForm";
import { NurseryCard } from "@/cmps/NurseryCard";
import { PageEditForm } from "@/cmps/admin/PageEditForm";
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";
import { getNurseryProducts } from "@/services/db/repositories/productRepository";
import Link from "next/link";

export const revalidate = 5;

export default async function page() {
  const page = await getPageByName("nursery");
  if (!page) {
    return <div> לא נמצא דף כזה</div>;
  }
  const contentBlocks = await getContentBlocksByPageId(page.id);
  const nurseryProducts = await getNurseryProducts();
  return (
    <div className="min-h-screen pt-10 mt-10 px-4">
      <PageEditForm initialPage={page} />
      <ContentBlockEditForm contentBlocks={contentBlocks} />
      <div className="flex justify-center mt-8">
        <Link href={"nursery-products/weekly-products/"}>
          <p className="text-4xl font-bold text-center mb-6 text-customNavy ">
            מוצרים במשתלה
          </p>
        </Link>
      </div>
      <div className="pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {nurseryProducts.map((product) => (
          <div key={product.id} className="relative">
            <Link href={`nursery-products/edit-nursery-product/${product.id}`}>
              <NurseryCard product={product} />
              <button className="w-full py-2 px-4 bg-customGreen text-white font-semibold rounded-lg hover:bg-opacity-90 transition">
                ערוך
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8  mb-5">
        <Link href={"nursery-products/add-nursery-product"}>
          <button className="py-3 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition shadow-lg">
            הוסף מוצר
          </button>
        </Link>
      </div>
    </div>
  );
}
