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
        <div className="flex flex-col min-h-screen">
        <div className="flex flex-grow">
           {/* サイドメニュー */}
           <aside className="
              w-8 sm:w-56 {/* サイドメニューの幅を調整。小さい画面では狭く */}
              bg-white border-r border-gray-200 shadow-md
              flex flex-col justify-between
              pt-4 pb-4 {/* サイドメニュー自体の上下パディング */}
              flex-shrink-0 {/* サイドメニューが縮まないようにする */}
              sticky top-o h-screen
              overflow-y-auto
            ">
              <nav className="flex flex-col gap-2">
                {/* 各メニュー項目 (アイコンなし、テキストのみ) */}
                {/* メドサーチ (アクティブ状態の例) */}
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-cyan-600 font-bold bg-cyan-50 hover:bg-cyan-100 border-l-4 border-cyan-600 rounded-md">
                  <span className="text-xs sm:text-base hidden sm:inline">メドサーチ</span>
                </a>
                {/* メドオーダー */}
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <span className="text-xs sm:text-base hidden sm:inline">メドオーダー</span>
                </a>
                {/* 区切り線 */}
                <hr className="my-2 border-gray-200 hidden sm:block" />
                {/* 設定 */}
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <span className="text-xs sm:text-base hidden sm:inline">設定</span>{/* 右矢印の代わりに文字 */}
                </a>
                {/* ドキュメント */}
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <span className="text-xs sm:text-base hidden sm:inline">ドキュメント</span>
                </a>
                {/* 区切り線 */}
                <hr className="my-2 border-gray-200 hidden sm:block" />
                {/* 公式HP */}
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">ファーマクラウド</span>
                </a>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">メドオーダーとは</span>
                </a>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">メドシェアとは</span>
                </a>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">メドサーチとは</span>
                </a>
                {/* 区切り線 */}
                <hr className="my-2 border-gray-200 hidden sm:block" />
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">メドオーダーの使い方</span>
                </a>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">メドシェアの使い方</span>
                </a>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">メドサーチの使い方</span>
                </a>
                {/* 区切り線 */}
                <hr className="my-2 border-gray-200 hidden sm:block" />
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">メドオーダーの事例</span>
                </a>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">メドシェアの事例</span>
                </a>
                <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md ">
                <span className="text-xs sm:text-base hidden sm:inline">メドサーチの事例</span>
                </a>

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
