import { NurseryProductsForm } from "@/cmps/admin/NurseryProductsForm";

export const revalidate = 5;

export default async function AddNurseryProduct() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-100 text-customNavy">
        <h2 className="text-xl font-semibold mb-4">הוסף מוצר במשתלה</h2>
        <NurseryProductsForm />
      </section>
    </>
  );
}
