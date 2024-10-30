export default function Page() {
  return (
    <section className="pb-12 pt-24 px-4 max-w-screen-lg mx-auto mt-2 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
        משלוחים
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        אנו מציעים שירות משלוחים מהיר ואמין. המשלוחים מתבצעים בתנאים מוקפדים,
        ומבטיחים לכם את התוצרת הטרייה והאיכותית ביותר, עד הבית.
      </p>

      <div className="mt-8">
        <h2 className="font-semibold text-customNavy mb-4">אזורי משלוח</h2>
        <p className="text-gray-600 mb-6">
          אנו מספקים משלוחים לאזורים הבאים: פרדס חנה, חדרה, קיסריה, חיפה
          והקריות. אם אינכם בטוחים אם אנחנו מגיעים לאזור שלכם, אנא צרו איתנו
          קשר.
        </p>

        <h2 className="font-semibold text-customNavy mb-4">אפשרויות משלוח</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>משלוח מהיר (עד 24 שעות) - 50 ₪</li>
          <li>משלוח רגיל (עד 3 ימי עסקים) - 30 ₪</li>
          <li>איסוף עצמי ללא עלות מהחווה בפרדס חנה</li>
        </ul>

        <h2 className="font-semibold text-customNavy mb-4">זמני אספקה</h2>
        <p className="text-gray-600 mb-6">
          זמני האספקה שלנו הם בימים א&apos;-ה&apos; בין השעות 9:00-17:00. הזמנות
          שמתקבלות לאחר השעה 17:00 יסופקו ביום העסקים הבא.
        </p>

        <h2 className="font-semibold text-customNavy mb-4">הנחיות ותנאים</h2>
        <p className="text-gray-600">
          אנא ודאו כי הכתובת למשלוח מלאה ומדויקת. במידה ויש בעיה במשלוח או שאלה,
          אל תהססו לפנות אלינו. אנו כאן לשירותכם!
        </p>
      </div>
    </section>
  );
}
