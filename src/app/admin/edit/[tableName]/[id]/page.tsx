/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericEditForm } from "@/cmps/admin/GenericEditForm";
import { tableApiService } from "@/services/client-api/tableApi";
import { TableName } from "@/services/db/schema";

type PageProps<T extends TableName> = {
  params: {
    tableName: T;
    id: string;
  };
};

export const revalidate = 5;

export default async function Page<T extends TableName>({
  params,
}: PageProps<T>) {
  const record = await tableApiService.getRecordById(
    params.tableName,
    Number(params.id)
  );

  if (!record) {
    return <div>לא נמצא רשומה עם מזהה זה</div>;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { created_at, ...rest } = record as any;
  const fields = Object.keys(rest);

  return (
    <div className="pb-12 px-4 max-w-screen-lg mx-auto min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5 text-customNavy">
      <GenericEditForm
        fields={fields}
        tableName={params.tableName}
        record={rest}
      />
    </div>
  );
}
