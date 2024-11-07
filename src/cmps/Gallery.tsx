import Image from "next/image";

export const Gallery = ({ images }: { images: string[] }) => {
  return (
    <div className="mx-auto pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-lg  p-4  lg:gap-10 justify-center">
      {images.map((src, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg shadow-md w-full h-64"
        >
          <Image
            src={src}
            alt={`תמונה ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority={index < 6}
          />
        </div>
      ))}
    </div>
  );
};
