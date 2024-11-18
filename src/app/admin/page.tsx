import { auth, signOut } from "@/services/auth";
import { getAllPages } from "@/services/db/repositories/pageRepository";
import Link from "next/link";

export const revalidate = 5;

export default async function AdminPage() {
  const session = await auth();
  const pages = await getAllPages();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6  text-customNavy">
      <h1 className="text-4xl font-bold text-center mb-12 text-customNavy">
        ערוך עמודים{" "}
      </h1>
      <div className="mt-6 flex flex-col">
        <Link href={"/admin/site-info"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            מידע כללי
          </button>
        </Link>
        <Link href={"/admin/table/contact-messages"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            הודעות יצירת קשר{" "}
          </button>
        </Link>
        {pages.map((page) => (
          <Link key={page.id} href={`/admin/${page.name}`}>
            <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
              {page.name}
            </button>
          </Link>
        ))}

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
