import React from "react";

export const Contact = () => {
  return (
    <section className="mt-10" id="contact">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-2 text-center font-sans text-2xl sm:text-4xl lg:text-5xl font-bold text-customNavy">
          צרו קשר
        </h2>
        <p className="mb-1 lg:mb-5 font-light text-center text-gray-600 sm:text-xl">
          השאירו פרטים ונחזור אליכם בהקדם
        </p>
        <form action="#" className="space-y-8">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-medium text-customNavy"
            >
              שם{" "}
            </label>
            <input
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border outline-customPeach border-gray-300 text-customNavy rounded-lg focus:ring-customGreen focus:border-customGreen block w-full p-2.5"
              placeholder="ישראל ישראלי"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 font-medium text-customNavy"
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
              className="block mb-2 font-medium text-customNavy"
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
              className="block mb-2 font-medium text-customNavy"
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
