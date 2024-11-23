import { safeJSONParse } from "@/services/utilService";
import { BlockEditorProps } from "../ContentBlockEditForm";
import Image from "next/image";

export const GalleryBlockEditor: React.FC<
  BlockEditorProps & {
    onUpload: (id: number, index: number, file: File) => void;
    onAddImage: (id: number) => void;
    onRemoveImage: (id: number, index: number) => void;
  }
> = ({ block, onChange, onUpload, onAddImage, onRemoveImage, loading }) => {
  const gallery = safeJSONParse<string[]>(block.content) || [];

  const handleImageChange = (index: number, newUrl: string) => {
    gallery[index] = newUrl;
    onChange(block.id, JSON.stringify(gallery));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-customNavy mb-2">
        ערוך גלריה:
      </h3>
      {gallery.map((imageUrl, index) => (
        <div key={index} className="mb-4 flex items-center">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => handleImageChange(index, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-right"
            placeholder="כתובת URL של תמונה"
          />
          <input
            type="file"
            onChange={(e) =>
              e.target.files && onUpload(block.id, index, e.target.files[0])
            }
            className="ml-2"
            disabled={loading}
          />
          <button
            onClick={() => onRemoveImage(block.id, index)}
            className="ml-2 p-2 bg-red-500 text-white rounded-lg"
          >
            הסר
          </button>
          {imageUrl && (
            <Image
              width={100}
              height={100}
              src={imageUrl}
              alt={`Gallery item ${index + 1}`}
              className="ml-4 max-w-xs h-auto rounded-lg shadow-md"
            />
          )}
        </div>
      ))}
      <button
        onClick={() => onAddImage(block.id)}
        className="mt-2 py-1 px-4 bg-customGreen text-white font-semibold rounded-lg"
      >
        הוסף תמונה לגלריה
      </button>
    </div>
  );
};
