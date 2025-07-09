import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
/*import Image from "next/image";*/
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "メドサーチ",
  description: "薬局間の在庫状況共有システム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
        <div className="flex flex-grow">
           {/* サイドメニュー */}
           <Sidebar />
            {/* 各ページのコンテンツがレンダリングされる部分 */}
            <div className="flex-grow overflow-auto"> {/* コンテンツエリアをスクロール可能にする */}
              {children}
            </div>
          </div> {/* メインコンテンツエリア全体 終わり */}
        </div>
      </body>
    </html>
  );
}
