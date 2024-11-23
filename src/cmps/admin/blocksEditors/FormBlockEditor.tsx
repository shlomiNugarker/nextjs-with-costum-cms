import { safeJSONParse } from "@/services/utilService";
import { BlockEditorProps } from "../ContentBlockEditForm";

export const FormBlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onChange,
}) => {
  const parsedContent = safeJSONParse<{ fields: string[] }>(block.content) || {
    fields: [],
  };

  const handleFieldChange = (index: number, newValue: string) => {
    parsedContent.fields[index] = newValue;
    onChange(block.id, JSON.stringify(parsedContent));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-customNavy mb-2">
        ערוך שדות טופס:
      </h3>
      {parsedContent.fields.map((field, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={field}
            onChange={(e) => handleFieldChange(index, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-right"
            placeholder={`ערוך שדה ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};
