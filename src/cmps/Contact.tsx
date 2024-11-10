/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { BlockRenderer } from "./BlockRenderer";

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
          {sortedBlocks.map((block: any) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
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
