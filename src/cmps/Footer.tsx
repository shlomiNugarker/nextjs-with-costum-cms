import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-customPeach">
      <div className="mx-auto grid max-w-screen-xl gap-y-8 gap-x-12 px-4 py-10 md:grid-cols-2 xl:grid-cols-4 xl:px-10">
        <div className="max-w-sm">
          <div className="mt-2 mb-2  flex h-12 items-center space-x-2">
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
            כתובת:
          </div>
          <div className="text-gray-600">
            <Link
              href="https://www.google.com/maps/search/?api=1&query=רחוב+השדה+10,+פרדס+חנה-כרכור,+ישראל"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-customGreen hover:underline"
            >
              רחוב השדה 10, <br />
              פרדס חנה-כרכור, <br />
              ישראל
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-4 mb-2 font-medium text-customNavy xl:mb-4 ">
            עמודים:
          </div>
          <nav aria-label="Footer Navigation" className="text-gray-600">
            <ul className="space-y-3">
              <li>
                <Link
                  className="hover:text-customGreen hover:underline"
                  href="/"
                >
                  דף הבית
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-customGreen hover:underline"
                  href="/nursery"
                >
                  המשתלה
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-customGreen hover:underline"
                  href="/weekly-produce"
                >
                  התוצרת השבועית
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-customGreen hover:underline"
                  href="/contact"
                >
                  דברו איתנו
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-customGreen hover:underline"
                  href="/blog"
                >
                  הבלוג{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-customGreen hover:underline"
                  href="/delivery"
                >
                  משלוחים{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-customGreen hover:underline"
                  href="/about"
                >
                  אודות{" "}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <div className="mt-4 mb-2 font-medium text-customNavy xl:mb-4">
            הרשמו לניוזלטר שלנו:
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              <input
                type="email"
                className="focus:outline mb-2 block h-14 w-full rounded-xl bg-white px-4 focus:outline-none focus:ring-1 focus:ring-customGreen"
                placeholder="הכנס את האימייל שלך"
              />
              <button className="block rounded-xl bg-customGreen px-6 py-3 font-medium text-white">
                הרשמה
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-4 ">
            <Link
              href="https://www.facebook.com/profile.php?id=61560831838203"
              target="_blank"
              aria-label="Facebook"
              className="flex justify-center items-center"
            >
              <FaFacebook className="text-customNavy hover:text-customGreen text-4xl" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              className="flex justify-center items-center"
            >
              <FaInstagram className="text-customNavy hover:text-customGreen text-4xl" />
            </Link>
            <Link
              href="https://wa.me/972529526762"
              target="_blank"
              aria-label="WhatsApp"
              className="flex justify-center items-center"
            >
              <FaWhatsapp className="text-customNavy hover:text-customGreen text-4xl" />
            </Link>
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
