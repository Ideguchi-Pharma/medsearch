import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const tableHeaders = ["調剤月", "種別", "ステータス", "登録日", ""];

const stockData = [
    { month: "2025年06月", type: [], status: "未登録", date: ""},
    { month: "2025年05月", type: [], status: "未登録", date: ""},
    { month: "2025年04月", type: [], status: "未登録", date: ""},
    { month: "2025年03月", type: [], status: "未登録", date: ""},
    { month: "2025年02月", type: ["社保", "国保"], status: "共有中", date: "2025/03/10"},
    { month: "2025年01月", type: ["国保"], status: "共有中", date: "2025/02/08"},
];

const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case "共有中":
            return "bg-[#00AB55] text-white";
        case "未登録":
            return "bg-[#FFAB00]";
        default:
            return "bg-gray-200 text-gray-800"
    }
};

const getTypeBadgeClass = (type: string) => {
    switch (type) {
        case "社保":
            return "bg-[#00AB5529] text-[#007B55] dark:text-white"
        case "国保":
            return "bg-[#FFAB0029] text-[#B76E00] dark:text-white"
        default:
            return "bg-gray-200 text-gray-800"
    }
};

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
                <CheckCircleIcon className="h-6 w-6 text-green-500 dark:text-white hidden sm:block"/>
                <p className="text-sm ">
                    グループに共有中の在庫状況の一覧です。
                    レセプトデータ(CYOファイル)から簡単に在庫状況を参加グループに共有することができます。
                </p>
            </div>

            <div className="mt-4 w-full overflow-x-auto rounded-lg">
                <table className="min-w-full text-left text-sm">
                    <thead className="">
                        <tr>
                            {tableHeaders.map((header) => (
                                <th key={header} scope="col" className="px-6 py-4 font-medium font-semibold secondaly-fg secondaly-bg">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {stockData.map((item) => (
                            <tr key={item.month} className="">
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{item.month}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex gap-2">
                                        {item.type.map(t => (
                                            <span key={t} className={`px-2 py-1 text-xs font-semibold rounded-md ${getTypeBadgeClass(t)}`}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-2 text-xs rounded-full ${getStatusBadgeClass(item.status)}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.status === "未登録" && (
                                        <button className="px-4 py-2 text-sm font-semibold border border-green-500 text-green-600 rounded-lg hover:bg-green-50">
                                            共有
                                        </button>
                                    )}
                                    {item.status === "共有中" && (
                                        <button className="px-4 py-2 text-sm font-semibold border border-gray-400 rounded-lg hover-bg">
                                            参照
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
