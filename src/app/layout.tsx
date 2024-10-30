import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/cmps/Footer";
import { Header } from "@/cmps/Header";
import { WhatsAppButton } from "@/cmps/WhatsAppButton";

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
  title: "הגינה בפרדס - חווה אורגנית ומשתלה",
  description:
    "הגינה בפרדס - חווה אורגנית ומשתלה בפרדס חנה שמציעה מגוון ירקות, פירות, וצמחי נוי ותבלין אורגניים. חוויה טבעית וירוקה לכל המשפחה.",
};

export default function RootLayout({
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
