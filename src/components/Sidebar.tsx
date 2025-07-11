// src/components/Sidebar.tsx

import React from 'react';
import Image from "next/image"; // ロゴ用

// もしSidebarMenuItem や SidebarCategoryTitle を既にコンポーネント化している場合、ここでインポート
// import SidebarMenuItem from './SidebarMenuItem'; 
// import SidebarCategoryTitle from './SidebarCategoryTitle';

const Sidebar = () => {
  return (
    <aside className="
      w-8 sm:w-48 {/* サイドメニューの幅を調整。小さい画面では狭く */}
      bg-white border-r border-gray-200 shadow-md
      flex flex-col justify-between
      pt-4 pb-4 {/* サイドメニュー自体の上下パディング */}
      flex-shrink-0 {/* サイドメニューが縮まないようにする */}
      sticky top-0 h-screen
      overflow-y-auto
    ">
      <nav className="flex flex-col gap-4">
        {/* ロゴ部分 */}
        <Image 
          className="ml-2 sm:ml-4" 
          src="/pharmacloud_mark.svg" 
          alt="ファーマクラウド" 
          width={35} 
          height={35} 
        />
        
        {/* カテゴリ見出しとメニュー項目 */}
        {/* ここに、layout.tsxから切り出したメニューのHTMLを貼り付けます */}

        {/* サービスカテゴリ */}
        <p className="mt-4 text-xs sm:text-xs text-gray-400 items-left px-4 py-2">サービス</p>
        <a href="#" className="
        flex flex-col 
        items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 
        gap-2 text-gray-600 
        bg-[#cbfbf1] hover:bg-[#96f7e4] rounded-md
        "> {/* "border-l-4 border-cyan-600" を追加すると、メニュー項目の左に線が出て何を選んでいるかわかりやすい */}
          <span className="text-xs sm:text-base hidden sm:inline">メドサーチ</span>
        </a>
        <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md">
          <span className="text-xs sm:text-base hidden sm:inline">メドオーダー</span>
        </a>
        <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md">
          <span className="text-xs sm:text-base hidden sm:inline">メドシェア</span>
        </a>

        {/* 一般カテゴリ */}
        <p className="text-xs sm:text-xs text-gray-400 items-left px-4 py-2">一般</p>
        <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md">
          <span className="text-xs sm:text-base hidden sm:inline">設定</span>
        </a>
        <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 hover:bg-gray-100 rounded-md">
          <span className="text-xs sm:text-base hidden sm:inline">ドキュメント</span>
        </a>

        {/* サービス概要カテゴリ */}
        <p className="text-xs sm:text-xs text-gray-400 items-left px-4 py-2">サービス概要</p>
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

        {/* 使い方カテゴリ */}
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

        {/* 活用事例カテゴリ */}
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
      </nav>
    </aside>
  );
};

export default Sidebar;