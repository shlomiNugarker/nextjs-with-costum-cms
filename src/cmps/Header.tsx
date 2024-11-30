"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Logo } from "./Logo";

type MenuItem = {
  href: string;
  label: string;
};

type HeaderProps = {
  menuItems: MenuItem[];
  siteName: string;
};

export const Header = ({ menuItems, siteName }: HeaderProps) => {
  const currentPath = usePathname();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const isActive = (path: string) => {
    return currentPath.startsWith("/page" + path)
      ? "text-customGreen font-bold"
      : "text-customNavy";
  };

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
    <header className="z-10 bg-white transition-all  text-customNavy w-full fixed top-0 mx-auto flex flex-col px-4 py-4 lg:flex-row lg:items-center border-b border-b-customNavy">
      <Link
        href="/"
        className="flex items-center justify-center whitespace-nowrap text-2xl text-[40px] font-black text-customGreen"
      >
        <Logo siteName={siteName} />
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
        <ul className="flex flex-col items-center w-full space-y-2 text-2xl text-center mt-4 xl:mt-0 lg:flex-row lg:space-y-0 lg:justify-center">
          {menuItems.map(({ href, label }) => (
            <li key={href} className="lg:ml-12">
              <Link
                href={"/page/" + href}
                className={`rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-customGreen ${isActive(
                  href
                )}`}
                onClick={handleCloseMenu}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
