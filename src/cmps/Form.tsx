export function Form({
  action,
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any;
  children: React.ReactNode;
}) {
  return (
    <form
      action={action}
      className="flex text-customNavy flex-col space-y-6 py-8 px-6 sm:px-12 bg-white shadow-lg rounded-lg max-w-md mx-auto"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-bold uppercase text-gray-600"
        >
          דואר אלקטורוני{" "}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={"shlomin1231@gmail.com"}
          placeholder="user@acme.com"
          autoComplete="email"
          required
          className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-customGreen focus:ring-customGreen focus:outline-none sm:text-sm"
        />
      </div>
      {/* <div>
        <label
          htmlFor="username"
          className="block text-xs font-bold uppercase text-gray-600"
        >
          שם מלא{" "}
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Israel Israeli"
          required
          className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-customGreen focus:ring-customGreen focus:outline-none sm:text-sm"
        />
      </div> */}
      <div>
        <label
          htmlFor="password"
          className="block text-xs font-bold uppercase text-gray-600"
        >
          סיסמא
        </label>
        <input
          id="password"
          name="password"
          defaultValue={"12345678"}
          type="password"
          required
          className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-customGreen focus:ring-customGreen focus:outline-none sm:text-sm"
        />
      </div>
      {children}
    </form>
  );
}
