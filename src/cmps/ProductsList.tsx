/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ProductCard } from "./ProductCard";
import { tableApiService } from "@/services/client-api/tableApi";

export const ProductsList = async () => {
  try {
    const products: any = await tableApiService.getAllRecords("productsTable");

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return (
      <div className="text-red-500">
        שגיאה בטעינת המוצרים. נסה שוב מאוחר יותר.
      </div>
    );
  }
};
