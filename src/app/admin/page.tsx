import { auth, signOut } from "@/lib/auth";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      You are logged in as {session?.user?.email}
      <SignOut />
      <br />
      <Link href={"/admin/nursery-products"}> מוצרים במשתלה</Link>
      <Link href={"/admin/weekly-products"}> תוצרת שבועית</Link>
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
      <button type="submit">Sign out</button>
    </form>
  );
}
