import Image from "next/image";

interface GalleryProps {
  images: string[];
}

const isLoaded = true;
export const Gallery = ({ images }: GalleryProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center mb-8 text-customNavy">
        הגלריה שלנו
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg shadow-lg transition-opacity duration-1000 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Image
              src={image}
              alt={image}
              width={400}
              height={400}
              className="w-full h-full  object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute inset-0 bg-customNavy bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">
                {/* {"כותרת של התמונה"} */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
