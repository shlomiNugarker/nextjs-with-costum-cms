import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/cmps/Footer";
import { Header } from "@/cmps/Header";
import { WhatsAppButton } from "@/cmps/WhatsAppButton";
import { initialize } from "@/services/db/database";

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

export const metadata: Metadata = {
  title: "הגינה בפרדס - חווה אורגנית ומשתלה | חקלאות | משתלה",
  description:
    "הגינה בפרדס - חווה אורגנית ומשתלה בפרדס חנה שמציעה מגוון ירקות, פירות, וצמחי נוי ותבלין אורגניים. חוויה טבעית וירוקה לכל המשפחה.",
  keywords: ["חקלאות אורגנית", "משתלה", "צמחי תבלין", "פירות וירקות"],
  openGraph: {
    title: "הגינה בפרדס - חווה אורגנית ומשתלה",
    description: "מבחר ירקות, פירות וצמחים אורגניים, ישירות מהמשתלה בפרדס חנה.",
    url: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 800,
        height: 600,
        alt: "תמונה של הגינה בפרדס",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle",
    title: "הגינה בפרדס - חווה אורגנית ומשתלה",
    description: "מבחר ירקות, פירות וצמחים אורגניים, ישירות מהמשתלה בפרדס חנה.",
    images: [
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
};

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
          className="h-screen bg-cover bg-center fixed z-[-2]  left-0 top-0 right-0 bottom-0 blur"
          style={{
            backgroundImage:
              "url('https://tzahile.co.il/wp-content/uploads/2021/06/new-bg-1920x1074.jpg')",
          }}
        ></div>
        <Header />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
