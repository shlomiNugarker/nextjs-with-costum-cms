import React from "react";
import { ProductCard } from "@/cmps/ProductCard";
import { getWeeklyProducts } from "@/lib/queries";

export const revalidate = 60;

export default async function WeeklyProduce() {
  const weeklyProducts = await getWeeklyProducts();

  return (
    <section className="pb-12 pt-24 px-4 max-w-screen-lg mx-auto mt-2 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
        תוצרת שבועית
      </h1>
      <p className="text-center text-gray-600 mb-12 text-2xl">
        תוצרת אורגנית טרייה, ישר מהשדה שלנו אליכם הביתה. כאן תוכלו למצוא את כל
        מה שטרי השבוע ולהזמין תוצרת איכותית ובריאה.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {weeklyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
