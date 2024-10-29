import Link from "next/link";

export const Header = () => {
  return (
    <header className="text-customNavy container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center">
      <Link
        href="/"
        className="flex items-center justify-center whitespace-nowrap text-2xl text-[40px]  font-black text-customGreen"
      >
        <span className="text-2xl font-bold text-customNavy">
          הגינה<span className="text-customGreen">בפרדס</span>.
        </span>
      </Link>
      <input type="checkbox" className="peer hidden" id="navbar-open" />
      <label
        className="absolute top-5 right-5 cursor-pointer lg:hidden text-customNavy"
        htmlFor="navbar-open"
      >
        <svg
          className="h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
      <nav
        aria-label="Header Navigation"
        className="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row"
      >
        <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
          <li className="lg:ml-12">
            <Link
              className="rounded text-customNavy transition focus:outline-none focus:ring-1 focus:ring-customGreen focus:ring-offset-2"
              href="/"
            >
              אודות{" "}
            </Link>
          </li>
          <li className="lg:ml-12">
            <Link
              className="rounded text-customNavy transition focus:outline-none focus:ring-1 focus:ring-customGreen focus:ring-offset-2"
              href="/delivery"
            >
              משלוחים
            </Link>
          </li>
          <li className="lg:ml-12">
            <Link
              className="rounded text-customNavy transition focus:outline-none focus:ring-1 focus:ring-customGreen focus:ring-offset-2"
              href="#contact"
            >
              דברו איתנו
            </Link>
          </li>
          <li className="lg:ml-12">
            <Link
              className="rounded text-customNavy transition focus:outline-none focus:ring-1 focus:ring-customGreen focus:ring-offset-2"
              href="/blog"
            >
              הבלוג
            </Link>
          </li>
        </ul>
        <hr className="mt-4 w-full border-customPeach lg:hidden" />
      </nav>
    </header>
  );
};
