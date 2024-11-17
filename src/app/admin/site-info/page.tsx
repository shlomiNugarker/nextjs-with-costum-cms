import SiteInfoEditForm from "@/cmps/admin/SiteInfoEditForm";
import { getSiteInfo } from "@/services/db/repositories/siteInfoRepository";

const Page = async () => {
  const siteInfo = await getSiteInfo();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-100 text-customNavy">
      <SiteInfoEditForm initialData={siteInfo} />
    </div>
  );
};

export default Page;
