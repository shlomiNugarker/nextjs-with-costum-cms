import { WeeklyProductsForm } from "@/cmps/admin/WeeklyProductsForm";
import { getProductById } from "@/services/db/repositories/productRepository";

export const revalidate = 5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditWeeklyProduct(props: any) {
  const productId = parseInt(props.params.id, 10);
  const product = await getProductById(productId, "weekly");

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-100 text-customNavy">
        <h2 className="text-4xl font-bold text-center mb-6 text-customNavy">
          ערוך מוצר בתוצרת השבועית
        </h2>
        {product ? (
          <WeeklyProductsForm initialProduct={product} />
        ) : (
          <p>לא נמצא מוצר עם מזהה זה</p>
        )}
      </section>
    </>
  );
}
