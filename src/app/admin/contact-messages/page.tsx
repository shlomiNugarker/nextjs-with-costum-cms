import { MessagesTable } from "@/cmps/MessagesTable";
import { getAllContactMessages } from "@/services/db/repositories/contactMessagesRepository";

export const revalidate = 5;

const Page = async () => {
  const messages = await getAllContactMessages();

  return (
    <div className="pb-12 px-4 max-w-screen-lg mx-auto  min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5 text-customNavy">
      <MessagesTable messages={messages} />
    </div>
  );
};

export default Page;
