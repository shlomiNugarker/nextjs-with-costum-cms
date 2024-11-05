import { WeeklyProductsForm } from "@/cmps/WeeklyProductsForm";

export const revalidate = 1;

export default async function AddWeeklyProduct() {
  return (
    <>
      <section className="min-h-screen mt-10 flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold text-center mb-6 text-customNavy">
          הוסף מוצר לתוצרת השבועית
        </h2>
        <WeeklyProductsForm />
      </section>
    </>
  );
}
