/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockRenderer } from "@/cmps/BlockRenderer";
import { Contact } from "@/cmps/Contact";
import { PostsList } from "@/cmps/PostsList";
import { ProductsList } from "@/cmps/ProductsList";
// import { tableApiService } from "@/services/client-api/tableApi";
import { genericRepository } from "@/services/db/repositories/genericRepository";
import { Metadata } from "next";
import React from "react";

const SITE_ID = process.env.NEXT_PUBLIC_POSTGRES_SITE_ID!;
interface Params {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = params;
  const page: any = await genericRepository.getByField(
    SITE_ID,
    "pagesTable",
    "slug",
    slug
  );

  if (!page) {
    return {
      title: "דף לא נמצא",
      description: "הדף שאתה מחפש לא קיים באתר.",
    };
  }

  return {
    title: page.meta_title || page.title,
    description: page.meta_description || page.description,
    keywords: page.meta_keywords?.split(", ") || [
      "רכבים",
      "חדשות רכב",
      "ביקורות רכב",
      "תחזוקת רכב",
    ],
    openGraph: {
      title: page.og_title || page.meta_title || page.title,
      description:
        page.og_description || page.meta_description || page.description,
      url: page.og_url || `https://my-site-data-api.vercel.app/${page.slug}`,
      type: page.og_type || "website",
      images: [
        {
          url:
            page.og_image ||
            page.image_url ||
            "https://my-site-data-api.vercel.app/default-og-image-car.jpg",
          width: 800,
          height: 600,
          alt: page.og_title || page.title || "תמונה של עולם הרכב",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@carWorld",
      title: page.meta_title || page.title,
      description:
        page.og_description || page.meta_description || page.description,
      images: [
        page.og_image ||
          page.image_url ||
          "https://example.com/default-twitter-image-car.jpg",
      ],
    },
  };
}

export const revalidate = 100;

export default async function page({ params }: Params) {
  const { slug } = params;
  // const page: any = await tableApiService.getRecordByField(
  //   "pagesTable",
  //   "name",
  //   name
  // );
  const page: any = await genericRepository.getByField(
    SITE_ID,
    "pagesTable",
    "slug",
    slug
  );

  if (!page) {
    return <div>דף לא נמצא</div>;
  }

  // const contentBlocks: any = await tableApiService.getAllRecordsWithFilter(
  //   "contentBlocksTable",
  //   "page_id",
  //   page.id
  // );
  const contentBlocks: any = await genericRepository.getAllWithFilter(
    SITE_ID,
    "contentBlocksTable",
    { page_id: page.id }
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

        {slug === "blog" ? <PostsList /> : null}

        {slug === "products" ? <ProductsList /> : null}

        {slug === "contact" ? (
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
