import SiteInfoEditForm from "@/cmps/admin/SiteInfoEditForm";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export const revalidate = 5;

const Page = async () => {
  const siteInfo = await genericRepository.getAll("SiteInfo");

  return (
    <div className="pb-12 px-4 max-w-screen-lg mx-auto  min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5 text-customNavy">
      <SiteInfoEditForm initialData={siteInfo ? siteInfo[0] : null} />
    </div>
  );
};

export default Page;
