"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // ייבוא אייקון הסגירה
import { CiShoppingCart } from "react-icons/ci";
import { Cart } from "./Cart";

export const Header = () => {
  const currentPath = usePathname();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartShown, setisCartShown] = useState(false);

  const isActive = (path: string) =>
    currentPath === path ? "text-customGreen font-bold" : "text-customNavy";

  const handleCloseMenu = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const checkbox = checkboxRef.current;
    if (checkbox) {
      const handleToggleMenu = () => setIsMenuOpen(checkbox.checked);
      checkbox.addEventListener("change", handleToggleMenu);

      return () => {
        checkbox.removeEventListener("change", handleToggleMenu);
      };
    }
  }, []);

  return (
    <header className="z-10 bg-white text-customNavy w-full fixed top-0 mx-auto flex flex-col px-4 py-4 lg:flex-row lg:items-center border-b border-b-customNavy">
      <Link
        href="/"
        className="flex items-center justify-center whitespace-nowrap text-2xl text-[40px] font-black text-customGreen"
      >
        <span className="text-2xl font-bold text-customNavy">
          הגינה<span className="text-customGreen">בפרדס</span>.
        </span>
      </Link>
      <input
        type="checkbox"
        className="peer hidden"
        id="navbar-open"
        ref={checkboxRef}
      />
      <label
        className="absolute top-5 right-5 cursor-pointer lg:hidden text-customNavy"
        htmlFor="navbar-open"
      >
        {isMenuOpen ? (
          <FiX className="h-7 w-7" />
        ) : (
          <FiMenu className="h-7 w-7" />
        )}
      </label>
      <nav
        aria-label="Header Navigation"
        className="peer-checked:min-h-fit flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row"
      >
        <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0 sm:min-h-0.5">
          <li className="lg:ml-12">
            <Link
              href="/nursery"
              className={`rounded transition ${isActive("/nursery")}`}
              onClick={handleCloseMenu}
            >
              המשתלה
            </Link>
          </li>
          <li className="lg:ml-12">
            <Link
              href="/weekly-produce"
              className={`rounded transition ${isActive("/weekly-produce")}`}
              onClick={handleCloseMenu}
            >
              התוצרת השבועית
            </Link>
          </li>
          <li className="lg:ml-12">
            <Link
              href="/contact"
              className={`rounded transition ${isActive("/contact")}`}
              onClick={handleCloseMenu}
            >
              דברו איתנו
            </Link>
          </li>
          <li className="lg:ml-12">
            <Link
              href="/blog"
              className={`rounded transition ${isActive("/blog")}`}
              onClick={handleCloseMenu}
            >
              הבלוג
            </Link>
          </li>
          <li className="lg:ml-12">
            <Link
              href="/delivery"
              className={`rounded transition ${isActive("/delivery")}`}
              onClick={handleCloseMenu}
            >
              משלוחים
            </Link>
          </li>
          <li className="lg:ml-12">
            <Link
              href="/about"
              className={`rounded transition ${isActive("/about")}`}
              onClick={handleCloseMenu}
            >
              אודות
            </Link>
          </li>
        </ul>

        <div
          onClick={() => {
            setisCartShown((prev) => !prev);
          }}
          className="flex items-center space-x-2 text-customGreen"
        >
          <span className="bg-customPeach text-white font-semibold text-xs w-5 h-5 flex items-center justify-center rounded-full">
            3
          </span>
          <CiShoppingCart className="w-9 h-9" />
        </div>
        {isCartShown && <Cart></Cart>}
      </nav>
    </header>
  );
};
