import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
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
        <div className="flex flex-col min-h-screen">
        <div className="flex flex-grow">
           {/* サイドメニュー */}
           <aside className="
              w-8 sm:w-48 {/* サイドメニューの幅を調整。小さい画面では狭く */}
              bg-white border-r border-gray-200 shadow-md
              flex flex-col justify-between
              pt-4 pb-4 {/* サイドメニュー自体の上下パディング */}
              flex-shrink-0 {/* サイドメニューが縮まないようにする */}
              sticky top-o h-screen
              overflow-y-auto
            ">
              <nav className="flex flex-col gap-4">
              <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                {/* 各メニュー項目 (アイコンなし、テキストのみ) */}
                {/* メドサーチ (アクティブ状態の例) */}
                <Image 
                 className="ml-2 sm:ml-4" 
                 src="/pharmacloud_mark.svg" 
                 alt="ファーマクラウド" 
                 width={35} 
                 height={35} 
                
                 />
                <p className="mt-4 text-xs sm:text-xs text-gray-400 items-left px-4 py-2">サービス</p>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-cyan-600 font-bold bg-cyan-50 hover:bg-cyan-100 border-l-4 border-cyan-600 rounded-md">
                  <span className="text-xs sm:text-base hidden sm:inline">メドサーチ</span>
                </a>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <span className="text-xs sm:text-base hidden sm:inline">メドオーダー</span>
                </a>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <span className="text-xs sm:text-base hidden sm:inline">メドシェア</span>
                </a>
                <p className="text-xs sm:text-xs text-gray-400 items-left px-4 py-2">一般</p>
                {/* 設定 */}
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <span className="text-xs sm:text-base hidden sm:inline">設定</span>{/* 右矢印の代わりに文字 */}
                </a>
                {/* ドキュメント */}
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <span className="text-xs sm:text-base hidden sm:inline">ドキュメント</span>
                </a>
                <p className="text-xs sm:text-xs text-gray-400 items-left px-4 py-2">サービス概要</p>
                {/* 公式HP */}
                <a href="https://www.pharmacloud.co.jp/" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md " target="_blank" rel="noopener noreferrer">
                <span className="text-xs sm:text-base hidden sm:inline">ファーマクラウド</span>
                </a>
                <a href="https://www.pharmacloud.co.jp/service/med-order-middle" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md " target="_blank" rel="noopener noreferrer">
                <span className="text-xs sm:text-base hidden sm:inline">メドオーダー</span>
                </a>
                <a href="https://www.pharmacloud.co.jp/service/med-share" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md " target="_blank" rel="noopener noreferrer">
                <span className="text-xs sm:text-base hidden sm:inline">メドシェア</span>
                </a>
                <a href="https://www.pharmacloud.co.jp/service/med-search" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md " target="_blank" rel="noopener noreferrer">
                <span className="text-xs sm:text-base hidden sm:inline">メドサーチ</span>
                </a>
                <p className="text-xs sm:text-xs text-gray-400 items-left px-4 py-2">使い方</p>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">メドオーダー</span>
                </a>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">メドシェア</span>
                </a>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">メドサーチ</span>
                </a>
                <p className="text-xs sm:text-xs text-gray-400 items-left px-4 py-2">活用事例</p>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">メドオーダー</span>
                </a>
                <a href="https://www.pharmacloud.co.jp/case" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md " target="_blank" rel="noopener noreferrer">
                <span className="text-xs sm:text-base hidden sm:inline">メドシェア</span>
                </a>
                <a href="https://www.pharmacloud.co.jp/case" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md " target="_blank" rel="noopener noreferrer">
                <span className="text-xs sm:text-base hidden sm:inline">メドサーチ</span>
                </a>
              </ol>
              </nav>
            </aside>
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
