/* eslint-disable @typescript-eslint/no-explicit-any */
import { NurseryProductsForm } from "@/cmps/NurseryProductsForm";
import { getProductById } from "@/lib/queries";

export const revalidate = 1;

export default async function EditNurseryProduct(props: any) {
  const productId = parseInt(props.params.id, 10);
  const product = await getProductById(productId, "nursery");

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-customNavy">
      <h2 className="text-xl font-semibold mb-4 text-customNavy">
        ערוך מוצר במשתלה
      </h2>
      {product ? (
        <NurseryProductsForm initialProduct={product} />
      ) : (
        <p>לא נמצא מוצר עם מזהה זה</p>
      )}
    </section>
  );
}
