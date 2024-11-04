import { NurseryProductsForm } from "@/cmps/NurseryProductsForm";

export default async function AddNurseryProduct() {
  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold mb-4">הוסף מוצר במשתלה</h2>
        <NurseryProductsForm />
      </section>
    </>
  );
}
