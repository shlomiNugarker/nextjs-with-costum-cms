import Image from "next/image";
import React from "react";

export const ProductCard = () => {
  return (
    <article className="bg-white col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
      <div className="aspect-square overflow-hidden">
        <Image
          className="w-full h-auto object-contain transition-all duration-300 group-hover:scale-105"
          src="https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          width={300}
          height={300}
        />
      </div>

      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <div className="mb-2 flex">
          <p className="mr-3 font-semibold text-customNavy">$99.00</p>
          <del className="text-gray-400"> $79.00 </del>
        </div>
        <h3 className="mb-2  text-customNavy">פלפל</h3>
      </div>
    </article>
  );
};
