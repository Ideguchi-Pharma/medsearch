// src/app/page.tsx

'use client';

import Image from "next/image";
import {
  InformationCircleIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/solid";
import { useState, useEffect } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Input } from '@headlessui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; 
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.locale('ja'); 
dayjs.extend(customParseFormat);
import PharmacyTableHead from "@/components/PharmacyTableHead";
import * as XLSX from 'xlsx';

export default function Home() {
  const [pharmacyData, setPharmacyData] = useState<PharmacyData[]>([]); 
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExcelData = async () => {
      setLoadingError(null); 
      const filePath = '/PharmacyData.xlsx';
      try {
        const response = await fetch(filePath); 
        if (!response.ok) { 
          throw new Error(`ファイルが見つからないか、読み込めませんでした: ${response.status} - ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        // cellDates: true を指定することで、Excelの日付は可能な限りDateオブジェクトとして読み込まれます
        const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true }); 
        const sheetName = workbook.SheetNames[0]; 
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: Record<string, unknown>[] = XLSX.utils.sheet_to_json(worksheet);

        const processedData: PharmacyData[] = jsonData.map((item: Record<string, unknown>) => {
          let formattedDateString = '';
          const rawDateValue = item.lastDispenseDate; // rawDateValue を取得

          // ★ここから修正点★
          if (rawDateValue instanceof Date) {
            // JavaScriptのDateオブジェクトの場合
            formattedDateString = dayjs(rawDateValue).format('YYYY/MM/DD');
          } else if (typeof rawDateValue === 'number') {
            // Excelのシリアル値（数値）の場合
            // Excelの日付は1900年1月1日を1とするシリアル値。
            // JavaScriptのDateオブジェクトのUnixエポック（1970年1月1日）との差を考慮して変換します。
            // 25569は1900年1月1日から1970年1月1日までの日数（Excelの1900年閏年バグ調整済み）
            if (!isNaN(rawDateValue)) { // 有効な数値か確認
              const date = new Date(Math.round((rawDateValue - 25569) * 86400 * 1000));
              if (!isNaN(date.getTime())) { // 変換された日付が有効か確認
                formattedDateString = dayjs(date).format('YYYY/MM/DD');
              }
            }
          } else if (typeof rawDateValue === 'string' && rawDateValue !== '') {
            // 文字列（例: "YYYY-MM-DD"形式）の場合
            const parsedDay = dayjs(rawDateValue, 'YYYY-MM-DD'); // 指定したフォーマットで解析
            if (parsedDay.isValid()) { // 有効な日付として解析できたか確認
              formattedDateString = parsedDay.format('YYYY/MM/DD');
            }
          }
          // ★ここまで修正点★

          const processedItem: PharmacyData = {
            drugName: (item.drugName as string) || '', 
            price: Number(item.price), 
            facilityName: (item.facilityName as string) || '',
            distance: Number(item.distance), 
            dispenseCount: Number(item.dispenseCount), 
            dispenseAmount: Number(item.dispenseAmount), 
            lastDispenseDate: formattedDateString, // 変換済みの文字列をセット
          };
          return processedItem;
      });
      setPharmacyData(processedData); 
      } catch (error: unknown) {
        console.error("Excelファイルの読み込み中にエラーが発生しました:", error);
        const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました';
        setLoadingError(`データの読み込みに失敗しました: ${errorMessage}`);
      }
    };
    fetchExcelData(); 
  }, []);

  const [selectedGroup, setSelectedGroup] = useState({ id: '', name: 'Group' });
  const groups = [ 
    { id: '', name: 'Group' }, 
    { id: 'groupA', name: 'シメサバ薬剤師会' },
    { id: 'groupB', name: 'グッピー薬局グループ' },
    { id: 'groupC', name: 'ナマズ市薬剤師会' },
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
              {() => (
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
                      absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-black ring-opacity-5 focus:outline-none sm:text-sm
                  ">
                    {groups.map((group) => (
                      <ListboxOption
                        key={group.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-2 pr-2 ${
                            active ? 'bg-gray-100 bg-opacity-80 rounded-lg bg-rounded-lg border-white ring-opacity-5' : 'text-gray-900'
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
                            
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              )}
            </Listbox>

          <div className="flex-grow">
            <Input
              type="text"
              placeholder="search..."
              className="
              w-full py-2 pl-10 sm:text-sm
              border border-gray-500 rounded-md
              focus:outline-none
              text-gray-700"
            />
            <div className="absolute left-112 top-75 -translate-y-1/2 text-gray-400 w-4 h-4">
            <MagnifyingGlassIcon />
            </div>
          </div>
        </div>
          <div className="mt-8 w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm"> 
          <table className="min-w-full divide-y divide-gray-200"> 
            <PharmacyTableHead /> 
            <tbody className="bg-white divide-y divide-gray-200"> 
              {loadingError ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-red-500">
                    {loadingError}
                  </td>
                </tr>
              ) : pharmacyData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    データを読み込み中です...
                  </td>
                </tr>
              ) : (
                pharmacyData.map((pharmacy, index) => ( 
                  <tr key={index}> 
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 w-[10%]">
                      {pharmacy.drugName} 
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 w-[10%]">
                      {pharmacy.price}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 w-[20%]">
                      {pharmacy.facilityName}
                    </td>
                    <td className="px-4 py-4 text-sm text-blue-600 font-medium w-[10%]"> 
                      {pharmacy.distance}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 text-center w-[10%]">
                      {pharmacy.dispenseCount}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 text-center w-[10%]">
                      {pharmacy.dispenseAmount} 
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 text-right w-[10%]"> 
                      {pharmacy.lastDispenseDate} 
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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