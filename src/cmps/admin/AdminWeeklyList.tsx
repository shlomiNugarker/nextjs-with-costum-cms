import { genericRepository } from "@/services/db/repositories/genericRepository";
import Link from "next/link";
import { ProductCard } from "../ProductCard";

export const AdminWeeklyList = async () => {
  const weeklyProducts = await genericRepository.getAll("weeklyProductsTable");

  return (
    <>
      <div className="flex justify-center mt-8">
        <Link href={"weekly-products/"}>
          <p className="text-4xl font-bold text-center mb-6 text-customNavy ">
            מוצרים
          </p>
        </Link>
      </div>
      <div className="pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {weeklyProducts.map((product) => (
          <div key={product.id} className="relative w-full max-w-xs">
            <ProductCard product={product} />
            <Link href={`weekly-products/edit-weekly-product/${product.id}`}>
              <button className="w-full py-2 px-4 bg-customGreen text-white font-semibold rounded-lg hover:bg-opacity-90 transition">
                ערוך מוצר
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link href={"weekly-products/add-weekly-product"}>
          <button className="py-3 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition shadow-lg">
            הוסף מוצר
          </button>
        </Link>
      </div>
    </>
  );
};
