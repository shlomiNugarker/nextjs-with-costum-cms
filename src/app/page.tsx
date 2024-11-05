import { BlogCard } from "@/cmps/BlogCard";
import { Gallery } from "@/cmps/Gallery";
import { HeroImg } from "@/cmps/HeroImg";

export default function Home() {
  return (
    <main>
      <section className="mt-5 h-[100vh] w-full flex flex-col md:flex-row justify-center items-center text-customNavy px-4 animate-float">
        <div className="max-w-[500px] text-center md:text-right animate-fade-in-up">
          <h1 className="text-4xl md:text-[70px] font-bold leading-tight ">
            הגינה בפרדס - חווה אורגנית ומשתלה
          </h1>
          <br />
          <p className="text-2xl">
            בשדה חקלאי קטן בפרדס חנה - מגדלים פירות יער 🍓 עלים 🌿 ירקות שורש
            🍠🌶️ ומשתלה קטנה של צמחי פרי/תבלין ונוי 🪴 - תוצרת אורגנית וללא
            חומרי הדברה (ביולוגי)🐞
          </p>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8 flex justify-center animate-fade-in">
          <HeroImg />
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <h1 className="mb-8 text-center font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-customNavy animate-fade-in-up">
          הבלוג
        </h1>
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-10 justify-center">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-fade-in-up delay-[index*100]">
              <BlogCard />
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="animate-fade-in">
          <Gallery />
        </div>
      </section>
    </main>
  );
}
