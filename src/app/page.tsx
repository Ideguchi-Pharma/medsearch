'use client';

import Image from "next/image";
import {
  InformationCircleIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/solid";

import { useState } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, } from '@headlessui/react';

import dayjs from 'dayjs';
import 'dayjs/locale/ja'; 
dayjs.locale('ja'); 

import { dummyData } from "@/data/dummyData";
import PharmacyTableHead from "@/components/PharmacyTableHead";


export default function Home() {
  const [selectedGroup, setSelectedGroup] = useState({ id: '', name: 'Group' });
  const groups = [ 
    { id: '', name: 'Group' }, 
    { id: 'groupA', name: 'シメサバ薬剤師会' },
    { id: 'groupB', name: 'グッピー薬局グループ' },
    { id: 'groupC', name: 'ナマズ株式会社グループ' },
    { id: 'groupD', name: 'トラフグ総合病院門前グループ' },
    { id: 'groupE', name: 'イワシ島グループ' },
    { id: 'groupF', name: 'クロマグロ薬剤師会' },
    { id: 'groupG', name: 'スルメイカ薬局グループ' },
    { id: 'groupH', name: 'ブリ薬局グループ' },
    { id: 'groupI', name: 'キンメダイ薬剤師会' },
  ];

  const handleGroupChange = (person: { id: string; name: string; }) => {
    setSelectedGroup(person);
  };
  return (
       <div className="w-full flex-col min-h-screen">       
        <header className="
          w-full 
          bg-white bg-opacity-50 
          border-b border-gray-200 
          p-4 flex items-center gap-4 
          shadow-sm fixed top-0 z-50 
          backdrop-blur-sm
        ">
         <div className="flex items-center gap-4"> 
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
           <main className="
           w-full flex flex-col 
           gap-[8px] row-start-1 
           items-center p-8 
           sm:items-start mt-[64px]
           ">
            <p className="tracking-[-.01em] text-2xl font-bold">
             メドサーチ
            </p>
            <p className="tracking-[-.01em] mb-8">
             マイページ ・ メドサーチ
            </p>
            <div className="
            relative flex items-start 
            space-x-2 px-4 py-2 rounded-lg w-full" 
            style={{ backgroundColor: "#e0f7fa" }}>
             <p className="
             text-black px-0.5 py-0.5 
             text-sm text-gray-800 pl-10 
             rounded font-[family-name:var(--font-geist-mono)]
             ">
             グループに共有されている在庫状況を検索します。対象グループを選択して、医薬品名を入力してください。
             </p>
              <div className="absolute left-6 top-5 -translate-y-1/2 text-cyan-600 rounded-full w-6 h-6 text-2xl">
              <InformationCircleIcon />
              </div>
            </div>

        <div className="flex items-center gap-4 mt-8 w-full">
        <Listbox value={selectedGroup} onChange={handleGroupChange} className="relative flex-grow-0 flex-shrink-0 w-48">
              {({ open }) => (
                <div>
                  <ListboxButton className={`
                      relative w-48 cursor-default rounded-md border border-gray-500 bg-white py-2 pl-3 pr-10 text-left 
                      shadow-sm focus:outline-none 
                      sm:text-sm
                      ${selectedGroup.id === '' ? 'text-gray-400' : 'text-gray-700'}
                  `}>
                    <span className="block truncate">{selectedGroup.name}</span>
                     </ListboxButton>

                  <ListboxOptions className="
                      absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm
                  ">
                    {groups.map((group) => (
                      <ListboxOption
                        key={group.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-indigo-100 text-white' : 'text-gray-900'
                          }`
                        }
                        value={group}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {group.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                {/* チェックマークアイコン */}
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                                </svg>
                              </span>
                            ) : null}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              )}
            </Listbox>

          <div className="rve flex-grow">
            <input
              type="text"
              placeholder="search..."
              className="
              w-full p-2 pl-10
              border border-gray-300 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              text-gray-700"
            />
            <div className="absolute left-112 top-75 -translate-y-1/2 text-gray-400 w-4 h-4">
            <MagnifyingGlassIcon />
            </div>
          </div>
        </div>
          <div className="mt-8 w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm"> 
          <table className="min-w-full divide-y divide-gray-200"> 
            {/* ★thead の代わりに PharmacyTableHead コンポーネントを使用★ */}
            <PharmacyTableHead /> 
            <tbody className="bg-white divide-y divide-gray-200"> 
              {dummyData.map((pharmacy) => (
                <tr key={pharmacy.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[15%]">
                    {pharmacy.drugName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 w-[10%]">
                    {pharmacy.price}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 w-[20%]">
                    {pharmacy.facilityName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 font-medium w-[15%]">
                    {pharmacy.distance}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center w-[10%]">
                    {pharmacy.dispenseCount}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center w-[10%]">
                    {pharmacy.dispenseAmount}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right w-[15%]">
                    {dayjs(pharmacy.lastDispensetDate).format('YYYY/MM/DD')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {/*<div className="
      flex w-full
      bg-gray-100 border-b border-gray-200
      py-3 px-4
      mt-8
      font-bold text-gray-600 text-sm
      ">
        <div className="w-1/4">医薬品名</div>
        <div className="w-1/4">薬価</div>
        <div className="w-1/4">施設名</div>
        <div className="w-1/4">距離</div>
        <div className="w-1/4">調剤数</div>
        <div className="w-1/4">調剤量</div>
        <div className="w-1/4">最終調剤日</div>
      </div>
      */}
      

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
