import React from "react";
import { ProductCard } from "@/cmps/ProductCard";

const weeklyProducts = [
  {
    id: 1,
    name: "עגבניות אורגניות",
    price: '₪20 לק"ג',
    description: "עגבניות טריות באיכות גבוהה מגידול אורגני.",
    image:
      "https://images.unsplash.com/photo-1534940519139-f860fb3c6e38?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "מלפפונים",
    price: '₪15 לק"ג',
    description: "מלפפונים פריכים וטעימים מהגינה שלנו.",
    image:
      "https://images.unsplash.com/photo-1568584711271-6c929fb49b60?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "עלי בזיליקום טריים",
    price: "₪10 לחבילה",
    description: "עלי בזיליקום ריחניים מושלמים לסלטים ותבשילים.",
    image:
      "https://images.unsplash.com/photo-1627740281562-3faaa5d4e6fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function WeeklyProduce() {
  return (
    <section className="py-12 px-4 max-w-screen-lg mx-auto mt-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
        תוצרת שבועית
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
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
