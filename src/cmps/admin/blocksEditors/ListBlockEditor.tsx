import { BlockEditorProps } from "./ContentBlockEditForm";

export const ListBlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onChange,
}) => (
  <textarea
    value={block.content}
    onChange={(e) => onChange(block.id, e.target.value)}
    placeholder='הזן פריטים בפורמט JSON, למשל: ["פריט1", "פריט2"]'
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
    rows={4}
  />
);
