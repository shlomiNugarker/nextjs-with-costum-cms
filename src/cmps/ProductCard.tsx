import Image from "next/image";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProductCard = ({ product }: any) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
      <Image
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
        width={300}
        height={150}
      />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-customNavy">
            {product.name}
          </h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-customGreen font-bold mt-4 text-center">
            {product.price}
          </p>
        </div>
        <button className="mt-4 w-full bg-customGreen text-white py-2 rounded">
          הוסף לסל
        </button>
      </div>
    </div>
  );
};
