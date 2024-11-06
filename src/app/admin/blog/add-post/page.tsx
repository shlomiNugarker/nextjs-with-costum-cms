import MdEditor from "@/cmps/MdEditor";

export const revalidate = 5;

export default async function AddPostPage() {
  return (
    <>
      <section className="min-h-screen mt-10 flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold mb-4">הוסף מאמר בבלוג</h2>
        <MdEditor></MdEditor>{" "}
      </section>
    </>
  );
}
