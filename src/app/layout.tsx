import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/cmps/Footer";
import { Header } from "@/cmps/Header";
import { WhatsAppButton } from "@/cmps/WhatsAppButton";
import { initialize } from "@/services/db/initializeDatabase";
import { getSiteInfo } from "@/services/db/repositories/siteInfoRepository";
import { getAllPages } from "@/services/db/repositories/pageRepository";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const siteInfo: any = await getSiteInfo();

  return {
    title: siteInfo?.meta_title,
    description: siteInfo?.meta_description,
    keywords: ["חקלאות אורגנית", "משתלה", "צמחי תבלין", "פירות וירקות"],
    openGraph: {
      title: siteInfo?.og_title || "",
      description: siteInfo?.og_description || "",
      url: siteInfo?.og_url || "",
      type: siteInfo?.og_type,
      images: [
        {
          url: siteInfo?.og_image || "",
          width: 800,
          height: 600,
          alt: "תמונה של הגינה בפרדס",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@yourTwitterHandle",
      title: siteInfo?.og_title,
      description: siteInfo?.og_description,
      images: [siteInfo?.og_image],
    },
  };
}

await initialize();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteInfo = await getSiteInfo();
  const pages = await getAllPages();

  const menuItems = pages.map((page) => ({
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
        <Header menuItems={menuItems} siteName={siteInfo?.site_name || ""} />
        {children}
        <WhatsAppButton phone={siteInfo?.phone_number || ""} />
        <Footer siteInfo={siteInfo} />
      </body>
    </html>
  );
}
