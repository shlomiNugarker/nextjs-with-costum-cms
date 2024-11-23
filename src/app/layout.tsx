/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/cmps/Footer";
import { Header } from "@/cmps/Header";
import { WhatsAppButton } from "@/cmps/WhatsAppButton";
import { initialize } from "@/services/db/initializeDatabase";
import { genericRepository } from "@/services/db/repositories/genericRepository";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  const [siteInfo] = await genericRepository.getAll("SiteInfo");

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
          alt: "תמונה של הגינה בפרדס",
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
  const siteInfo = await genericRepository.getAll("SiteInfo");
  const pages: any = await genericRepository.getAll("pagesTable");
  const menuItems = pages?.map((page: { name: string; title: any }) => ({
    href: "/" + page.name,
    label: page.title || page.name,
  }));

  return (
    <html lang="he">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-[70px]`}
      >
        <div
          className="h-screen bg-cover bg-center fixed inset-0 z-[-2] blur"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1495195129352-aeb325a55b65?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>
        <Header menuItems={menuItems} siteName={siteInfo[0]?.site_name || ""} />
        {children}
        <WhatsAppButton phone={siteInfo[0]?.phone_number || ""} />
        <Footer siteInfo={siteInfo[0]} pageLinks={menuItems} />
      </body>
    </html>
  );
}
