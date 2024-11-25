import { GenericEditForm } from "@/cmps/admin/GenericEditForm";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export const revalidate = 5;

const Page = async () => {
  const siteInfo = await genericRepository.getById(
    "siteInfo",
    Number(process.env.POSTGRES_SITE_ID!)
  );

  if (!siteInfo) {
    return <div>לא נמצא רשומה</div>;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { created_at, ...rest } = siteInfo;
  const fields = Object.keys(rest);

  return (
    <div className="pb-12 px-4 max-w-screen-lg mx-auto min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5 text-customNavy">
      <GenericEditForm fields={fields} tableName={"siteInfo"} record={rest} />
    </div>
  );
};

export default Page;
