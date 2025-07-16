'use client';

import { useState } from 'react';
import Image from "next/image"; 
import { ChevronLeftIcon, ChevronRightIcon, Bars3Icon } from '@heroicons/react/24/outline';

export interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleMobileMenu = () => { // モバイルメニューの開閉関数
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
<>
      {/* モバイル用ハンバーガーメニューボタン (sm未満で表示) */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-3 left-2 z-[9999] p-2  sm:hidden"
      >
        <Bars3Icon className="h-6 w-6 text-gray-600" />
      </button>

      {/* モバイルメニューオーバーレイ (sm未満で表示) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-25 z-[9998] sm:hidden" onClick={toggleMobileMenu}></div>
      )}

    <aside className={`
      ${isCollapsed ? "w-20" : "w-48"}
      fixed top-0 left-0 h-screen z-[9999] transition-transform duration-300
      ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      sm:translate-x-0 sm:relative sm:w-auto sm:sticky sm:top-0
      bg-white dark:bg-gray-900 border-r border-gray-200 shadow-md
      flex flex-col justify-between
      pt-4 pb-4 
      flex-shrink-0 
      overflow-y-auto scrollbar-hide
    `}>
      <nav className="flex flex-col gap-4">
      <div className={`relative ${isCollapsed ? 'ml-2' : 'ml-4'} mb-4`}>
        <Image 
          className="ml-2 sm:ml-4" 
          src="/pharmacloud_mark.svg" 
          alt="ファーマクラウド" 
          width={35} 
          height={35} 
        />
        </div>

        {/* サービスカテゴリ */}
        <p className="mt-4 text-xs sm:text-xs text-gray-400 dark:text-gray-300 items-left px-4 py-2 ${isCollapsed ? 'hidden' : 'block'}">サービス</p>
        <a href="#" className="
        flex flex-col 
        items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 
        gap-2 text-gray-600  dark:text-white
        bg-[#cbfbf1] hover:bg-[#96f7e4] dark:bg-gray-700 dark:hover:bg-gray-800
        rounded-md
        "> {/* "border-l-4 border-cyan-600" を追加すると、メニュー項目の左に線が出て何を選んでいるかわかりやすい */}
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>メドサーチ</span>
        </a>
        <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>メドオーダー</span>
        </a>
        <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>メドシェア</span>
        </a>

        {/* 一般カテゴリ */}
        <p className="text-xs sm:text-xs text-gray-400 dark:text-gray-300 items-left px-4 py-2 ${isCollapsed ? 'hidden' : 'block'}">一般</p>
        <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>設定</span>
        </a>
        <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>ドキュメント</span>
        </a>

        {/* サービス概要カテゴリ */}
        <p className="text-xs sm:text-xs text-gray-400 dark:text-gray-300 items-left px-4 py-2 ${isCollapsed ? 'hidden' : 'block'}">サービス概要</p>
        <a href="https://www.pharmacloud.co.jp/" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md " target="_blank" rel="noopener noreferrer">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>ファーマクラウド</span>
        </a>
        <a href="https://www.pharmacloud.co.jp/service/med-order-middle" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md " target="_blank" rel="noopener noreferrer">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>メドオーダー</span>
        </a>
        <a href="https://www.pharmacloud.co.jp/service/med-share" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md " target="_blank" rel="noopener noreferrer">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>メドシェア</span>
        </a>
        <a href="https://www.pharmacloud.co.jp/service/med-search" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md " target="_blank" rel="noopener noreferrer">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>メドサーチ</span>
        </a>

        {/* 使い方カテゴリ */}
        <p className="text-xs sm:text-xs text-gray-400 dark:text-gray-300 items-left px-4 py-2 ${isCollapsed ? 'hidden' : 'block'}">使い方</p>
        <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md ">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>メドオーダー</span>
        </a>
        <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md ">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>メドシェア</span>
        </a>
        <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md ">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>メドサーチ</span>
        </a>

        {/* 活用事例カテゴリ */}
        <p className="text-xs sm:text-xs text-gray-400 dark:text-gray-300 items-left px-4 py-2 ${isCollapsed ? 'hidden' : 'block'}">活用事例</p>
        <a href="#" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md ">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>メドオーダー</span>
        </a>
        <a href="https://www.pharmacloud.co.jp/case" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md " target="_blank" rel="noopener noreferrer">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>メドシェア</span>
        </a>
        <a href="https://www.pharmacloud.co.jp/case" className="flex flex-col items-center sm:flex-row sm:justify-start sm:px-4 sm:py-2 py-2 gap-2 text-gray-600 dark:text-white hover:bg-gray-100  rounded-md " target="_blank" rel="noopener noreferrer">
          <span className={`text-xs sm:text-base ${isCollapsed ? 'hidden' : 'sm:inline'}`}>メドサーチ</span>
        </a>
      </nav>
      {/* ★追加：サイドバー開閉ボタン★ */}
      <button 
        onClick={toggleSidebar}
        className="absolute mt-1 right-[-10px] -translate-y-1/2 p-1 rounded-full bg-white dark:bg-gray-600 border-none  z-50"
      >
        {isCollapsed ? (
          <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-white" />
        ) : (
          <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-white" />
        )}
      </button>
    </aside>
    </>
  );
};

export default Sidebar;