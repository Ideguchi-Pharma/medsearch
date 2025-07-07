import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        <header className="w-full bg-white border-b border-gray-200 p-4 flex items-center justify-start gap-4 shadow-sm fixed top-0 z-10">
        <div className="
            flex items-center justify-center 
            px-1 py-1 
            border-1 border-green-500 rounded-lg
            text-green-600 font-bold text-sm
            min-w-[60px] sm:min-w-[80px]
            cursor-pointer select-none
          ">
            デモ薬局
          </div>
          <span className="
            flex items-center justify-center
            bg-orange-300 text-gray-800 
            text-xs font-bold
            px-1 py-1 rounded-lg
            uppercase 
            min-w-[70px] sm:min-w-[70px]
            cursor-pointer select-none
          ">
            PREVIEW
          </span>

        </header>
        <div className="flex-grow pt-25">
        {children}
        </div>
      </body>
    </html>
  );
}
