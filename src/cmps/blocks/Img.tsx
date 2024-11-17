import Image from "next/image";

export const Img = ({ src }: { src: string }) => {
  return (
    <div className="text-center my-3">
      <Image
        src={src}
        alt="תמונת בלוק תוכן"
        className="mx-auto rounded-lg"
        width={500}
        height={600}
      />
    </div>
  );
};
