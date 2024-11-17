import { Block } from "../BlockRenderer";

export const TextArea = ({ block }: { block: Block }) => {
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
};
