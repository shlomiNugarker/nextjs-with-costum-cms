/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, signOut } from "@/services/auth";
import { tableApiService } from "@/services/client-api/tableApi";

import Link from "next/link";

export const revalidate = 5;

export default async function AdminPage() {
  try {
    const session = await auth();

    const pages: any = await tableApiService.getAllRecords("pagesTable");

    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 text-customNavy">
        <h1 className="text-4xl font-bold text-center mb-12 text-customNavy">
          דף ניהול
        </h1>

        <div className="mt-6 flex flex-col w-full max-w-md">
          <Link href={"/admin/site-info"}>
            <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
              ערוך מידע על האתר
            </button>
          </Link>

          <Link href={"/admin/table"}>
            <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
              ערוך טבלאות
            </button>
          </Link>

          <h3>עריכה של דפים עם בלוקים משוייכים:</h3>

          {pages?.map((page: any) => (
            <Link key={page.id} href={`/admin/${page.name}`}>
              <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
                עריכה והוספה לדף {page.name}
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
  } catch (error) {
    console.error("Error loading admin page:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl text-red-600">שגיאה בטעינת דף הניהול</h1>
      </div>
    );
  }
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
