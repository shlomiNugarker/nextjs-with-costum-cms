/* eslint-disable @typescript-eslint/no-explicit-any */
import { genericRepository } from "@/services/db/repositories/genericRepository";
import React from "react";
import { ProductCard } from "./ProductCard";

export const WeeklyProductsList = async () => {
  const weeklyProducts: any = await genericRepository.getAll(
    "weeklyProductsTable"
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {weeklyProducts.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
