import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-4">
      <h2 className="text-4xl font-bold text-customNavy mb-4">הדף לא נמצא</h2>
      <p className="text-gray-600 mb-8">
        אופס... נראה שאין דף כזה 😊 אולי תרצי/ה לחזור לדף הבית שלנו.
      </p>
      <Link href="/">
        <button className="bg-customGreen text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-200">
          חזרה לדף הבית
        </button>
      </Link>
    </div>
  );
}
