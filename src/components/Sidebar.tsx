'use client';

import { useState, Fragment } from 'react';
import Image from "next/image"; 
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { 
  ChevronLeftIcon,
   ChevronRightIcon, 
   Bars3Icon,
   MapIcon,
   ShoppingBagIcon,
   Cog6ToothIcon,
   DocumentIcon
  } from '@heroicons/react/24/outline';

export interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleMobileMenu = () => { // モバイルメニューの開閉関数
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const popoverEnter = (name: string) => {
    if (isCollapsed) {
    setOpenPopover(name);
    }
  };
  const popoverLeave = () => {
    setOpenPopover(null);
  };

  return (
<>
      {/* モバイル用ハンバーガーメニューボタン (sm未満で表示) */}
      <button
        onClick={toggleMobileMenu}
        className="
        fixed top-3 left-2 z-[9998] p-2  sm:hidden
        ">
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* モバイルメニューオーバーレイ (sm未満で表示) */}
      {isMobileMenuOpen && (
        <div className="
        fixed inset-0
        z-[9999] sm:hidden" 
        onClick={toggleMobileMenu}
        >
        </div>
      )}
    <aside className={`
      ${isCollapsed ? "w-20" : "w-48"}
      fixed top-0 left-0 h-screen z-[9999] transition-transform duration-300
      ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      sm:translate-x-0 sm:relative sm:w-auto sm:sticky sm:top-0
      border-r border-gray-200 dark:border-gray-700 border-dashed
      flex flex-col justify-between pt-4 pb-4 
      flex-shrink-0 overflow-y-auto overflow-x-hidden sidebar-bg
      onClick={toggleMobileMenu}
    `}>
      <nav className="flex flex-col gap-4">
      <div className=
      {`relative mb-4
      ${isCollapsed ? 'flex justify-center' : 'ml-4'} // 閉じた時は中央寄せ、開いた時は左マージン
      `}>
        <Image 
          className={`${isCollapsed ? '' : 'ml-2 sm:ml-4'}`}
          src="/pharmacloud_mark.svg" 
          alt="ファーマクラウド" 
          width={35} 
          height={35} 
        />
      </div>
        {/* メドサーチカテゴリ */}
        <div onMouseEnter={() => popoverEnter('medsearch')} onMouseLeave={popoverLeave}>
        <Popover>
        <PopoverButton className={`
        mt-1 text-xs sm:text-xs
        px-4 py-2 outline-none
        w-full
        ${isCollapsed ? 'flex flex-col items-center justify-center hover-bg rounded-lg' : 'flex items-center justify-start gap-2'}
        `}>
        {isCollapsed ? (
                <>
                  <MapIcon className="h-6 w-6" />
                  <span className="text-[0.6rem] leading-none font-bold mt-1">メドサーチ</span>
                </>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <MapIcon className="h-5 w-5" />
                  <span>メドサーチ</span>
                </div>
              )}
        </PopoverButton>
        <Transition show={openPopover === 'medsearch'} as={Fragment}>
        <PopoverPanel
        static
        transition
        anchor="right"
        className="
        rounded-xl text-sm/6 transition 
        duration-200 ease-in-out 
        [--anchor-gap:--spacing(0)] z-[9999]
        data-closed:-translate-x-1 data-closed:opacity-0
        shadow-sm backdrop-blur-sm bg-white/50
        ">
          <div className="p-3">
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">メドサーチとは</p>
              </a>
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">在庫状況を調べる</p>
              </a>
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">在庫状況を共有する</p>
              </a>
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">グループを探す</p>
              </a>
            </div>
          </PopoverPanel>
          </Transition>
        </Popover>
        </div>
        {!isCollapsed && (
          <>
        <a href="#" 
        className="
        flex flex-row 
        items-center 
        sm:flex-row sm:justify-start 
        sm:px-4 sm:py-2 py-2 gap-2 px-4
        "> 
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            メドサーチとは
          </span>
        </a>
        <a href="#" 
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        ">
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            在庫状況を調べる
          </span>
        </a>
        <a href="#"
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        ">
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            在庫状況を共有する
          </span>
        </a>
        <a href="#"
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        ">
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            グループを探す
          </span>
        </a>
        </>
        )}
        {/* メドオーダーカテゴリ */}
        <div onMouseEnter={() => popoverEnter('medorder')} onMouseLeave={popoverLeave}>
        <Popover>
        <PopoverButton className={`
        mt-1 text-xs sm:text-xs
        px-4 py-2 outline-none
        w-full
        ${isCollapsed ? 'flex flex-col items-center justify-center hover-bg rounded-lg' : 'flex items-center justify-start gap-2'}
        `}>
          {isCollapsed ? (
                <div className="flex flex-col items-center">
                  <ShoppingBagIcon className="h-6 w-6" />
                  <span className="text-[0.6rem] leading-none font-bold mt-1">メドオーダー</span>
                </div>
              ) : (
                <div className="flex items-center justify-start gap-2 w-full">
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span>メドオーダー</span>
                </div>
              )}
        </PopoverButton>
        <Transition show={openPopover === 'medorder'} as={Fragment}>
        <PopoverPanel
        static
        transition
        anchor="right"
        className="
        rounded-xl text-sm/6 transition 
        duration-200 ease-in-out bg-white
        [--anchor-gap:--spacing(0)] z-[9999]
        data-closed:-translate-y-1 data-closed:opacity-0
        shadow-sm backdrop-blur-sm bg-white/50
        ">
          <div className="p-3">
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">メドオーダーとは</p>
              </a>
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">必要在庫を予想する</p>
              </a>
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">処方内容を見る</p>
              </a>
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">注文を管理する</p>
              </a>
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">レセコンと連携する</p>
              </a>
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">取引卸を登録する</p>
              </a>
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">リーダー端末を利用する</p>
              </a>
            </div>
          </PopoverPanel>
          </Transition>
        </Popover>
        </div>
        {!isCollapsed && (
          <>
        <a href="#" 
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        ">
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            メドオーダーとは
          </span>
        </a>
        <a href="#" 
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        ">
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            必要在庫を予想する
          </span>
        </a>
        <a href="#" 
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        ">
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            処方内容を見る
          </span>
        </a>
        <a href="#" 
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        ">
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            注文を管理する
          </span>
        </a>
        <a href="#" 
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        ">
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            レセコンと連携する
          </span>
        </a>
        <a href="#" 
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        ">
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            取引卸を登録する
          </span>
        </a>
        <a href="#" 
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        ">
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            リーダー端末を利用
          </span>
        </a>
        </>
        )}
        {/* 設定カテゴリ */}
        <div onMouseEnter={() => popoverEnter('setting')} onMouseLeave={popoverLeave}>
        <Popover>
        <PopoverButton className={`
        mt-1 text-xs sm:text-xs
        px-4 py-2 outline-none
        w-full
        ${isCollapsed ? 'flex flex-col items-center justify-center hover-bg rounded-lg' : 'flex items-center justify-start gap-2'}
        `}>
          {isCollapsed ? (
                <div className="flex flex-col items-center">
                  <Cog6ToothIcon className="h-6 w-6" />
                  <span className="text-[0.6rem] leading-none font-bold mt-1">設定</span>
                </div>
              ) : (
                <div className="flex items-center justify-start gap-2 w-full">
                  <Cog6ToothIcon className="h-5 w-5" />
                  <span>設定</span>
                </div>
              )}
        </PopoverButton>
        <Transition show={openPopover === 'setting'} as={Fragment}>
        <PopoverPanel
        static
        transition
        anchor="right"
        className="
        rounded-xl text-sm/6 transition 
        duration-200 ease-in-out bg-white
        [--anchor-gap:--spacing(0)] z-[9999]
        data-closed:-translate-y-1 data-closed:opacity-0
        shadow-sm backdrop-blur-sm bg-white/50
        ">
          <div className="p-3">
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">施設を管理する</p>
              </a>
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">グループを管理する</p>
              </a>
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">支払い方法を管理する</p>
              </a>
            </div>
          </PopoverPanel>
          </Transition>
        </Popover>
        </div>
        {!isCollapsed && (
          <>
        <a href="https://www.pharmacloud.co.jp/" 
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        " 
        target="_blank" rel="noopener noreferrer"
        >
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            施設を管理する
          </span>
        </a>
        <a href="https://www.pharmacloud.co.jp/service/med-order-middle" 
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        "
        target="_blank" rel="noopener noreferrer"
        >
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            グループを管理する
          </span>
        </a>
        <a href="https://www.pharmacloud.co.jp/service/med-share" 
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        "
        target="_blank" rel="noopener noreferrer"
        >
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-sm
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            支払い情報を管理する
            </span>
        </a>
        </>
        )}
        {/* ドキュメントカテゴリ */}
        <div onMouseEnter={() => popoverEnter('document')} onMouseLeave={popoverLeave}>
        <Popover>
        <PopoverButton className={`
        mt-1 text-xs sm:text-xs
        px-4 py-2 outline-none
        w-full
        ${isCollapsed ? 'flex flex-col items-center justify-center hover-bg rounded-lg' : 'flex items-center justify-start gap-2'}
        `}>
          {isCollapsed ? (
                <div className="flex flex-col items-center">
                  <DocumentIcon className="h-6 w-6" />
                  <span className="text-[0.6rem] leading-none font-bold mt-1">ドキュメント</span>
                </div>
              ) : (
                <div className="flex items-center justify-start gap-2 w-full">
                  <DocumentIcon className="h-5 w-5" />
                  <span>ドキュメント</span>
                </div>
              )}
        </PopoverButton>
        <Transition show={openPopover === 'document'} as={Fragment}>
        <PopoverPanel
        static
        transition
        anchor="right"
        className="
        rounded-xl text-sm/6 transition 
        duration-200 ease-in-out bg-white
        [--anchor-gap:--spacing(0)] z-[9999]
        data-closed:-translate-y-1 data-closed:opacity-0
        shadow-sm backdrop-blur-sm bg-white/50
        ">
          <div className="p-3">
              <a className="block rounded-lg p-1 my-1 transition hover-bg" href="#">
                <p className="">メドオーダー</p>
              </a>
            </div>
          </PopoverPanel>
          </Transition>
        </Popover>
        </div>
        {!isCollapsed && (
          <>
        <a href="#" 
        className="
        flex flex-row items-center 
        sm:flex-row sm:justify-start sm:px-4 sm:py-2 
        py-2 gap-2 hover-bg rounded-md px-4
        ">
          <span className={`
          text-xs sm:text-sm 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            ・
          </span>
          <span className={`
          text-xs sm:text-base 
          ${isCollapsed ? 'hidden' : 'sm:inline'}
          `}>
            メドオーダー
          </span>
        </a>
        </>
        )}
      </nav>
      {/* ★追加：サイドバー開閉ボタン★ */}
      <button 
        onClick={toggleSidebar}
        className="
        absolute mt-1 right-[-10px] -translate-y-1/2 
        p-1 rounded-full border-none  z-50
        hover-none sm:block hidden
        ">
        {isCollapsed ? (
          <ChevronRightIcon className="h-5 w-5" />
        ) : (
          <ChevronLeftIcon className="h-5 w-5" />
        )}
      </button>
    </aside>
    </>
  )
};

export default Sidebar;