import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1486328228599-85db4443971f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1679428402040-e3c93439ec13?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/uploads/141247613151541c06062/c15fb37d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1663045413976-8454dcf8524e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1621460248083-6271cc4437a8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1621459555843-9a77f1d03fae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1663054732005-26902b2fc6d4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1724129050516-566d2ab60e63?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1678655491251-bbc237156a5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1663089153028-2d7b5e01d0f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
];

export const Gallery = () => {
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
