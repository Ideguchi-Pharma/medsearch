import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { DataProvider } from "@/contexts/DataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "【クローン】メドサーチ",
  description: "薬局間の在庫状況共有システム",
  icons: {
    icon: [
      {
        url: "/pharmacloud_mark.svg",
        href: "/pharmacloud_mark.svg",
      },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`
        ${geistSans.variable} 
        ${geistMono.variable} 
        antialiased
        `}>
          <DataProvider>
          <ClientLayout>{children}</ClientLayout>
          </DataProvider>
      </body>
    </html>
  );
}
