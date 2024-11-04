import { ProductCard } from "@/cmps/ProductCard";
import { getWeeklyProducts } from "@/lib/queries";
import Link from "next/link";

export const revalidate = 1;

export default async function page() {
  const weeklyProducts = await getWeeklyProducts();
  return (
    <div className="min-h-screen pt-[200px]  px-4 text-customNavy">
      <div className="flex justify-center mt-8">
        <Link href={"weekly-products/"}>
          <p>תוצרת שבועית</p>
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
    </div>
  );
}
