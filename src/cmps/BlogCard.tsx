import Image from "next/image";
// import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BlogCard = ({ post }: any) => {
  return (
    <article className=" m-auto min-h-full overflow-hidden rounded-lg pb-2 transition-transform duration-200 ">
      <Image
        width={300}
        height={300}
        className="max-h-40 w-full object-cover transition-all duration-300 group-hover:scale-125"
        alt="featured image"
        src="https://images.unsplash.com/photo-1511546865855-fe4788edf4b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="w-full bg-white p-4">
        {/* <p className=" font-medium text-customGreen">Nature</p> */}
        <h1 className="mb-2 sm:text-xl font-medium text-customNavy">
          {post.title}
        </h1>
        <p className="font-light text-gray-500 mb-6 line-clamp-3">
          {post.content}
        </p>
        {/* <div className="justify-start mt-4 flex flex-wrap items-center">
          <div className="mr-2 mt-1 rounded-2xl bg-customPeach py-1.5 px-4 text-xs text-gray-600">
            #js
          </div>
          <div className="mr-2 mt-1 rounded-2xl bg-customPeach py-1.5 px-4 text-xs text-gray-600">
            #icefactory
          </div>
        </div> */}
      </div>
    </article>
  );
};
