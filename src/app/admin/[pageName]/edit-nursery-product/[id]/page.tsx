/* eslint-disable @typescript-eslint/no-explicit-any */

import { NurseryProductsForm } from "@/cmps/admin/NurseryProductsForm";
import { getProductById } from "@/services/db/repositories/productRepository";

export const revalidate = 5;

export default async function EditNurseryProduct(props: any) {
  const productId = parseInt(props.params.id, 10);
  const product = await getProductById(productId, "nursery");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-100 text-customNavy">
      <h2 className="text-4xl font-bold text-center mb-6 text-customNavy ">
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
