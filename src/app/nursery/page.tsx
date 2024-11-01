import React from "react";
import { NurseryCard } from "@/cmps/NurseryCard";
import { getNurseryProducts } from "@/lib/queries";

export default async function Page() {
  const nurseryProducts = await getNurseryProducts();
  return (
    <>
      <div className="pb-12 pt-24 px-4 max-w-screen-lg mx-auto mt-2 min-h-screen">
        <div>
          <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
            המשתלה של הגינה בפרדס
          </h1>
          <p className="text-center text-gray-600 mb-12 text-2xl">
            ברוכים הבאים למשתלה שלנו! כאן תוכלו להתרשם ממגוון הצמחים, הפרחים,
            והעשבייה שאנחנו מגדלים. המשתלה מתמחה בגידול צמחי נוי ותבלין שנבחרים
            בקפידה. כל צמח מיוצר בגידול אורגני, מתוך דגש על שימור הטבע והסביבה.
          </p>
          <p className="text-center text-gray-600 mb-8 text-2xl">
            מבקרים במשתלה ייהנו מחוויה של טבע ורוגע, יוכלו ללמוד על הצמחים
            השונים ולבחור לעצמם את הצמחים המתאימים לבית או לגינה. המומחים שלנו
            עומדים לרשותכם לכל שאלה ומייעצים לכם איך לגדל את הצמחים בצורה הטובה
            ביותר.
          </p>
          <p className="text-center text-gray-600 mb-12 text-2xl">
            בין הצמחים שתמצאו אצלנו: עצי פרי אורגניים, צמחי תבלין טריים, ועשבי
            נוי ייחודיים המתאימים לכל גינה. בואו לחוות את היופי של הטבע ולהתרשם
            מהמבחר הייחודי שלנו.
          </p>
        </div>
        <div className="py-1 px-4 max-w-screen-lg mx-auto mt-8 min-h-screen">
          <div className="pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
            {nurseryProducts.map((product) => (
              <NurseryCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
