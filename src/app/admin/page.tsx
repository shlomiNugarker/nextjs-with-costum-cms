import { auth, signOut } from "@/services/auth";
import Link from "next/link";

export const revalidate = 5;

export default async function AdminPage() {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-100 text-customNavy">
      <h1 className="text-4xl font-bold text-center mb-12 text-customNavy">
        ערוך עמודים{" "}
      </h1>
      <div className="mt-6 flex flex-col">
        <Link href={"/admin/site-info"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            מידע כללי
          </button>
        </Link>
        <Link href={"/admin/home"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            עמוד דף הבית{" "}
          </button>
        </Link>
        <Link href={"/admin/nursery"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            עמוד המשתלה{" "}
          </button>
        </Link>
        <Link href={"/admin/weekly-produce"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            עמוד תוצרת שבועית{" "}
          </button>
        </Link>
        <Link href={"/admin/blog"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            עמוד הבלוג{" "}
          </button>
        </Link>
        <Link href={"/admin/about"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            עמוד אודות{" "}
          </button>
        </Link>
        <Link href={"/admin/delivery"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            משלוחים
          </button>
        </Link>
        <Link href={"/admin/contact"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            צור קשר
          </button>
        </Link>

        <h1 className="text-2xl text-center font-semibold text-customNavy">
          אתה מחובר בתור {session?.user?.email}
        </h1>
      </div>
      <SignOut />
    </div>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="py-2 px-6 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
      >
        התנתק
      </button>
    </form>
  );
}
