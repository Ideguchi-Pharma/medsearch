//マイページ

import { 
    InformationCircleIcon,
    ArrowRightCircleIcon
 } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
const menu = {
    medsearch: {
        icon: ArrowRightCircleIcon,
        links: [
            { href: '/medsearch/overview', label: 'メドサーチとは' },
            { href: '/', label: '在庫状況を調べる' },
            { href: '/medsearch/stock', label: '在庫状況を共有する' },
            { href: '/medsearch/group', label: 'グループを探す' },
        ],
    },
    medorder: {
        icon: ArrowRightCircleIcon,
        links: [
            { href: '#', label: 'メドオーダーとは' },
            { href: '#', label: 'AI無料体験' },
            { href: '#', label: '導入方法' },
            { href: '#', label: 'レセコンと連携する' },
            { href: '#', label: '必要在庫を予想する' },
        ],
    },
    setting: {
        icon: ArrowRightCircleIcon,
        links: [
            { href: '#', label: '施設を管理する' },
            { href: '#', label: 'グループを管理する' },
            { href: '#', label: '支払い情報を管理する' },
        ],
    },
};


export default function Home() {
    return (
        <div className="p-8">
            <p className="
            tracking-[-.01em] text-[32px] font-bold 
            ">
             ファーマクラウド
            </p>
            <div className="
            flex flex-row items-center justify-start mt-16
            space-x-2 px-4 py-2 rounded-2xl w-full info-bg
            ">
             <InformationCircleIcon className="h-6 w-6 text-cyan-500 dark:text-white" />
             <p className="text-sm">
             メドオーダーAI無料体験公開中
             </p>
             <button className="text-sm py-2 px-4 rounded-xl bg-cyan-500 ml-auto text-white font-bold cursor-pointer">
                AI無料体験
             </button>
            </div>

            <div className="grid grid-col-1 sm:grid-cols-2 gap-18">
                <div className="flex flex-col">
                    <Image
                    className="pt-12 sm:pl-12 pb-11"
                    src="/medsearch_holizontal.svg"
                    alt="medsearch logo"
                    width={750}
                    height={166}
                    />
                    <div className="flex flex-row flex-wrap sm:pl-12 pt-1 text-sm">
                        {menu.medsearch.links.map((link) => (
                            <Link key={link.label} href={link.href} className="p-2 rounded-md button-fg font-semibold">
                                <span className="flex flex-row items-center gap-2">
                                    <ArrowRightCircleIcon className="h-4 w-4"/>
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <Image
                    className="sm:pt-12 pb-4 sm:pr-12"
                    src="/medorder-middle_holizontal.svg"
                    alt="medorder logo"
                    width={750}
                    height={218}
                    priority
                    />
                    <div className="flex flex-row flex-wrap sm:pl-12 text-sm">
                        {menu.medorder.links.map((link) => (
                            <Link key={link.label} href={link.href} className="p-2 rounded-md button-fg font-semibold">
                                <span className="flex flex-row items-center gap-2">
                                    <ArrowRightCircleIcon className="h-4 w-4"/>
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="
            flex flex-col items-start justify-start mt-8
            space-x-2 px-4 py-6 rounded-2xl w-full shadow-sm
            ">
                <p className="font-bold pl-6 text-lg">
                    設定
                </p>
                <div className="flex flex-row flex-wrap pl-6 pt-4 text-sm">
                        {menu.setting.links.map((link) => (
                            <Link key={link.label} href={link.href} className="p-2 rounded-md button-fg font-semibold">
                                <span className="flex flex-row items-center gap-2">
                                    <ArrowRightCircleIcon className="h-4 w-4"/>
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>
            </div>
        </div>
    )
}