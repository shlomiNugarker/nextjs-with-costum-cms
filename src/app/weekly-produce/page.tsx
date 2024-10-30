import React from "react";
import { ProductCard } from "@/cmps/ProductCard";

const weeklyProducts = [
  {
    id: 1,
    name: "מיקס עלי בטטה סגולה, אמרנט, תרד הודי אדום, ריג'לה ותרד ניו זילנדי",
    description: "מיקס עלים אידאלי לאידוי או להקפצה",
    weight: "350 גרם",
    category: "עלי ירק",
    image:
      "https://images.unsplash.com/photo-1495758874721-e9da827a0581?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪25",
  },
  {
    id: 2,
    name: "רוקט",
    description: "עלים טריים ורעננים בשקית",
    weight: "120 גרם",
    category: "עלי ירק",
    image:
      "https://images.unsplash.com/photo-1534940519139-f860fb3c6e38?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪12",
  },
  {
    id: 3,
    name: "צרור קייל",
    description: "עלים ירוקים ובריאים",
    weight: "100 גרם",
    category: "עלי ירק",
    image:
      "https://plus.unsplash.com/premium_photo-1702313776770-e6f6fb5163bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪10",
  },
  {
    id: 4,
    name: "3 צרורות תבלין לבחירה",
    description:
      "מבחר תבלינים לבחירה: נענע, מרווה, אורגנו, זעתר, מלוח קיפח, רוזמרין, בזיליקום מתוק, תאילנדי או לימוני",
    weight: "צרור אחד לכל תבלין",
    category: "תבלינים",
    image:
      "https://images.unsplash.com/photo-1486548730767-5c679e8eda6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪15",
  },
  {
    id: 5,
    name: "צרור מורינגה",
    description: "עלים עשירים בערכים תזונתיים, טריים ומזינים",
    weight: "120 גרם",
    category: "עלי ירק",
    image:
      "https://images.unsplash.com/photo-1667928729816-0ed8c59cd3c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪20",
  },
  {
    id: 6,
    name: "כורכום טרי",
    description: "שורש כורכום טרי ואיכותי, מתאים לתיבול ולשימושים בריאותיים",
    weight: "כ-200 גרם",
    category: "שורשים",
    image:
      "https://images.unsplash.com/photo-1666818398897-381dd5eb9139?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪18",
  },
  {
    id: 7,
    name: "גולדן ברי",
    description: "פרי מתוק ועסיסי, עשיר בויטמינים ונוגדי חמצון",
    weight: "כ-120 גרם",
    category: "פירות",
    image:
      "https://recipe-cpsa.com/wp-content/uploads/2022/12/Dizajn-bez-naslova-49.png",
    price: "₪22",
  },
];

export default function WeeklyProduce() {
  return (
    <section className=" pb-12 pt-24 px-4 max-w-screen-lg mx-auto mt-2 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
        תוצרת שבועית
      </h1>
      <p className="text-center text-gray-600 mb-12">
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
