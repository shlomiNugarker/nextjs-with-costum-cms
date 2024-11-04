import { NurseryCard } from "@/cmps/NurseryCard";
import { getNurseryProducts } from "@/lib/queries";
import Link from "next/link";

export default async function page() {
  const nurseryProducts = await getNurseryProducts();
  return (
    <div className="min-h-screen pt-20">
      <div className="pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {nurseryProducts.map((product) => (
          <Link href={`edit-nursery-product/${product.id}`} key={product.id}>
            <NurseryCard product={product} />
            <button>ערוך מוצר</button>
          </Link>
        ))}
      </div>

      <Link href={"add-nursery-product"}>
        <button>הוסף מוצר</button>
      </Link>
    </div>
  );
}
