import SiteInfoEditForm from "@/cmps/SiteInfoEditForm";
import { getSiteInfo } from "@/services/db/repositories/siteInfoRepository";

const Page = async () => {
  const siteInfo = await getSiteInfo();

  return (
    <div className="pt-10 mt-10">
      <SiteInfoEditForm initialData={siteInfo} />
    </div>
  );
};

export default Page;
