'use client';

import { useState, Fragment } from 'react';
import Image from "next/image";
import Link from "next/link";
import {
  Popover, PopoverButton, PopoverPanel,
  Transition,
  Disclosure, DisclosureButton, DisclosurePanel
} from '@headlessui/react'
import {
  ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon,
  Bars3Icon,
  MapIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  DocumentIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

export interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const navSections = [
  {
    title: 'サービス',
    items: {
      medsearch: {
        icon: MapIcon,
        label: 'メドサーチ',
        links: [
          { href: '#', label: 'メドサーチとは' },
          { href: '/', label: '在庫状況を調べる' },
          { href: '#', label: '在庫状況を共有する' },
          { href: '#', label: 'グループを探す' },
        ],
      },
      medorder: {
        icon: ShoppingBagIcon,
        label: 'メドオーダー',
        links: [
            { href: '#', label: 'メドオーダーとは' },
            { href: '#', label: '必要在庫を予想する' },
            { href: '#', label: '処方内容を見る' },
            { href: '#', label: '注文を管理する' },
            { href: '#', label: 'レセコンと連携する' },
            { href: '#', label: '取引卸を登録する' },
            { href: '#', label: 'リーダー端末を利用' },
        ],
      },
    }
  },
  {
    title: '一般',
    items: {
      setting: {
        icon: Cog6ToothIcon,
        label: '設定',
        links: [
            { href: '#', label: '施設を管理する' },
            { href: '#', label: 'グループを管理する' },
            { href: '#', label: '支払い情報を管理する' },
        ],
      },
      document: {
        icon: DocumentIcon,
        label: 'ドキュメント',
        links: [
            { href: '#', label: 'メドオーダー' },
        ],
      },
    }
  }
];

type NavLinksProps = {
    items: { href: string; label: string }[];
};

const PopoverLinks = ({ items }: NavLinksProps) => (
  <div className="p-3">
    {items.map((item) => (
      <a key={item.label}
      className="
      block rounded-lg p-1 my-1
      transition hover-bg" href={item.href}>
        <p>{item.label}</p>
      </a>
    ))}
  </div>
);

const AccordionLinks = ({ items }: NavLinksProps) => (
  <>
    {items.map((item) => (
      <Link key={item.label} href={item.href}
      className="
      flex flex-row items-center
      py-2 gap-2 px-5
      hover-bg rounded-md
      ">
        <span className="text-xs sm:text-sm">・</span>
        <span className="text-xs sm:text-sm">{item.label}</span>
      </Link>
    ))}
  </>
);

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const popoverEnter = (name: string) => isCollapsed && setOpenPopover(name);
  const popoverLeave = () => setOpenPopover(null);

  return (
    <>
      {/* (モバイル用ボタンとオーバーレイは変更なし) */}
      <button onClick={toggleMobileMenu}
      className="fixed top-3 left-2 z-[9998] p-2 sm:hidden">
        <Bars3Icon className="h-6 w-6" />
      </button>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] sm:hidden" onClick={toggleMobileMenu}>
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
      `}>
        <nav className="flex flex-col gap-1">
          <div className={`relative mb-4 ${isCollapsed ? 'flex justify-center' : 'ml-4'}`}>
            <Image
              className={`${isCollapsed ? '' : 'ml-2 sm:ml-4'}`}
              src="/pharmacloud_mark.svg"
              alt="ファーマクラウド"
              width={35}
              height={35}
            />
          </div>

          <div className={`relative mb-4 ${isCollapsed ? 'hidden' : 'flex'}`}>
            <button className="flex w-full items-center gap-2 mt-4 rounded-lg secondaly-bg ml-4 mr-2 p-2 cursor-pointer">
            <UserCircleIcon className="h-10 w-10 shrink-0"/>
            <div className="flex flex-col items-start min-w-0">
            <span className="text-sm font-bold">ファーマ玄人</span>
            <p className="mt-1 text-sm secondaly-fg truncate">demo@pharmacloud.jp</p>
            </div>
            </button>
          </div>

          {navSections.map((section, sectionIndex) => (
            <div key={section.title}>
              {isCollapsed && sectionIndex > 0 && (
                <div className="flex justify-center">
                  <div className="h-px w-8 bg-gray-200 dark:bg-gray-700 my-2"></div>
                </div>
              )}

              {!isCollapsed && (
                <h2 className="px-4 mt-4 mb-1 text-[10px] font-semibold tracking-wider uppercase secondaly-fg">
                  {section.title}
                </h2>
              )}

              {Object.entries(section.items).map(([key, item]) => (
                <div key={key} onMouseEnter={() => popoverEnter(key)} onMouseLeave={popoverLeave}>
                  <Disclosure as="div" defaultOpen={key === 'medsearch'}>
                    {({ open }) => (
                      <>
                        <Popover>
                          {isCollapsed ? (
                            <PopoverButton
                            className="
                            mt-1 text-xs sm:text-xs px-4 py-2 outline-none
                            w-full flex flex-col items-center justify-center hover-bg rounded-lg
                            ">
                              <div className="flex flex-col items-center">
                                <item.icon className="h-6 w-6" />
                                <span className="text-[0.6rem] leading-none font-bold mt-1">{item.label}</span>
                              </div>
                            </PopoverButton>
                          ) : (
                            <DisclosureButton
                            className="
                            mt-1 text-xs sm:text-sm px-4 py-2
                            outline-none w-full flex items-center justify-start gap-2 hover-bg rounded-lg
                            ">
                              <div className="flex items-center justify-between gap-2 w-full">
                                  <div className="flex items-center gap-2">
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                  </div>
                                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                                </div>
                            </DisclosureButton>
                          )}

                          <Transition show={openPopover === key} as={Fragment}>
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
                              <PopoverLinks items={item.links} />
                            </PopoverPanel>
                          </Transition>
                        </Popover>

                        {!isCollapsed && (
                          <DisclosurePanel>
                            <AccordionLinks items={item.links} />
                          </DisclosurePanel>
                        )}
                      </>
                    )}
                  </Disclosure>
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* サイドバー開閉ボタン */}
        <button onClick={toggleSidebar}
        className="
        absolute mt-1 right-[-10px] -translate-y-1/2 p-1
        rounded-full border-none z-50 hover-none sm:block hidden
        ">
          {isCollapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
        </button>
      </aside>
    </>
  )
};

export default Sidebar;