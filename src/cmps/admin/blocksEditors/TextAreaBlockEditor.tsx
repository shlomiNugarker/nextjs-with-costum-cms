import { BlockEditorProps } from "../ContentBlockEditForm";

export const TextAreaBlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onChange,
}) => (
  <textarea
    value={block.content}
    onChange={(e) => onChange(block.id, e.target.value)}
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition shadow-sm"
    rows={4}
  />
);
