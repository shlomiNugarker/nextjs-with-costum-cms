/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicTable } from "@/cmps/admin/DynamicTable";
// import { tableApiService } from "@/services/client-api/tableApi";
import { genericRepository } from "@/services/db/repositories/genericRepository";
import { TableName } from "@/services/db/schema";

const SITE_ID = process.env.NEXT_PUBLIC_POSTGRES_SITE_ID!;

export const revalidate = 5;

interface Params {
  params: {
    tableName: TableName;
  };
}

const Page = async ({ params: { tableName } }: Params) => {
  try {
    // const data: any = await tableApiService.getAllRecords(tableName);
    const data: any = await genericRepository.getAll(SITE_ID, tableName);

    return (
      <div className="pb-12 px-4 max-w-screen-lg mx-auto min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5 text-customNavy">
        <h1 className="text-3xl font-bold mb-4 capitalize">{`נתונים עבור ${tableName}`}</h1>
        <DynamicTable data={data || []} tableName={tableName} />
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
