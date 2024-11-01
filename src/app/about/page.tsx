import Link from "next/link";

export default function About() {
  return (
    <section className="pb-12 pt-24 px-4 max-w-screen-lg mx-auto mt-2 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
        אודות הגינה בפרדס
      </h1>
      <p className="text-2xl text-center text-gray-600 mb-8">
        הגינה בפרדס היא חווה אורגנית ומשתלה הממוקמת בלב פרדס חנה, ומתמחה בגידול
        צמחי תבלין, עצי פרי, ותוצרת חקלאית טרייה ואיכותית. אנו מאמינים בשימור
        הטבע והסביבה ולכן כל הצמחים והפירות שלנו מיוצרים בשיטות גידול אורגניות
        וללא שימוש בחומרי הדברה כימיים.
      </p>

      <div className="my-12">
        <h2 className="text-3xl font-semibold text-customNavy mb-4">
          החזון שלנו
        </h2>
        <p className="text-gray-600 mb-6">
          החזון שלנו הוא לייצר תוצרת חקלאית איכותית, בריאה ואורגנית, תוך שמירה
          על אקולוגיה טבעית ואיזון אקולוגי. אנו שואפים להביא לצרכנים שלנו את
          המיטב מהאדמה הישראלית ולהבטיח תוצרת נקייה ובריאה.
        </p>
      </div>

      <div className="my-12">
        <h2 className="text-3xl font-semibold text-customNavy mb-4">
          מה מייחד אותנו
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-3">
          <li>גידול אורגני וללא שימוש בכימיקלים</li>
          <li>מגוון רחב של צמחי תבלין, עצי פרי ותוצרת חקלאית טרייה</li>
          <li>איכות גבוהה ושירות אישי לכל לקוח</li>
          <li>מחויבות לשימור הטבע ולסביבה</li>
        </ul>
      </div>

      <div className="my-12">
        <h2 className="text-3xl font-semibold text-customNavy mb-4">
          המומחיות שלנו
        </h2>
        <p className="text-gray-600 mb-6">
          הצוות המקצועי שלנו מורכב מאנשי חקלאות עם ידע וניסיון רב בגידולים
          אורגניים. אנו מתמחים בשיטות גידול ייחודיות המבטיחות תוצרת באיכות
          מעולה. החווה מציעה ללקוחותיה חוויה מיוחדת שבה ניתן ללמוד על שיטות
          הגידול וליהנות מחיי החקלאות האמיתיים.
        </p>
      </div>

      <div className="my-12 text-center">
        <h2 className="text-3xl font-semibold text-customNavy mb-4">
          בואו לבקר אותנו!
        </h2>
        <p className="text-gray-600 mb-6">
          מוזמנים להגיע ולהתרשם מהחווה ומהמשתלה, ליהנות מהאווירה הירוקה ולראות
          את התוצרת הטרייה. אנו נשמח לקבל את פניכם ולהדריך אתכם על כל הצמחים
          והפירות שלנו.
        </p>
        <p className="text-gray-600">
          <Link
            href="https://www.google.com/maps/search/?api=1&query=רחוב+השדה+10,+פרדס+חנה-כרכור,+ישראל"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-customGreen hover:underline"
          >
            כתובת: רחוב השדה 10, פרדס חנה-כרכור, ישראל
          </Link>
        </p>
      </div>
    </section>
  );
}
