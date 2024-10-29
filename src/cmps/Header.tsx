import Link from "next/link";
// import Image from "next/image";

export const Header = () => {
  return (
    <header className="text-customNavy container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center">
      <Link
        href="/"
        className="flex items-center justify-center whitespace-nowrap text-2xl font-black text-customGreen"
      >
        <span className="mr-2 w-8">
          {/* <Image src="" alt="לןגו - הגינה בפרדס" width={300} height={300} /> */}
        </span>
        הגינה בפרדס
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
              עליי
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
              href="/contact"
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
        {/* <div className="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0">
          <Link
            href="/login"
            title=""
            className="whitespace-nowrap rounded font-medium text-customNavy transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-customGreen focus:ring-offset-2 hover:text-opacity-50"
          >
            Log in
          </Link>
          <Link
            href="/"
            title=""
            className="whitespace-nowrap rounded-xl bg-customGreen px-5 py-3 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-customGreen focus:ring-offset-2 hover:bg-opacity-90"
          >
            Get free trial
          </Link>
        </div> */}
      </nav>
    </header>
  );
};
