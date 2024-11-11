import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/cmps/Footer";
import { Header } from "@/cmps/Header";
import { WhatsAppButton } from "@/cmps/WhatsAppButton";
import { initialize } from "@/services/db/initializeDatabase";
import { getSiteInfo } from "@/services/db/repositories/siteInfoRepository";

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
  console.log({ siteInfo });

  return {
    title:
      siteInfo?.meta_title ||
      "הגינה בפרדס - חווה אורגנית ומשתלה | חקלאות | משתלה",
    description:
      siteInfo?.meta_description ||
      "הגינה בפרדס - חווה אורגנית ומשתלה בפרדס חנה שמציעה מגוון ירקות, פירות, וצמחי נוי ותבלין אורגניים. חוויה טבעית וירוקה לכל המשפחה.",
    keywords: ["חקלאות אורגנית", "משתלה", "צמחי תבלין", "פירות וירקות"],
    openGraph: {
      title: siteInfo?.og_title || "הגינה בפרדס - חווה אורגנית ומשתלה",
      description:
        siteInfo?.og_description ||
        "מבחר ירקות, פירות וצמחים אורגניים, ישירות מהמשתלה בפרדס חנה.",
      url: siteInfo?.og_url || "https://example.com",
      type: siteInfo?.og_type || "website",
      images: [
        {
          url:
            siteInfo?.og_image ||
            "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          width: 800,
          height: 600,
          alt: "תמונה של הגינה בפרדס",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@yourTwitterHandle",
      title: siteInfo?.og_title || "הגינה בפרדס - חווה אורגנית ומשתלה",
      description:
        siteInfo?.og_description ||
        "מבחר ירקות, פירות וצמחים אורגניים, ישירות מהמשתלה בפרדס חנה.",
      images: [
        siteInfo?.og_image ||
          "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
  };
}

const menuItems = [
  { href: "/nursery", label: "המשתלה" },
  { href: "/weekly-produce", label: "התוצרת השבועית" },
  { href: "/contact", label: "דברו איתנו" },
  { href: "/blog", label: "הבלוג" },
  { href: "/delivery", label: "משלוחים" },
  { href: "/about", label: "אודות" },
];

await initialize();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div
          className="h-screen bg-cover bg-center fixed inset-0 z-[-2] blur"
          style={{
            backgroundImage:
              "url('https://tzahile.co.il/wp-content/uploads/2021/06/new-bg-1920x1074.jpg')",
          }}
        ></div>
        <Header menuItems={menuItems} />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
