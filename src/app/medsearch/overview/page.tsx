//「メドサーチとは」ページ

import Link from "next/link"
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const serviceMenu = {
    title: "4. サービスメニュー",
    links: [
        { id: 1, href: '#', label: 'メドサーチとは', appendix: "このページ" },
        { id: 2, href: '/', label: '在庫状況を調べる', appendix: "グループに参加する他施設の在庫状況を調べます" },
        { id: 3, href: '#', label: '在庫状況を共有する', appendix: "自施設の在庫状況をグループに共有します" },
        { id: 4, href: '#', label: 'グループを探す', appendix: "在庫状況をお互いに共有するためのグループを探します" },
    ]
}

export default function Home() {
return (
    <div className="p-8">
        <p className="
        tracking-[-.01em] text-2xl font-bold 
        ">
            メドサーチとは
        </p>
        <div className="flex flex-row gap-3  pt-3">
            <Link href={"/mypage"} className="
            tracking-[-.01em] mb-8 hover:underline
            ">
                マイページ
            </Link>
            <p className="
            tracking-[-.01em] mb-8
            ">
                ・
            </p>
            <p className="
            tracking-[-.01em] mb-8
            ">
                メドサーチとは
            </p>
        </div>

        <div className="w-full rounded-2xl shadow-sm">
        <div className="
            flex flex-col sm:flex-row  justify-start mt-4
            space-x-2 px-4 py-2 rounded-2xl w-full info-bg
            ">
             <InformationCircleIcon className="items-start justify-start pt-1 h-8 w-8 text-cyan-500 dark:text-white hidden sm:block" />
             <div className="flex flex-col gap-1 p-1">
             <p className="text-base font-semibold">
             メドサーチは近隣薬局間での在庫状況の共有サービスです
             </p>
             <p className="text-sm">
             グループに参加する薬局同士でお互いに在庫状況を共有し、日々の小分け分譲業務をスムーズに行うことができます。
             </p>
             </div>
             <button className="text-sm py-2 px-4 rounded-xl bg-cyan-500 mr-auto sm:mr-0 sm:ml-auto text-white font-bold cursor-pointer">
                サービスの概要
             </button>
        </div>
        <div className="flex flex-col pt-10 px-6">
            <h2 className="sm:text-2xl font-bold mb-6">1. メドサーチを利用するまでの流れ</h2>
            <ol className="list-decimal list-outside text-sm pl-4 space-y-3">
            <li className="pl-6"> {/* ← ここにパディングを追加 */}
            まずは、<Link href="https://www.pharmacloud.co.jp/service/med-search" target="_blank" rel="noopener noreferrer" className="button-fg hover:underline">サービスの概要</Link>をご覧ください。イラストや動画でメドサーチについてわかりやすく説明しています。
            </li>
                <li className="pl-6">「2. 薬局の施設登録（登録無料）」に記載の通り、利用する施設を登録しましょう。</li>
                <li className="pl-6">
                    <Link href="/medsearch/group/" className="button-fg">グループを探す</Link>
                    画面から参加したいグループを探し、参加申請を行いましょう。グループ管理者が承認したらグループに参加できます。</li>
                <li className="pl-6">
                    <Link href="/medsearch/group/create" className="button-fg">グループの登録</Link>
                    画面から新たにご自身が管理するグループを作成することもできます。薬剤師会や近隣の仲の良い薬局同士でグループを作り、メドサーチを活用しましょう。</li>
            </ol>
        </div>
        <div className="flex flex-col pt-10 px-6">
            <h2 className="sm:text-2xl font-bold mb-6">2. 薬局の施設登録（登録無料）</h2>
            <p className="text-sm">メドサーチを利用する薬局の施設登録を行いましょう。新規の施設登録は
                <Link href="/setting/inst/create/" className="button-fg">こちら</Link>
                から。</p>
            <p className="text-sm">すでに登録済の施設にメンバーとして参加することもできます。その場合は施設の管理者が
                <Link href="#" className="button-fg">施設を管理する</Link>
                画面からあなたを招待します。</p>
            <p className="text-sm">また、一つのアカウントで複数の施設を管理・利用することができます。</p>
        </div>
        <div className="flex flex-col pt-10 px-6">
            <h2 className="sm:text-2xl font-bold mb-6">3. レセプトファイルから在庫状況の登録</h2>
            <p className="text-sm">メドサーチは毎月のレセプトファイル(CYOファイル)をパソコン上で読み込み、医薬品ごとの在庫状況を抽出し、在庫状況のみをクラウドに保存します。</p>
            <p className="text-sm">保存した在庫状況は参加するグループに共有されます。共有を停止したい場合は、いつでもクラウド上の在庫状況を削除することが可能です。</p>
            <p className="text-sm">登録作業は
                <Link href="/medsearch/stock/" className="button-fg">在庫状況を共有する</Link>
                画面から簡単に実施可能です。</p>
        </div>
        <div className="flex flex-col pt-10 px-6 pb-4">
            <h2 className="sm:text-2xl font-bold mb-6">
                {serviceMenu.title}
            </h2>
            <div className="text-sm">
            {serviceMenu.links.map((link => (
                <div key={link.id} className="flex items-center gap-x-2 sm:gap-x-6 py-2">
                    <div className="w-8 hidden sm:block">
                        {link.id}
                    </div>
                    <div className="flex-2 sm:flex-1">
                        <Link href={link.href} className="button-fg">
                        {link.label}
                        </Link>
                    </div>
                    <div className="flex-[4] text-sm">
                        {link.appendix}
                        </div>
                </div>
            )))}
            </div>
        </div>
        </div>

     </div>
     )
    }