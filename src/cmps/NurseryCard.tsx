import Image from "next/image";

interface Product {
  image_url: string;
  name: string;
  description: string;
  pot_size: string;
  price: number;
}

export const NurseryCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col justify-between border rounded-lg overflow-hidden shadow-md bg-white">
      <div>
        <Image
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover"
          width={300}
          height={150}
        />
      </div>
      <div>
        <div className="p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-customNavy">
              {product.name}
            </h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-gray-500 mt-1">{product.pot_size}</p>
          </div>
        </div>
        <p className="mb-4 text-customGreen text-2xl font-bold mt-4 text-center">
          {product.price} ש&quot;ח
        </p>
      </div>
    </div>
  );
};
