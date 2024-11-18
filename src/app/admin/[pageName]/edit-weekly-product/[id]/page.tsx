import { WeeklyProductsForm } from "@/cmps/admin/WeeklyProductsForm";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export const revalidate = 5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditWeeklyProduct(props: any) {
  try {
    const productId = parseInt(props.params.id, 10);
    if (isNaN(productId)) {
      throw new Error("Invalid product ID");
    }

    const product = await genericRepository.getById(
      "weeklyProductsTable",
      productId
    );

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
  } catch (error) {
    console.error("Error fetching weekly product:", error);
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100 text-customNavy">
        שגיאה בטעינת המידע של המוצר
      </section>
    );
  }
}
