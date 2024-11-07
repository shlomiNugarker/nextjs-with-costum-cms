import { Gallery } from "@/cmps/Gallery";
import { HeroImg } from "@/cmps/HeroImg";

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
          <HeroImg href="https://images.unsplash.com/photo-1575218823251-f9d243b6f720?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
        </div>
      </section>

      <section>
        <div className="animate-fade-in">
          <Gallery images={images} />
        </div>
      </section>
    </main>
  );
}
