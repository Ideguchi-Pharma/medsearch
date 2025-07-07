import Image from "next/image";
import { RiInformationFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";

export default function Home() {
  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-left justify-items-left min-h-screen font-[family-name:var(--font-geist-sans)]">
       <header className="w-full bg-white bg-opacity-50 border-b border-gray-200 p-4 flex items-center gap-4 shadow-sm fixed top-0 z- backdrop-blur-sm">
        <div className="flex items-center gap-4"> 
              {/* サイドメニュー開閉ボタンのプレースホルダー */}
              {/* 元のサイトには左側に「>」のようなアイコンがあるので、それを模倣 */}
        <div className="
            flex items-center justify-center 
            px-1 py-1 
            border border-green-500 rounded-lg
            text-green-600 font-bold text-sm
            min-w-[60px] sm:min-w-[80px]
            cursor-pointer select-none
          ">
            デモ薬局
          </div>
          <span className="
            flex items-center justify-center
            bg-orange-300 text-gray-800 
            text-xs font-bold
            px-1 py-1 rounded-lg
            uppercase 
            min-w-[70px] sm:min-w-[70px]
            cursor-pointer select-none
          ">
            PREVIEW
          </span>
          </div>
        </header> 
      <main className="flex flex-col gap-[8px] row-start-1 items-center p-8 sm:items-start mt-[64px]">
        <p className="tracking-[-.01em] text-2xl font-bold">
            メドサーチ
        </p>
        <p className="tracking-[-.01em] mb-8">
            マイページ ・ メドサーチ
        </p>
        <div className="relative flex items-start space-x-2 px-4 py-2 rounded-lg w-full" style={{ backgroundColor: "#e0f7fa" }}>
         <p className="text-black px-0.5 py-0.5 text-sm text-gray-800 pl-10 rounded font-[family-name:var(--font-geist-mono)]">
            グループに共有されている在庫状況を検索します。対象グループを選択して、医薬品名を入力してください。
        </p>
        <div className="absolute left-6 top-7 -translate-y-1/2 text-cyan-600 w-10 h-10 text-2xl">
        <RiInformationFill />
        </div>
        </div>

        <div className="flex items-center gap-4 mt-8 w-full">
          <select className="
          flex-grow-0 flex-shrink-0
          w-48 p-2 border border-gray-300 rounded-md
          focus-outline-none focus:ring-2 focus-ring-blue-500 focus:border-transparent
          bg-white text-gray-700"
          >
            <option value="" disabled selected hidden className="text-gray-400">Group</option>
            <option value="groupA">シメサバ薬剤師会</option>
            <option value="groupB">グッピー薬局グループ</option>
            <option value="groupC">ナマズ株式会社グループ</option>
            <option value="groupD">トラフグ総合病院門前グループ</option>
            <option value="groupE">イワシ島グループ</option>
            <option value="groupF">クロマグロ薬剤師会</option>
            <option value="groupG">スルメイカ薬局グループ</option>
            <option value="groupH">ブリ薬局グループ</option>
            <option value="groupI">キンメダイ薬剤師会</option>
          </select>

          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="search..."
              className="
              w-full p-2 pl-10
              border border-gray-300 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              text-gray-700"
            />
            <div className="absolute left-4 top-4/7 -translate-y-1/2 text-gray-400 w-5 h-5">
            <CiSearch  />
            </div>

          </div>

        </div>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          blank
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          blank
        </a>
        <a
          className="flex items-center gap-2 py-16 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
         blank
        </a>
      </footer>
    </div>
  );
}
