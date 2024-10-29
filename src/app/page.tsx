import { HeroImg } from "@/cmps/HeroImg";
import { ProductCard } from "@/cmps/ProductCard";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div
        className="h-screen bg-cover bg-center bg-fixed z-[-2] absolute left-0 top-0 right-0 bottom-0 blur"
        style={{
          backgroundImage:
            "url('https://tzahile.co.il/wp-content/uploads/2021/06/new-bg-1920x1074.jpg')",
        }}
      ></div>

      <section className="w-full flex flex-col md:flex-row justify-center items-center mt-[90px] text-customNavy px-4">
        <div className="max-w-[500px] text-center md:text-right">
          <h1 className="text-4xl md:text-[70px] font-bold leading-tight">
            הגינה בפרדס - חווה אורגנית ומשתלה
          </h1>
          <br />
          <p className="text-base md:text-lg ">
            בשדה חקלאי קטן בפרדס חנה - מגדלים פירות יער 🍓 עלים 🌿 ירקות שורש
            🍠🌶️ ומשתלה קטנה של צמחי פרי/תבלין ונוי 🪴 - תוצרת אורגנית וללא
            חומרי הדברה (ביולוגי)🐞
          </p>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8 flex justify-center">
          <HeroImg />
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-bold text-customNavy">
              המוצרים שלנו
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 lg:mt-16">
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
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
          <article className="col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
            <a href="#" className="block h-full w-full">
              <Image
                width={300}
                height={300}
                className="max-h-40 w-full object-cover transition-all duration-300 group-hover:scale-125"
                alt="featured image"
                src="https://images.unsplash.com/photo-1660241588741-d653d53348fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              />
              <div className="w-full bg-white p-4">
                <p className="text-md font-medium text-customGreen">Nature</p>
                <p className="mb-2 text-lg sm:text-xl font-medium text-customNavy">
                  A Visit to Mount Abignale
                </p>
                <p className="font-light text-gray-500">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
                  vel neque ipsam?
                </p>
                <div className="justify-start mt-4 flex flex-wrap items-center">
                  <div className="mr-2 mt-1 rounded-2xl bg-customPeach py-1.5 px-4 text-xs text-gray-600">
                    #js
                  </div>
                  <div className="mr-2 mt-1 rounded-2xl bg-customPeach py-1.5 px-4 text-xs text-gray-600">
                    #icefactory
                  </div>
                </div>
              </div>
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
