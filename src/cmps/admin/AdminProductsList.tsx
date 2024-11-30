/* eslint-disable @typescript-eslint/no-explicit-any */
// import { tableApiService } from "@/services/client-api/tableApi";
import Link from "next/link";
import { ProductCard } from "../ProductCard";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export const AdminProductsList = async () => {
  try {
    // const products: any = await tableApiService.getAllRecords("productsTable");
    const products: any = await genericRepository.getAll(
      process.env.NEXT_PUBLIC_POSTGRES_SITE_ID || "1",
      "productsTable"
    );

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
          {products?.map((product: any) => (
            <div key={product.id} className="relative w-full max-w-xs">
              <ProductCard product={product} />
              <Link href={`/admin/edit/productsTable/${product.id}`}>
                <button className="w-full py-2 px-4 bg-customGreen text-white font-semibold rounded-lg hover:bg-opacity-90 transition">
                  ערוך מוצר
                </button>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href={"/admin/add/productsTable"}>
            <button className="py-3 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition shadow-lg">
              הוסף מוצר
            </button>
          </Link>
        </div>
      </>
    );
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return (
      <div className="text-red-500 text-center mt-8">
        שגיאה בטעינת המוצרים. נסה שוב מאוחר יותר.
      </div>
    );
  }
};
