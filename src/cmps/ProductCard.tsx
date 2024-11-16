import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string | null;
  created_at: Date | null;
  weight: string | null;
  category: string | null;
  price: number;
  image_url: string | null;
}

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-transparent flex flex-col justify-between transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
      <div className="text-center">
        <div>
          <Image
            src={product.image_url || ""}
            alt={product.name}
            className="w-full h-48 object-cover"
            width={400}
            height={200}
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-customNavy mb-2">
            {product.name}
          </h2>
          <p className="text-sm text-gray-600 leading-tight mb-2">
            {product.description}
          </p>
          <p className="text-sm text-gray-500">{product.weight}</p>
        </div>
      </div>
      <div className="bg-customPeach py-2">
        <p className="text-customGreen font-bold text-lg text-center">
          {product.price} ש&quot;ח
        </p>
      </div>
    </div>
  );
};
