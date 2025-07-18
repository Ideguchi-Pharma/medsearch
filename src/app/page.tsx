'use client';

import Image from "next/image";
import Link from "next/link";
import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  TrashIcon
} from "@heroicons/react/24/solid";
import { useState, useEffect } from 'react';
import { 
  Listbox, ListboxButton, ListboxOptions, ListboxOption, 
  Input,
  Menu, MenuButton, MenuItems, MenuItem,
  Dialog, DialogPanel, DialogTitle, Button
 } from '@headlessui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; 
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.locale('ja'); 
dayjs.extend(customParseFormat);
import PharmacyTableHead from "@/components/PharmacyTableHead";
import * as XLSX from 'xlsx';

interface PharmacyData {
  drugName: string; 
  price: number; 
  facilityName: string; 
  distance: number; 
  dispenseCount: number; 
  dispenseAmount: number; 
  lastDispenseDate: string; 
}

// ★追加：ひらがなをカタカナに変換する関数★
function convertHiraganaToKatakana(text: string): string {
  if (!text) return '';
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    // ひらがなのUnicode範囲: U+3041 ('ぁ') から U+3096 ('ヶ')
    if (code >= 0x3041 && code <= 0x3096) {
      // カタカナへのオフセット: 0x60
      return String.fromCharCode(code + 0x60); 
    }
    return char;
  }).join('');
}

