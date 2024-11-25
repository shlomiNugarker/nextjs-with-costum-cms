/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericEditForm } from "@/cmps/admin/GenericEditForm";
import { genericRepository } from "@/services/db/repositories/genericRepository";
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
  const record = await genericRepository.getById(
    params.tableName,
    Number(params.id)
  );

  if (!record) {
    return <div>לא נמצא רשומה עם מזהה זה</div>;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { created_at, site_id, ...rest } = record as any;
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
