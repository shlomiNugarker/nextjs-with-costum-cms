/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export const Contact = ({ title, description, contentBlocks }: any) => {
  const sortedBlocks = contentBlocks
    .slice()
    .sort((a: any, b: any) => (a.position || 0) - (b.position || 0));

  return (
    <section className="mt-10" id="contact">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="text-4xl font-bold text-center mb-6 text-customNavy">
          {title}
        </h2>
        <p className="text-center text-gray-600 mb-12 text-2xl">
          {description}
        </p>
        <form action="#" className="space-y-8">
          {sortedBlocks.map((block: any) => {
            switch (block.block_type) {
              case "input":
                return (
                  <div key={block.id}>
                    <label
                      htmlFor={`input-${block.id}`}
                      className="text-3xl font-semibold text-customNavy mb-4"
                    >
                      {block.content}
                    </label>
                    <input
                      type="text"
                      id={`input-${block.id}`}
                      className="shadow-sm bg-gray-50 border outline-customPeach border-gray-300 text-customNavy rounded-lg focus:ring-customGreen focus:border-customGreen block w-full p-2.5"
                      placeholder={block.content}
                      required
                    />
                  </div>
                );
              case "textarea":
                return (
                  <div key={block.id} className="sm:col-span-2">
                    <label
                      htmlFor={`textarea-${block.id}`}
                      className="text-3xl font-semibold text-customNavy mb-4"
                    >
                      {block.content}
                    </label>
                    <textarea
                      id={`textarea-${block.id}`}
                      rows={3}
                      className="block p-2.5 w-full text-customNavy bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-customGreen focus:border-customGreen outline-customPeach"
                      placeholder={block.content}
                    ></textarea>
                  </div>
                );
              case "form":
                // Parsing JSON content to extract form fields
                const fields = JSON.parse(block.content).fields || [];
                return (
                  <div key={block.id} className="space-y-6">
                    {fields.map((field: string, index: number) => (
                      <div key={index}>
                        <label className="text-3xl font-semibold text-customNavy mb-4">
                          {field}
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
                          placeholder={`הזן ${field}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                );

              default:
                return null;
            }
          })}
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
