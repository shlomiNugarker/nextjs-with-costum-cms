import SiteInfoEditForm from "@/cmps/admin/SiteInfoEditForm";
import { getSiteInfo } from "@/services/db/repositories/siteInfoRepository";

export const revalidate = 5;

const Page = async () => {
  const siteInfo = await getSiteInfo();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 text-customNavy">
      <SiteInfoEditForm initialData={siteInfo} />
    </div>
  );
};

export default Page;
