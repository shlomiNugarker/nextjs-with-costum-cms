import { Block } from "../BlockRenderer";

export const Text = ({ block }: { block: Block }) => {
  return (
    <div className="text-center my-3">
      <p className="text-gray-600 text-2xl">{block.content}</p>
    </div>
  );
};
