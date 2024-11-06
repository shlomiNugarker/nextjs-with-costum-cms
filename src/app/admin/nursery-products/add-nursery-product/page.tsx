import { NurseryProductsForm } from "@/cmps/NurseryProductsForm";

export const revalidate = 5;

export default async function AddNurseryProduct() {
  return (
    <>
      <section className="min-h-screen mt-10 flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold mb-4">הוסף מוצר במשתלה</h2>
        <NurseryProductsForm />
      </section>
    </>
  );
}
