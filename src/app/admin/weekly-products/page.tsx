import { ProductCard } from "@/cmps/ProductCard";
import { getWeeklyProducts } from "@/lib/queries";
import Link from "next/link";

export default async function page() {
  const weekyProducts = await getWeeklyProducts();
  return (
    <div className="min-h-screen pt-20">
      <div className="pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {weekyProducts.map((product) => (
          <Link
            href={`weekly-products/edit-weekly-product/${product.id}`}
            key={product.id}
          >
            <ProductCard product={product} />
            <button>ערוך מוצר</button>
          </Link>
        ))}
      </div>

      <Link href={"weekly-products/add-weekly-product"}>
        <button>הוסף מוצר</button>
      </Link>
    </div>
  );
}
