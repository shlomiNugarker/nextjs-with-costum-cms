import React from "react";
import Image from "next/image";

export default function Page() {
  const images = [
    "https://images.unsplash.com/photo-1486328228599-85db4443971f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://plus.unsplash.com/premium_photo-1679428402040-e3c93439ec13?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/uploads/141247613151541c06062/c15fb37d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://plus.unsplash.com/premium_photo-1663045413976-8454dcf8524e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1621460248083-6271cc4437a8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1621459555843-9a77f1d03fae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://plus.unsplash.com/premium_photo-1663054732005-26902b2fc6d4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://plus.unsplash.com/premium_photo-1724129050516-566d2ab60e63?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://plus.unsplash.com/premium_photo-1678655491251-bbc237156a5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://plus.unsplash.com/premium_photo-1663089153028-2d7b5e01d0f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  ];

  return (
    <>
      <div className="py-12 px-4 max-w-screen-lg mx-auto mt-9">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md w-full h-64"
            >
              <Image
                src={src}
                alt={`תמונה ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
