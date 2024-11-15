import { SubmitButton } from "@/cmps/submit-button";
import React from "react";

export const Contact = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: (formData: FormData) => Promise<void>;
}) => {
  return (
    <section className="mt-10" id="contact">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="text-4xl font-bold text-center mb-6 text-customNavy">
          {title}
        </h2>
        <p className="text-center text-gray-600 mb-12 text-2xl">
          {description}
        </p>
        <form action={action}>
          <div className="space-y-8">
            <div>
              <label
                className="text-3xl font-semibold text-customNavy mb-4"
                htmlFor="name"
              >
                שם
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
                placeholder="הזן את שמך"
                required
              />
            </div>
            <div>
              <label
                className="text-3xl font-semibold text-customNavy mb-4"
                htmlFor="email"
              >
                דוא&ldquo;ל
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
                placeholder="הזן את כתובת הדואל שלך"
                required
              />
            </div>
            <div>
              <label
                className="text-3xl font-semibold text-customNavy mb-4"
                htmlFor="message"
              >
                הודעה
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
                placeholder="כתוב את הודעתך כאן"
                rows={5}
                required
              ></textarea>
            </div>
          </div>
          <div className="p-6 sm:px-12">
            <SubmitButton>שלח הודעה</SubmitButton>
          </div>
        </form>
      </div>
    </section>
  );
};
