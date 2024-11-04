import { WeeklyProductsForm } from "@/cmps/WeeklyProductsForm";

export const revalidate = 1;

export default async function AddWeeklyProduct() {
  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold mb-4">הוסף מוצר לתוצרת השבועית</h2>
        <WeeklyProductsForm />
      </section>
    </>
  );
}
