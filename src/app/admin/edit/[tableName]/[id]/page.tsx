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
  const fields = Object.keys(record);

  return (
    <div>
      <h1>Edit {params.tableName}</h1>
      <GenericEditForm
        fields={fields}
        tableName={params.tableName}
        record={record}
      />

    </div>
  );
}
