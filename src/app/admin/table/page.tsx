import Link from "next/link";

const tables = [
  { href: "/admin/table/contactMessagesTable", label: "טבלת contact_messages" },
  { href: "/admin/table/blogsTable", label: "טבלת blogs" },
  { href: "/admin/table/pagesTable", label: "טבלת pages" },
  { href: "/admin/table/contentBlocksTable", label: "טבלת content_blocks" },
  {
    href: "/admin/table/newsletterSubscribers",
    label: "טבלת newsletter_subscribers",
  },
  { href: "/admin/table/nurseryProductsTable", label: "טבלת nursery_products" },
  { href: "/admin/table/weeklyProductsTable", label: "טבלת weekly_products" },
];

export default async function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 text-customNavy">
      <h1 className="text-4xl font-bold text-center mb-12 text-customNavy">
        טבלאות
      </h1>
      <div className="mt-6 flex flex-col">
        {tables.map((table, index) => (
          <Link key={index} href={table.href}>
            <button className="w-full py-2 px-6 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition mb-4">
              {table.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
