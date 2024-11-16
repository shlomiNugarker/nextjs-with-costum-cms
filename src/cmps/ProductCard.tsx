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
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white flex flex-col justify-between transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
      <div>
        <div>
          <Image
            src={product.image_url || ""}
            alt={product.name}
            className="w-full h-60 object-cover rounded-t-lg"
            width={400}
            height={200}
          />
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-customNavy mb-3">
              {product.name}
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {product.description}
            </p>
            <p className="text-gray-500 mb-3 font-medium">
              משקל: {product.weight}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-customPeach py-4">
        <p className="text-customGreen font-bold text-3xl text-center">
          {product.price} ש&quot;ח
        </p>
      </div>
    </div>
  );
};
