import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";


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
             <button className="text-sm py-2 px-4 rounded-xl bg-cyan-500 ml-auto text-white font-bold">
                AI無料体験
             </button>
            </div>
            <div className="grid grid-cols-2 gap-20">
                <div className="flex flex-col">
                    <Image
                    className="p-12"
                    src="/medsearch_logo.webp"
                    alt="medsearch logo"
                    width={750}
                    height={166}
                    priority
                    />
                    <div className="flex flex-row gap-6 pl-12 pt-6 text-sm">
                        <p>メドサーチとは</p>
                        <p>在庫状況を調べる</p>
                    </div>
                    <div className="flex flex-row gap-6 pl-12 text-sm">
                        <p>在庫状況を共有する</p>
                        <p>グループを探す</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <Image
                    className="p-12"
                    src="/medorder_logo.webp"
                    alt="medorder logo"
                    width={750}
                    height={218}
                    priority
                    />
                    <div className="flex flex-row gap-6 pl-12 text-sm">
                        <p>メドオーダーとは</p>
                        <p>AI無料体験</p>
                        <p>導入方法</p>
                    </div>
                    <div className="flex flex-row gap-6 pl-12 text-sm">
                        <p>レセコンと連携する</p>
                        <p>必要在庫を予想する</p>
                    </div>
                </div>
            </div>
            <div className="
            flex flex-col items-start justify-start mt-16
            space-x-2 px-4 py-2 rounded-2xl w-full secondaly-bg
            ">
                <p className="font-bold">
                    設定
                </p>
                <div className="flex flex-row gap-6 text-sm">
                    <p>施設を管理する</p>
                    <p>グループを管理する</p>
                    <p>支払い方法を管理する</p>
                </div>
            </div>
        </div>
    )
}