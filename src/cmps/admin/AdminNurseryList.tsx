/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { NurseryCard } from "../NurseryCard";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export const revalidate = 5;

export const AdminNurseryList = async () => {
  const nurseryProducts = await genericRepository.getAll(
    "nurseryProductsTable"
  );

  return (
    <>
      <div className="flex justify-center mt-8">
        <Link href={"nursery-products/weekly-products/"}>
          <p className="text-4xl font-bold text-center mb-6 text-customNavy ">
            מוצרים במשתלה
          </p>
        </Link>
      </div>
      <div className="pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {nurseryProducts.map((product) => (
          <div key={product.id} className="relative">
            <Link href={`nursery-products/edit-nursery-product/${product.id}`}>
              <NurseryCard product={product} />
              <button className="w-full py-2 px-4 bg-customGreen text-white font-semibold rounded-lg hover:bg-opacity-90 transition">
                ערוך
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8  mb-5">
        <Link href={"nursery-products/add-nursery-product"}>
          <button className="py-3 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition shadow-lg">
            הוסף מוצר
          </button>
        </Link>
      </div>
    </>
  );
};
