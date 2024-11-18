/* eslint-disable @typescript-eslint/no-explicit-any */

import { NurseryProductsForm } from "@/cmps/admin/NurseryProductsForm";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export const revalidate = 5;

export default async function EditNurseryProduct(props: any) {
  try {
    const productId = parseInt(props.params.id, 10);
    if (isNaN(productId)) {
      throw new Error("Invalid product ID");
    }

    const product = await genericRepository.getById(
      "nurseryProductsTable",
      productId
    );

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
  } catch (error) {
    console.error("Error fetching nursery product:", error);
    return (
      <section className="min-h-screen flex items-center justify-center">
        שגיאה בטעינת המידע של המוצר
      </section>
    );
  }
}
