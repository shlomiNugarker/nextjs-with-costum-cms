import Link from "next/link";

export default async function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6  text-customNavy">
      <h1 className="text-4xl font-bold text-center mb-12 text-customNavy">
        טבלאות{" "}
      </h1>
      <div className="mt-6 flex flex-col">
        <Link href={"/admin/table/contact_messages"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            טבלת contact_messages{" "}
          </button>
        </Link>
        <Link href={"/admin/table/blogs"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            טבלת blogs: getAllBlogs,{" "}
          </button>
        </Link>
        <Link href={"/admin/table/newsletter_subscribers"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            טבלת newsletter_subscribers{" "}
          </button>
        </Link>
        <Link href={"/admin/table/nursery_products"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            טבלת nursery_products
          </button>
        </Link>
        <Link href={"/admin/table/weekly_products"}>
          <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
            טבלת weekly_products
          </button>
        </Link>
      </div>
    </div>
  );
}
