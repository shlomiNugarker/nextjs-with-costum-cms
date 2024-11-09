export const Contact = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <section className="mt-10" id="contact">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="text-4xl font-bold text-center mb-6 text-customNavy ">
          {title}
        </h2>
        <p className="text-center text-gray-600 mb-12 text-2xl">
          {description}
        </p>
        <form action="#" className="space-y-8">
          <div>
            <label
              htmlFor="name"
              className="text-3xl font-semibold text-customNavy mb-4"
            >
              שם{" "}
            </label>
            <input
              type="text"
              id="name"
              className="shadow-sm  bg-gray-50 border outline-customPeach border-gray-300 text-customNavy rounded-lg focus:ring-customGreen focus:border-customGreen block w-full p-2.5"
              placeholder="ישראל ישראלי"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="text-3xl font-semibold text-customNavy mb-4"
            >
              טלפון
            </label>
            <input
              type="phone"
              id="phone"
              className="shadow-sm bg-gray-50 border border-gray-300 outline-customPeach text-customNavy rounded-lg focus:ring-customGreen focus:border-customGreen block w-full p-2.5"
              placeholder="052-123-45-67"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-3xl font-semibold text-customNavy mb-4"
            >
              האימייל שלך
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-customNavy rounded-lg focus:ring-customGreen focus:border-customGreen block w-full p-2.5 outline-customPeach"
              placeholder="name@domain.com"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="text-3xl font-semibold text-customNavy mb-4"
            >
              ההודעה שלך
            </label>
            <textarea
              id="message"
              rows={3}
              className="block p-2.5 w-full text-customNavy bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-customGreen focus:border-customGreen outline-customPeach"
              placeholder="השאירו הודעה כאן..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 font-medium text-center text-white rounded-lg bg-customGreen sm:w-fit hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-customGreen"
          >
            שלח הודעה
          </button>
        </form>
      </div>
    </section>
  );
};
