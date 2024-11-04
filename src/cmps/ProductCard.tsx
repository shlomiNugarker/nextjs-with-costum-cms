import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProductCard = ({ product }: any) => {
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
        <p className="text-customGreen font-bold text-2xl  text-center">
          {product.price}
        </p>
        {/* <button className="mt-4 w-full bg-customGreen text-white py-2 rounded">
          הוסף לסל
        </button> */}
      </div>
    </div>
  );
};
