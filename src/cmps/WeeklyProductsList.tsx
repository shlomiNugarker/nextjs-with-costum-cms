import { getWeeklyProducts } from "@/services/db/repositories/productRepository";
import React from "react";
import { ProductCard } from "./ProductCard";

export const WeeklyProductsList = async () => {
  const weeklyProducts = await getWeeklyProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {weeklyProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
