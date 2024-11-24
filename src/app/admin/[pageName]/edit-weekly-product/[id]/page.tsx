import { GenericEditForm } from "@/cmps/admin/GenericEditForm";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export const revalidate = 5;

export default async function EditWeeklyProduct(props: {
  params: { id: string };
}) {
  try {
    const productId = parseInt(props.params.id, 10);
    if (isNaN(productId)) {
      throw new Error("Invalid product ID");
    }

    const product = await genericRepository.getById(
      "weeklyProductsTable",
      productId
    );

    if (!product) {
      return <div>לא נמצא מוצר עם מזהה זה</div>;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { created_at, ...rest } = product;
    const fields = Object.keys(rest);

    return (
      <>
        <section className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-100 text-customNavy">
          <h2 className="text-4xl font-bold text-center mb-6 text-customNavy">
            ערוך מוצר בתוצרת השבועית
          </h2>
          <GenericEditForm
            fields={fields}
            tableName={"weeklyProductsTable"}
            record={rest}
          />
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
