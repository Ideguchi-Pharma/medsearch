import Image from "next/image";
import { RiInformationFill } from "react-icons/ri";

export default function Home() {
  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-left justify-items-left min-h-screen px-2 pt-2 pb-20 gap-16 sm:px-20 sm:pt-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[8px] row-start-1 items-center sm:items-start">
        <p className="tracking-[-.01em] text-2xl font-bold">
            メドサーチ
        </p>
        <p className="tracking-[-.01em] mb-8">
            マイページ ・ メドサーチ
        </p>
        <div className="flex items-start space-x-2 px-4 py-2 rounded-lg" style={{ backgroundColor: "#e0f7fa" }}>
         <RiInformationFill /* className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" */ />
         <p className="text-black px-0.5 py-0.5 text-sm text-gray-800 rounded font-[family-name:var(--font-geist-mono)] flex-grow]">
            グループに共有されている在庫状況を検索します。対象グループを選択して、医薬品名を入力してください。
        </p>
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
          Learn
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
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
