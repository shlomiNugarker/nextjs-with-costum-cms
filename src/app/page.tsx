import { BlogCard } from "@/cmps/BlogCard";
import { HeroImg } from "@/cmps/HeroImg";
import { ProductCard } from "@/cmps/ProductCard";

export default function Home() {
  return (
    <main>
      <div
        className="h-screen bg-cover bg-center fixed z-[-2]  left-0 top-0 right-0 bottom-0 blur"
        style={{
          backgroundImage:
            "url('https://tzahile.co.il/wp-content/uploads/2021/06/new-bg-1920x1074.jpg')",
        }}
      ></div>

      <section className="mt-5 h-[100vh] w-full flex flex-col md:flex-row justify-center items-center  text-customNavy px-4">
        <div className="max-w-[500px] text-center md:text-right">
          <h1 className="text-4xl md:text-[70px] font-bold leading-tight">
            הגינה בפרדס - חווה אורגנית ומשתלה
          </h1>
          <br />
          <p className="">
            בשדה חקלאי קטן בפרדס חנה - מגדלים פירות יער 🍓 עלים 🌿 ירקות שורש
            🍠🌶️ ומשתלה קטנה של צמחי פרי/תבלין ונוי 🪴 - תוצרת אורגנית וללא
            חומרי הדברה (ביולוגי)🐞
          </p>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8 flex justify-center ">
          <HeroImg />
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-bold text-customNavy">
              המוצרים שלנו
            </h2>
          </div>
          <div className="mx-auto grid max-w-screen-lg  grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-10 justify-center">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>

      {/*  */}

      <section className="py-12 sm:py-16 lg:py-20">
        <h1 className="mb-8 text-center font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-customNavy">
          הבלוג
        </h1>
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-10 justify-center">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </section>
    </main>
  );
}
