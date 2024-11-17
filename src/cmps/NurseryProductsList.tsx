import { getNurseryProducts } from "@/services/db/repositories/productRepository";
import { NurseryCard } from "./NurseryCard";

export const NurseryProductsList = async () => {
  const nurseryProducts = await getNurseryProducts();

  return (
    <div className="py-1 px-4 max-w-screen-lg mx-auto mt-8">
      <p className="text-center text-gray-600 mb-12 text-2xl">מוצרים</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
        {nurseryProducts.map((product) => (
          <NurseryCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
