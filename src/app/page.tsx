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

      <section>
        <div className="animate-fade-in">
          <Gallery />
        </div>
      </section>
    </main>
  );
}
