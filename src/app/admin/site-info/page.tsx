import SiteInfoEditForm from "@/cmps/admin/SiteInfoEditForm";
import { getSiteInfo } from "@/services/db/repositories/siteInfoRepository";

export const revalidate = 5;

const Page = async () => {
  const siteInfo = await getSiteInfo();

  return (
    <div className="pb-12 px-4 max-w-screen-lg mx-auto  min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5 text-customNavy">
      <SiteInfoEditForm initialData={siteInfo} />
    </div>
  );
};

export default Page;
