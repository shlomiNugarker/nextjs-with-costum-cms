/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericEditForm } from "@/cmps/admin/GenericEditForm";
// import { siteInfoApiService } from "@/services/client-api/siteInfoApi";
import { siteInfoRepository } from "@/services/db/repositories/siteInfoRepository";
// import { genericRepository } from "@/services/db/repositories/genericRepository";

export const revalidate = 5;

const Page = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const siteInfo: any = await siteInfoApiService.getSiteInfo();
  const siteInfo: any = await siteInfoRepository.getSiteInfo(
    process.env.NEXT_PUBLIC_POSTGRES_SITE_ID || "1"
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
