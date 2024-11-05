import { WeeklyProductsForm } from "@/cmps/WeeklyProductsForm";
import { getProductById } from "@/lib/queries";

export const revalidate = 1;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditWeeklyProduct(props: any) {
  const productId = parseInt(props.params.id, 10);
  const product = await getProductById(productId, "weekly");

  return (
    <>
      <section className="min-h-screen mt-10 flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold mb-4">ערוך מוצר בתוצרת השבועית</h2>
        {product ? (
          <WeeklyProductsForm initialProduct={product} />
        ) : (
          <p>לא נמצא מוצר עם מזהה זה</p>
        )}{" "}
      </section>
    </>
  );
}
