import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-customPeach">
      <div className="mx-auto grid max-w-screen-xl gap-y-8 gap-x-12 px-4 py-10 md:grid-cols-2 xl:grid-cols-4 xl:px-10">
        <div className="max-w-sm">
          <div className="mb-6 flex h-12 items-center space-x-2">
            <span className="text-2xl font-bold text-customNavy">
              הגינה<span className="text-customGreen"> בפרדס</span>.
            </span>
          </div>
          <div className="text-gray-600">
            הגינה בפרדס - חווה אורגנית ומשתלה הממוקמת בפרדס חנה, מציעה מגוון רחב
            של צמחי תבלין, עצי פרי ותוצרת חקלאית טרייה, באיכות הגבוהה ביותר וללא
            חומרי הדברה.
          </div>
        </div>
        <div>
          <div className="mt-4 mb-2 font-medium text-customNavy xl:mb-4">
            כתובת
          </div>
          <div className="text-gray-600">
            רחוב השדה 10, <br />
            פרדס חנה-כרכור, <br />
            ישראל
          </div>
        </div>
        <div>
          <div className="mt-4 mb-2 font-medium text-customNavy xl:mb-4">
            קישורים
          </div>
          <nav aria-label="Footer Navigation" className="text-gray-600">
            <ul className="space-y-3">
              <li>
                <Link
                  className="hover:text-customGreen hover:underline"
                  href="/pricing"
                >
                  תמחור
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-customGreen hover:underline"
                  href="/demo"
                >
                  הדגמה
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-customGreen hover:underline"
                  href="/contact"
                >
                  תקשורת
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-customGreen hover:underline"
                  href="/support"
                >
                  מרכז תמיכה
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-customGreen hover:underline"
                  href="/contact"
                >
                  צור קשר
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <div className="mt-4 mb-2 font-medium text-customNavy xl:mb-4">
            הרשמו לניוזלטר שלנו
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              <input
                type="email"
                className="focus:outline mb-2 block h-14 w-full rounded-xl bg-white px-4 sm:w-80 focus:outline-none focus:ring-1 focus:ring-customGreen"
                placeholder="הכנס את האימייל שלך"
              />
              <button className="block rounded-xl bg-customGreen px-6 py-3 font-medium text-white">
                הרשמה
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-customNavy">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-y-4 px-4 py-3 text-center text-customPeach sm:flex-row sm:justify-between sm:text-left">
          <div>© 2024 הגינה בפרדס | כל הזכויות שמורות</div>
          <div>
            <Link className="hover:text-customGreen" href="/privacy-policy">
              מדיניות פרטיות
            </Link>
            <span className="mx-2">|</span>
            <Link className="hover:text-customGreen" href="/terms-of-service">
              תנאי שירות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
