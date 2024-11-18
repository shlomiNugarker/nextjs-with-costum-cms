import { DynamicTable } from "@/cmps/admin/DynamicTable";
import { getAllBlogs } from "@/services/db/repositories/blogRepository";
import { getAllContactMessages } from "@/services/db/repositories/contactMessagesRepository";
import { getAllSubscribers } from "@/services/db/repositories/newsletterRepository";
import {
  getNurseryProducts,
  getWeeklyProducts,
} from "@/services/db/repositories/productRepository";
import { getAllUsers } from "@/services/db/repositories/userRepository";

export const revalidate = 5;

interface Params {
  params: {
    tableName: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tableHandlers: Record<string, () => Promise<any[]>> = {
  contact_messages: getAllContactMessages,
  blogs: getAllBlogs,
  newsletter_subscribers: getAllSubscribers,
  nursery_products: getNurseryProducts,
  weekly_products: getWeeklyProducts,
  users: getAllUsers,
};

const Page = async ({ params: { tableName } }: Params) => {
  try {
    const handler = tableHandlers[tableName];
    if (!handler) {
      throw new Error(`Table "${tableName}" does not exist.`);
    }

    const data = await handler();

    return (
      <div className="pb-12 px-4 max-w-screen-lg mx-auto min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5 text-customNavy">
        <h1 className="text-3xl font-bold mb-4 capitalize">{`נתונים עבור ${tableName}`}</h1>
        <DynamicTable data={data || []} title={tableName} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    return (
      <div className="pb-12 px-4 max-w-screen-lg mx-auto min-h-[calc(100vh-70px)] flex flex-col justify-center items-center text-customNavy">
        <h1 className="text-2xl font-bold">שגיאה</h1>
        <p>{`לא ניתן לטעון את הטבלה "${tableName}".`}</p>
      </div>
    );
  }
};

export default Page;
