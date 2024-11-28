/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/cmps/Footer";
import { Header } from "@/cmps/Header";
import { WhatsAppButton } from "@/cmps/WhatsAppButton";
import { initialize } from "@/services/db/initializeDatabase";
import { tableApiService } from "@/services/client-api/tableApi";
import { siteInfoApiService } from "@/services/client-api/siteInfoApi";

export async function generateMetadata(): Promise<Metadata> {
  const siteInfo: any = await siteInfoApiService.getSiteInfo();

  return {
    title: siteInfo?.meta_title,
    description: siteInfo?.meta_description,
    keywords: ["חקלאות אורגנית", "משתלה", "צמחי תבלין", "פירות וירקות"],
    openGraph: {
      title: siteInfo?.og_title || "",
      description: siteInfo?.og_description || "",
      url: siteInfo?.og_url || "",
      type: "website",
      images: [
        {
          url: siteInfo?.og_url || "",
          width: 800,
          height: 600,
          alt: "תמונה של הגינה שלנו",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@yourTwitterHandle",
      title: siteInfo?.meta_title || "",
      description: siteInfo?.og_description || "",
      // images: [siteInfo?.og_image],
    },
  };
}

await initialize();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteInfo: any = await siteInfoApiService.getSiteInfo();
  const pages: any = await tableApiService.getAllRecords("pagesTable");

  const menuItems = pages?.map((page: { name: string; title: any }) => ({
    href: "/" + page.name,
    label: page.title || page.name,
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
