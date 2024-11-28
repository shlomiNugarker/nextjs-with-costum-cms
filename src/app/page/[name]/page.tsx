/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockRenderer } from "@/cmps/BlockRenderer";
import { PostsList } from "@/cmps/blocks/PostsList";
import { Contact } from "@/cmps/Contact";
import { ProductsList } from "@/cmps/ProductsList";
import { tableApiService } from "@/services/client-api/tableApi";
import React from "react";

interface Params {
  params: {
    name: string;
  };
}

export const revalidate = 60 * 60 * 60 * 24;

export default async function page({ params }: Params) {
  const { name } = params;
  const page: any = await tableApiService.getRecordByField(
    "pagesTable",
    "name",
    name
  );

  if (!page) {
    return <div>דף לא נמצא</div>;
  }

  const contentBlocks: any = await tableApiService.getAllRecordsWithFilter(
    "contentBlocksTable",
    "page_id",
    page.id
  );

  const sortedBlocks = contentBlocks?.sort(
    (a: { position: any }, b: { position: any }) =>
      (a.position || 0) - (b.position || 0)
  );

  return (
    <div>
      <section className="pb-12 px-4 max-w-screen-lg mx-auto  min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5">
        <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
          {page.title}
        </h1>
        <p className="text-center text-gray-600 text-2xl">{page.description}</p>

        <div className="mt-8">
          {sortedBlocks.map((block: any) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>

        {name === "blog" ? <PostsList /> : null}

        {name === "products" ? <ProductsList /> : null}

        {name === "contact" ? (
          <Contact
            title={page.title || "צור קשר"}
            description={page.description || "תיאור"}
            action={async (formData: FormData) => {
              "use server";
              console.log({ formData });

              // await tableApiService.saveRecord("contactMessagesTable", {
              //   name: formData.get("name") as string,
              //   email: formData.get("email") as string,
              //   message: formData.get("message") as string,
              //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
              // } as any);
            }}
          />
        ) : null}
      </section>
    </div>
  );
}
