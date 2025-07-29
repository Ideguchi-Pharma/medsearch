import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Home() {
    return (
        <div className="p-8">
            <p className="
            tracking-[-.01em] text-2xl font-bold 
            ">
                在庫状況を共有する
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
                    在庫状況を共有する
                </p>
            </div>
            <div className="
            flex flex-row items-center justify-start
            space-x-2 px-4 py-2 rounded-2xl w-full info-bg
            ">
                <CheckCircleIcon className="h-6 w-6 text-green-500 dark:text-white"/>
                <p className="text-sm ">
                    グループに共有中の在庫状況の一覧です。
                    レセプトデータ(CYOファイル)から簡単に在庫状況を参加グループに共有することができます。
                </p>
            </div>

            <table className="mt-10 w-full items-start justify-start">
                <thead className="secondaly-bg">
                    <tr>
                        <th>調剤月</th>
                        <th>種別</th>
                        <th>ステータス</th>
                        <th>登録日</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2025年06月</td>
                        <td></td>
                        <td>未登録</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2025年05月</td>
                        <td></td>
                        <td>未登録</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2025年04月</td>
                        <td></td>
                        <td>未登録</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2025年03月</td>
                        <td></td>
                        <td>未登録</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2025年02月</td>
                        <td></td>
                        <td>未登録</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2025年01月</td>
                        <td></td>
                        <td>未登録</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
