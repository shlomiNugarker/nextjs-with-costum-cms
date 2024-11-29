/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/cmps/Footer";
import { Header } from "@/cmps/Header";
import { WhatsAppButton } from "@/cmps/WhatsAppButton";
import { initialize } from "@/services/db/initializeDatabase";
// import { tableApiService } from "@/services/client-api/tableApi";
// import { siteInfoApiService } from "@/services/client-api/siteInfoApi";
import { genericRepository } from "@/services/db/repositories/genericRepository";
import { siteInfoRepository } from "@/services/db/repositories/siteInfoRepository";

const SITE_ID = process.env.NEXT_PUBLIC_POSTGRES_SITE_ID || "1";

export async function generateMetadata(): Promise<Metadata> {
  // const siteInfo: any = await siteInfoApiService.getSiteInfo();
  const siteInfo: any = await siteInfoRepository.getSiteInfo(SITE_ID );

  return {
    title: siteInfo?.meta_title || "ברוכים הבאים לעולם הרכב",
    description: siteInfo?.meta_description || "האתר שמביא לך את כל המידע על רכבים, טכנולוגיות חדשות וטיפים לנהיגה חכמה.",
    keywords: siteInfo?.meta_keywords?.split(", ") || ["רכבים", "חדשות רכב", "ביקורות רכב", "תחזוקת רכב"],
    openGraph: {
      title: siteInfo?.og_title || siteInfo?.meta_title || "עולם הרכב - כל מה שצריך לדעת על רכבים",
      description: siteInfo?.og_description || siteInfo?.meta_description || "גלה את כל מה שחדש ומעניין בתחום הרכב, כולל ביקורות, טיפים, וטכנולוגיות חדשות.",
      url: siteInfo?.og_url || "https://example.com",
      type: siteInfo?.og_type || "website",
      images: [
        {
          url: siteInfo?.og_image || "https://example.com/default-og-image-car.jpg",
          width: 800,
          height: 600,
          alt: siteInfo?.og_title || "תמונה של עולם הרכב",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@carWorld",
      title: siteInfo?.meta_title || "עולם הרכב - כל מה שצריך לדעת על רכבים",
      description: siteInfo?.og_description || siteInfo?.meta_description || "כל המידע על רכבים, טכנולוגיות חדשות, ביקורות ועוד.",
      images: [siteInfo?.og_image || "https://example.com/default-twitter-image-car.jpg"],
    },
  };
}



await initialize();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const siteInfo: any = await siteInfoApiService.getSiteInfo();
  const siteInfo: any = await siteInfoRepository.getSiteInfo(SITE_ID);
  // const pages: any = await tableApiService.getAllRecords("pagesTable");
  const pages: any = await genericRepository.getAll(
    SITE_ID,
    "pagesTable"
  );
  const sortedPages = pages.sort((a: any, b: any) => (a.position || 0) - (b.position || 0));


  const menuItems = sortedPages?.map((page: { slug: string; title: any }) => ({
    href: "/" + page.slug,
    label: page.title || page.slug,
  }));

  return (
    <html lang="he">
      <body className={`antialiased pt-[70px]`}>
        <Header menuItems={menuItems} siteName={siteInfo?.site_name || ""} />
        {children}
        <WhatsAppButton phone={siteInfo?.phone_number || ""} />
        <Footer siteInfo={siteInfo} pageLinks={menuItems} />
      </body>
    </html>
  );
}
