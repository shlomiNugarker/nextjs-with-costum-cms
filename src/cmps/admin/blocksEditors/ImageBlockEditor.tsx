import Image from "next/image";
import { BlockEditorProps } from "../ContentBlockEditForm";

export const ImageBlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onChange,
}) => (
  <div>
    <input
      type="text"
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
      placeholder="כתובת URL של התמונה"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
    />
    {block.content && (
      <Image
        src={block.content}
        width={100}
        height={100}
        alt="Selected"
        className="mt-4 max-w-full h-auto rounded-lg shadow-md"
      />
    )}
  </div>
);
