import Link from "next/link";

export default function Home() {
    return (
        <div className="p-8">
            <p className="
            tracking-[-.01em] text-2xl font-bold 
            ">
                グループを探す
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
                    グループを探す
                </p>
            </div>
        </div>
    )
}
