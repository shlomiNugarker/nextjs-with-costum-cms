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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
