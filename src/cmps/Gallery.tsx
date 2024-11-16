/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

interface GalleryProps {
  images: string[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const columns = 3;

  const columnImages: string[][] = [];
  for (let i = 0; i < columns; i++) {
    columnImages[i] = [];
  }

  images.forEach((image, index) => {
    const columnIndex = index % columns;
    columnImages[columnIndex].push(image);
  });

  return (
    <div
      className={`grid grid-cols-2 container mx-auto mb-7 gap-4 md:grid-cols-${columns}`}
    >
      {columnImages.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4 items-start">
          {column.map((imageSrc, imageIndex) => (
            <Image
              width={400}
              height={300}
              key={imageIndex}
              className="h-auto max-w-full w-full object-cover rounded-lg object-center"
              src={imageSrc}
              alt={`gallery-photo-${columnIndex}-${imageIndex}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
