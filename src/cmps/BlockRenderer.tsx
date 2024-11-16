"use client";

import Image from "next/image";
import { Gallery } from "./Gallery";

type Block = {
  id: number;
  block_type: string;
  content: string;
};

export const BlockRenderer = ({ block }: { block: Block }) => {
  switch (block.block_type) {
    case "input":
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
    case "text":
      return (
        <div className="text-center my-3">
          <p className="text-gray-600 text-2xl">{block.content}</p>
        </div>
      );
    case "gallery": {
      let images: string[] = [];
      try {
        images = JSON.parse(block.content || "[]");
      } catch (error) {
        console.error("Failed to parse gallery content:", error);
      }
      return (
        <div className="animate-fade-in my-3">
          <Gallery images={images} />
        </div>
      );
    }
    case "list": {
      let listItems: string[] = [];
      try {
        listItems = JSON.parse(block.content || "[]");
      } catch (error) {
        console.error("Failed to parse list content:", error);
      }
      return (
        <div className="flex my-3">
          <ul className="list-disc list-inside text-gray-600 space-y-3 mx-auto flex flex-col items-start">
            {listItems.map((item, index) => (
              <li key={index} className="text-2xl">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    case "image":
      return (
        <div className="text-center my-3">
          <Image
            src={block.content}
            alt="תמונת בלוק תוכן"
            className="mx-auto rounded-lg"
            width={500}
            height={600}
          />
        </div>
      );
    case "textarea":
      return (
        <div className="sm:col-span-2 my-3">
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
    // case "form":
    //   const fields = JSON.parse(block.content).fields || [];
    //   return (
    //     <div key={block.id} className="space-y-6">
    //       {fields.map((field: string, index: number) => (
    //         <div key={index}>
    //           <label className="text-3xl font-semibold text-customNavy mb-4">
    //             {field}
    //           </label>
    //           <input
    //             type="text"
    //             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
    //             placeholder={`הזן ${field}`}
    //             required
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   );
    default:
      return null;
  }
};
