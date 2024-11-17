import React from "react";
import { Block } from "../BlockRenderer";

export const Input = ({ block }: { block: Block }) => {
  return (
    <div className="my-3">
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
};
