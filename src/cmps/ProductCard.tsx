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
    <div className="border rounded-lg overflow-hidden shadow-md bg-white flex flex-col justify-between">
      <div>
        <div>
          <Image
            src={product.image_url || ""}
            alt={product.name}
            className="w-full h-48 object-cover"
            width={300}
            height={150}
          />
        </div>
        <div className="p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-customNavy mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-500 mb-2">משקל: {product.weight}</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-customGreen font-bold text-2xl text-center">
          {product.price} ש&quot;ח
        </p>
      </div>
    </div>
  );
};