export default function Home() {
  const [pharmacyData, setPharmacyData] = useState<PharmacyData[]>([]); 
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPharmacyData, setFilteredPharmacyData] = useState<PharmacyData[]>([]);
  const [isOpenDemoDialog, setIsOpenDemoDialog] = useState(false);

  // ソート状態のState
  const [sortColumn, setSortColumn] = useState<keyof PharmacyData | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // ダイアログを閉じる
  function closeDemoDialog() {
    setIsOpenDemoDialog(false);
  }

  // ダイアログを開く
  function openDemoDialog() {
    setIsOpenDemoDialog(true);
  }

  useEffect(() => {
    const fetchExcelData = async () => {
      setLoadingError(null); 
      const filePath = '/PharmacyData.xlsx';
      try {
        const response = await fetch(filePath); 
        if (!response.ok) { 
          throw new Error(`ファイルが見つからないか、読み込めませんでした: 
            ${response.status} - ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true }); 
        const sheetName = workbook.SheetNames[0]; 
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: Record<string, unknown>[] = XLSX.utils.sheet_to_json(worksheet);

        const processedData: PharmacyData[] = jsonData.map((item: Record<string, unknown>) => {
          let formattedDateString = '';
          const rawDateValue = item.lastDispenseDate;

          if (rawDateValue instanceof Date) {
            formattedDateString = dayjs(rawDateValue).format('YYYY/MM/DD');
          } else if (typeof rawDateValue === 'number') {
            if (!isNaN(rawDateValue)) {
              const date = new Date(Math.round((rawDateValue - 25569) * 86400 * 1000));
              if (!isNaN(date.getTime())) {
                formattedDateString = dayjs(date).format('YYYY/MM/DD');
              }
            }
          } else if (typeof rawDateValue === 'string' && rawDateValue !== '') {
            const parsedDay = dayjs(rawDateValue, 'YYYY-MM-DD');
            if (parsedDay.isValid()) {
              formattedDateString = parsedDay.format('YYYY/MM/DD');
            }
          }

          const processedItem: PharmacyData = {
            drugName: (item.drugName as string) || '', 
            price: Number(item.price), 
            facilityName: (item.facilityName as string) || '',
            distance: Number(item.distance), 
            dispenseCount: Number(item.dispenseCount), 
            dispenseAmount: Number(item.dispenseAmount), 
            lastDispenseDate: formattedDateString,
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

  useEffect(() => {
    let results: PharmacyData[] = [];
    if (searchTerm.length === 0) {
      results = [];
    } else if (searchTerm.length < 2) {
      results = [];
    } else {
      const normalizedSearchTerm = convertHiraganaToKatakana(searchTerm.toLowerCase());
      
      results = pharmacyData.filter(pharmacy => {
        const normalizedDrugName = convertHiraganaToKatakana(pharmacy.drugName.toLowerCase());
        return normalizedDrugName.includes(normalizedSearchTerm);
      });
    }

    // ソートロジック
    if (sortColumn) {
      results.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          // 日付のソート
          if (sortColumn === 'lastDispenseDate') {
            const dateA = dayjs(aValue, 'YYYY/MM/DD');
            const dateB = dayjs(bValue, 'YYYY/MM/DD');
            if (dateA.isValid() && dateB.isValid()) {
              return sortOrder === 'asc' ? dateA.diff(dateB) : dateB.diff(dateA);
            }
          }
          // その他の文字列のソート
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        return 0; // 型が一致しない場合はソートしない
      });
    }

    setFilteredPharmacyData(results);
  }, [searchTerm, pharmacyData, sortColumn, sortOrder]); // 依存配列にsortColumnとsortOrderを追加

  // ソートハンドラ
  const handleSort = (columnKey: keyof PharmacyData) => {
    if (sortColumn === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortOrder('asc');
    }
  };

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
  const NoDataDisplay = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-8">
      <Image 
        src="https://stage.pharmacloud.jp/assets/illustrations/illustration_empty_content.svg"
        alt="No Data" 
        width={250} 
        height={250} 
        className="mb-4 opacity-50"
      />
      <p className="text-lg font-bold">{message}</p>
    </div>
  );
  return (
    <div className="w-full flex-col min-h-screen"> 
      <header className=" 
        w-full
        bg-opacity-50 
        p-4
        shadow-sm fixed top-0 z-50
        backdrop-blur-sm  
      ">
        <div className="flex flex-row items-center gap-2 w-full ml-10 sm:ml-0">
          <Button
            onClick={openDemoDialog}
            className="
              flex items-center justify-center
              px-1 py-1
              border border-green-500 rounded-lg
              text-green-600 font-bold text-sm
              min-w-[60px] sm:min-w-[80px]
              cursor-pointer select-none hover-none
            "
          >
            デモ薬局
          </Button>
          <span className="
            flex items-center justify-center
            bg-orange-300
            text-xs font-bold
            px-1 py-1 rounded-lg
            uppercase 
            min-w-[70px] sm:min-w-[70px]
            cursor-pointer select-none
          ">
            PREVIEW
          </span>
          <div className="flex items-center justify-center">
            <Menu>
              <MenuButton className="flex items-center justify-center
                w-8 h-8 rounded-full 
                text-xs 
                shadow-inner shadow-white/10
                focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white
                secondaly-bg
                ">
                  出口
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom end"
                className="
                origin-top-right rounded-xl 
                border border-gray-200 
                p-1 text-sm/6 shadow-lg 
                ring-none ring-black ring-opacity-5 transition 
                duration-100 ease-out secondaly-bg 
                [--anchor-gap:--spacing(1)] 
                focus:outline-none data-closed:scale-95 data-closed:opacity-0 z-[9999]
                ">
                <MenuItem>
                  <p className="
                  group flex w-full items-center 
                  gap-2 rounded-lg px-3 py-1.5
                  "> 
                    出口大靖
                  </p>
                </MenuItem>
                <MenuItem>
                  <p className="
                  group flex w-full 
                  items-center rounded-lg px-3
                  "> 
                    ideguchi@pharmacloud.jp
                  </p>
                </MenuItem>
                <div className="
                my-1 h-px"
                />
                <MenuItem>
                  <button className="
                  group flex w-full 
                  items-center gap-2 rounded-lg 
                  px-3 py-1.5
                  "> 
                    ホーム
                  </button>
                </MenuItem> 
                <MenuItem>
                  <button className="
                  group flex w-full items-center 
                  gap-2 rounded-lg px-3 py-1.5
                  "> 
                    アカウントの管理
                  </button>
                </MenuItem>
                <div className="
                my-1 h-px
                "/>
                <MenuItem>
                  <button className="
                  group flex w-full items-center 
                  gap-2 rounded-lg px-3 py-1.5
                  ">
                    ログアウト
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          </div>
      </header>
           <main className="
           w-full flex flex-col 
           gap-[8px] row-start-1 
           items-start p-8 
           sm:items-start mt-[64px]
           ">
            <p className="
            tracking-[-.01em] text-2xl font-bold
            ">
             メドサーチ
            </p>
            <p className="
            tracking-[-.01em] mb-8
            ">
             マイページ ・ メドサーチ
            </p>
            <div className="
            relative flex items-start 
            space-x-2 px-4 py-3 rounded-lg w-full info-bg
            ">
             <p className="
             px-0.5 py-0.5 
             text-sm  pl-10 
             rounded font-[family-name:var(--font-geist-mono)]
             ">
             グループに共有されている在庫状況を検索します。対象グループを選択して、医薬品名を入力してください。
             </p>
              <div className="
              absolute left-5 top-6 -translate-y-1/2 
              rounded-full w-6 h-6 text-2xl
              ">
              <InformationCircleIcon className="text-cyan-500 dark:text-white" />
              </div>
            </div>

        <div className="
        flex flex-col sm:flex-row 
        items-center gap-4 mt-8 w-full
        ">
        <Listbox value={selectedGroup} onChange={handleGroupChange} 
        className="
        relative w-full sm:w-48 
        flex-grow-0 flex-shrink-0
        ">
              {() => (
                <div>
                  <ListboxButton className={`
                      relative w-full sm:w-48 cursor-default 
                      rounded-md border border-gray-500 py-2 pl-3 pr-10 text-left 
                      shadow-sm focus:outline-none sm:text-sm 
                      hover-none cursor-pointer
                      ${selectedGroup.id === '' ? '' : ''}
                  `}>
                    <span className="
                    block truncate">{selectedGroup.name}
                    </span>
                     </ListboxButton>
                  <ListboxOptions className="
                      absolute z-10 mt-1 max-h-60 w-full 
                      overflow-auto rounded-lg py-1 text-base 
                      shadow-lg ring-black ring-opacity-5 
                      focus:outline-none sm:text-sm secondaly-bg
                  ">
                    {groups.map((group) => (
                      <ListboxOption
                        key={group.id}
                        className={({ active }) =>
                          `relative cursor-default select-none 
                        py-2 pl-2 pr-2 hover-bg ${
                          active ? 'bg-opacity-80 rounded-lg bg-rounded-lg border-white ring-opacity-5':''
                        }`}
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

          <div className="
          w-full flex-grow flex flex-col 
          sm:flex-row relative
          ">
            <div className="
            relative flex-grow
            ">
              <Input
                type="text"
                placeholder="search..."
                className="
                w-full py-2 pl-10 sm:text-sm 
                border border-gray-500 
                rounded-md focus:outline-none
                "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="
              absolute inset-y-0 left-0 
              flex items-center pl-4 pointer-events-none
              ">
                <MagnifyingGlassIcon className="h-4 w-4"/>
              </div>
            </div>
            {/* PC用クリアボタン */}
            {searchTerm.length > 0 && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="
                sm:flex hidden items-center justify-center 
                ml-2 w-28 h-8 px-2 rounded-md
                "
                aria-label="クリア"
              >
                <TrashIcon className="h-4 w-4 mr-1 align-middle" />
                <span className="align-middle">クリア
                </span>
              </button>
            )}
            {/* モバイル用クリアボタン */}
            {searchTerm.length > 0 && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="
                sm:hidden mt-2 flex 
                items-center justify-center 
                py-2 rounded
                "
                aria-label="クリア"
              >
                <TrashIcon className="h-5 w-5 mr-1" />
                クリア
              </button>
            )}
          </div>
        </div>
          <div className="
          mt-8 w-full overflow-x-auto 
          border border-gray-200 
          rounded-lg shadow-sm
          "> 
          <table className="
          w-full min-w-[900px] divide-y divide-gray-200
          "> 
            {/* PharmacyTableHeadにソート関連のPropsを渡す*/}
            <PharmacyTableHead 
              sortColumn={sortColumn} 
              sortOrder={sortOrder} 
              onSort={handleSort} 
            /> 
            <tbody className="
            divide-y divide-gray-200
            "> 
              {loadingError ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center">
                    {loadingError}
                  </td>
                </tr>
              ) : filteredPharmacyData.length === 0 && searchTerm === '' ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center">
                  <NoDataDisplay message="No Data" />
                  </td>
                </tr>
                ) : searchTerm === '' ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center">
                    <NoDataDisplay message="No Data" />
                    </td>
                  </tr>
                ) : filteredPharmacyData.length === 0 && searchTerm !== '' ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center">
                    <NoDataDisplay message="No Data" />
                    </td>
                  </tr>
              ) : (
                filteredPharmacyData.map((pharmacy, index) => ( //検索結果テーブル
                  <tr key={index}> 
                    <td className="px-4 py-4 text-sm font-bold min-w-[105px] ">
                      {pharmacy.drugName} 
                    </td>
                    <td className="px-4 py-4 text-sm w-[80px] text-right">
                      {pharmacy.price}円
                    </td>
                    <td className="px-4 py-4 text-sm min-w-[90px] max-w-[150px] sm:max-w-none ">
                      <Link
                        href={`/facility/${encodeURIComponent(pharmacy.facilityName)}`}
                        className="text-green-600 font-bold hover-bg rounded-md p-2"
                      >
                        {pharmacy.facilityName}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-right w-[80px]"> 
                      {pharmacy.distance}km
                    </td>
                    <td className="px-4 py-4 text-sm  text-right w-[105px]">
                      {pharmacy.dispenseCount}
                    </td>
                    <td className="px-4 py-4 text-sm text-right w-[90px]">
                      {pharmacy.dispenseAmount} 
                    </td>
                    <td className="px-4 py-4 text-sm text-right w-[115px]"> 
                      {pharmacy.lastDispenseDate} 
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Dialog open={isOpenDemoDialog} as="div" className="
      relative z-[9999] focus:outline-none" 
      onClose={closeDemoDialog}
      >
        <div className="
        fixed inset-0 z-10 w-screen overflow-y-auto bg-black/60"
        aria-hidden="true"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="
              w-full max-w-md rounded-xl p-6 text-left 
              align-middle shadow-xl
              duration-300 ease-out 
              data-closed:transform-[scale(95%)] data-closed:opacity-0
              secondaly-bg
              ">
              <DialogTitle as="h3" className="text-lg text-center font-bold leading-6">
                サービスを利用する施設を選んでください
              </DialogTitle>
              <div className="
              flex items-start gap-2 mt-4 text-lg 
              hover:rounded-lg hover-bg
              ">
               <UserCircleIcon className="h-14 w-14 shrink-0" />
               <div className="flex flex-col">
                 <span>テトラ薬局</span>
                 <p className="mt-1 text-sm">
                   福岡県新宮市
                 </p>
               </div>
             </div>
             <div className="
             flex items-start gap-2 mt-4 text-lg 
             hover: hover:rounded-lg hover-bg
             ">
               <UserCircleIcon className="h-14 w-14 shrink-0" />
               <div className="flex flex-col">
                 <span>ベタ薬局</span>
                 <p className="mt-1 text-sm">
                   福岡県北九州市
                 </p>
               </div>
             </div>
             <div className="
             flex items-start gap-2 mt-4 text-lg 
             hover: hover:rounded-lg hover-bg
             ">
               <UserCircleIcon className="h-14 w-14 shrink-0" />
               <div className="flex flex-col">
                 <span>サヨリ薬局</span>
                 <p className="mt-1 text-sm">
                   福岡県糸島市
                 </p>
               </div>
             </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}