import Image from "next/image";

interface GalleryProps {
  images: string[];
}

interface GalleryImageProps {
  src: string;
  alt: string;
  index: number;
}

const GalleryImage = ({ src, alt, index }: GalleryImageProps) => (
  <div className="relative overflow-hidden rounded-lg shadow-md w-full h-64">
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      className="rounded-lg"
      priority={index < 6}
    />
  </div>
);

export const Gallery = ({ images }: GalleryProps) => {
  return (
    <div className="mx-auto pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-lg p-4 lg:gap-10 justify-center">
      {images.map((src, index) => (
        <GalleryImage
          key={index}
          src={src}
          alt={`תמונה ${index + 1}`}
          index={index}
        />
      ))}
    </div>
  );
};
