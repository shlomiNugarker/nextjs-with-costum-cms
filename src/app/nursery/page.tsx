import React from "react";
import { NurseryCard } from "@/cmps/NurseryCard";

const nurseryProducts = [
  {
    id: 1,
    name: "רוזמרין",
    description: "צמח תבלין ארומטי, אידיאלי לתיבול מנות בשר, מרקים וסלטים.",
    potSize: "15 ס״מ",
    category: "תבלינים",
    image:
      "https://images.unsplash.com/photo-1523738914649-b0d2753887a1?q=80&w=1030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪15",
  },
  {
    id: 2,
    name: "נענע",
    description: "צמח רב שנתי בעל עלים רעננים, נהדר לתה, משקאות ותבשילים.",
    potSize: "15 ס״מ",
    category: "תבלינים",
    image:
      "https://images.unsplash.com/photo-1708481480624-f27f9c1cc891?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪12",
  },
  {
    id: 3,
    name: "בזיליקום מתוק",
    description: "צמח תבלין עם עלים גדולים וריחניים, מתאים לפסטה, סלטים ועוד.",
    potSize: "15 ס״מ",
    category: "תבלינים",
    image:
      "https://images.unsplash.com/photo-1515542647469-5f9a6b25ef5b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪18",
  },
  {
    id: 4,
    name: "עץ לימון",
    description: "עץ פרי קטן לגידול בגינה או בעציץ, מניב פירות טריים כל השנה.",
    potSize: "25 ס״מ",
    category: "עצים",
    image:
      "https://images.unsplash.com/photo-1605185189315-fc269c231e41?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪75",
  },
  {
    id: 5,
    name: "עץ זית",
    description:
      "עץ חזק ועמיד, מתאים לגידול בגינה או בעציץ גדול, מניב זיתים איכותיים.",
    potSize: "30 ס״מ",
    category: "עצים",
    image:
      "https://images.unsplash.com/photo-1541259418332-97b56947904f?q=80&w=989&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪120",
  },
  {
    id: 6,
    name: "לבנדר",
    description:
      "צמח נוי ותבלין עם פריחה סגולה מרהיבה, מתאים להרחיק מזיקים ולהשרות ריח נעים.",
    potSize: "15 ס״מ",
    category: "נוי",
    image:
      "https://images.unsplash.com/photo-1531112606622-e8174567b048?q=80&w=994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪20",
  },
  {
    id: 7,
    name: "מרווה",
    description:
      "צמח תבלין רב שנתי עם עלים ריחניים, מצוין לתיבול ולרפואה טבעית.",
    potSize: "15 ס״מ",
    category: "תבלינים",
    image:
      "https://images.unsplash.com/photo-1632346265081-eb7e5c507721?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪15",
  },
  {
    id: 8,
    name: "פטרוזיליה",
    description: "צמח תבלין עשיר בויטמינים, מושלם לסלטים ולתבשילים.",
    potSize: "15 ס״מ",
    category: "תבלינים",
    image:
      "https://images.unsplash.com/photo-1528796940112-4979b4a98424?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₪12",
  },
];

export default function Page() {
  return (
    <>
      <div className="pb-12 pt-24 px-4 max-w-screen-lg mx-auto mt-2 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
          המשתלה של הגינה בפרדס
        </h1>
        <p className="text-center text-gray-600 mb-12">
          ברוכים הבאים למשתלה שלנו! כאן תוכלו להתרשם ממגוון הצמחים, הפרחים,
          והעשבייה שאנחנו מגדלים. המשתלה מתמחה בגידול צמחי נוי ותבלין שנבחרים
          בקפידה. כל צמח מיוצר בגידול אורגני, מתוך דגש על שימור הטבע והסביבה.
        </p>
        <p className="text-center text-gray-600 mb-8">
          מבקרים במשתלה ייהנו מחוויה של טבע ורוגע, יוכלו ללמוד על הצמחים השונים
          ולבחור לעצמם את הצמחים המתאימים לבית או לגינה. המומחים שלנו עומדים
          לרשותכם לכל שאלה ומייעצים לכם איך לגדל את הצמחים בצורה הטובה ביותר.
        </p>
        <p className="text-center text-gray-600 mb-12">
          בין הצמחים שתמצאו אצלנו: עצי פרי אורגניים, צמחי תבלין טריים, ועשבי נוי
          ייחודיים המתאימים לכל גינה. בואו לחוות את היופי של הטבע ולהתרשם מהמבחר
          הייחודי שלנו.
        </p>
      </div>
      <div className="py-1 px-4 max-w-screen-lg mx-auto mt-8 min-h-screen">
        <div className="pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {nurseryProducts.map((product) => (
            <NurseryCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
