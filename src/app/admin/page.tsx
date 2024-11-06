import { auth, signOut } from "@/lib/auth";
import Link from "next/link";

export const revalidate = 5;

export default async function AdminPage() {
  const session = await auth();

  return (
    <div className="min-h-screen mt-10 flex flex-col items-center justify-center space-y-6 bg-gray-100 py-10">
      <h1 className="text-2xl text-center font-semibold text-customNavy">
        אתה מחובר בתור {session?.user?.email}
      </h1>

      <SignOut />

      <div className="mt-6 space-y-4">
        <Link href={"/admin/nursery-products"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            מוצרים במשתלה
          </button>
        </Link>
        <Link href={"/admin/weekly-products"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            תוצרת שבועית
          </button>
        </Link>
        <Link href={"/admin/blog"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            בלוג{" "}
          </button>
        </Link>
      </div>
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
