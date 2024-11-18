import { DynamicTable } from "@/cmps/DynamicTable";
import { getAllContactMessages } from "@/services/db/repositories/contactMessagesRepository";

export const revalidate = 5;

interface Params {
  params: {
    tableName: string;
  };
}

const Page = async ({ params: { tableName } }: Params) => {
  let data;

  if (tableName === "contact-messages") {
    data = await getAllContactMessages();
  }

  return (
    <div className="pb-12 px-4 max-w-screen-lg mx-auto  min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5 text-customNavy">
      {tableName}
      <DynamicTable data={data || []} title="הודעות צור קשר" />
    </div>
  );
};

export default Page;
