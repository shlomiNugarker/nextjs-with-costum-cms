// import { WeeklyProductsForm } from "@/cmps/admin/WeeklyProductsForm";

export const revalidate = 5;

export default async function AddWeeklyProduct() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-100 text-customNavy">
        <h2 className="text-4xl font-bold text-center mb-6 text-customNavy">
          הוסף מוצר לתוצרת השבועית
        </h2>
        {/* <GenericEditForm fields={fields} tableName={tableName} record={rest} /> */}
      </section>
    </>
  );
}
