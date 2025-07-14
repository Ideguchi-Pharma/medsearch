'use client';

import Image from "next/image";
import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
  UserCircleIcon
} from "@heroicons/react/24/solid";
import { useState, useEffect } from 'react';
import { 
  Listbox, ListboxButton, ListboxOptions, ListboxOption, 
  Input,
  Menu, MenuButton, MenuItems, MenuItem,
  Description, Dialog, DialogPanel, DialogTitle, Button
 } from '@headlessui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; 
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.locale('ja'); 
dayjs.extend(customParseFormat);
import PharmacyTableHead from "@/components/PharmacyTableHead";
import * as XLSX from 'xlsx';

import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'

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
  const [searchTerm, setSearchTerm] = useState<string>(''); // ★追加：検索キーワード用のState★
  const [filteredPharmacyData, setFilteredPharmacyData] = useState<PharmacyData[]>([]); // ★追加：フィルターされたデータ用のState★
  const [isOpenDemoDialog, setIsOpenDemoDialog] = useState(false)

  // ダイアログを閉じる関数
  function closeDemoDialog() {
    setIsOpenDemoDialog(false);
  }

  // ダイアログを開く関数
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

  useEffect(() => {
    let results: PharmacyData[] = [];
    if (searchTerm.length === 0) {
      // 検索キーワードが空の場合は結果を表示しない（"Please Search"を表示させるため）
      results = [];
    } else if (searchTerm.length < 2) {
      // 検索キーワードが2文字未満の場合は結果を表示しない
      results = [];
    } else {
      // 検索キーワードを小文字のカタカナに変換して正規化
      const normalizedSearchTerm = convertHiraganaToKatakana(searchTerm.toLowerCase());
      
      results = pharmacyData.filter(pharmacy => {
        // 医薬品名も小文字のカタカナに変換して正規化し、検索キーワードと比較
        const normalizedDrugName = convertHiraganaToKatakana(pharmacy.drugName.toLowerCase());
        return normalizedDrugName.includes(normalizedSearchTerm);
      });
    }
    setFilteredPharmacyData(results);
  }, [searchTerm, pharmacyData]); 

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
        src="https://stage.pharmacloud.jp/assets/illustrations/illustration_empty_content.svg" // public フォルダに配置した画像パス
        alt="No Data" 
        width={250} 
        height={250} 
        className="mb-4 opacity-50" // 画像を少し薄くする
      />
      <p className="text-gray-800 text-lg font-bold">{message}</p>
    </div>
  );
  return (
    <div className="w-full flex-col min-h-screen">       
      <header className="
        w-full 
        bg-white bg-opacity-50 
        border-b border-gray-200 
        p-4 
        shadow-sm fixed top-0 z-50
        backdrop-blur-sm
        relative
      ">
        {/* 左端：デモ薬局とPREVIEW */}
        <div className="flex items-center gap-4 relative z-10">
        <Button
            onClick={openDemoDialog}
            className="
              flex items-center justify-center
              px-1 py-1
              border border-green-500 rounded-lg
              text-green-600 font-bold text-sm
              min-w-[60px] sm:min-w-[80px]
              cursor-pointer select-none
              focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-green-50 // ボタンのフォーカス・ホバー時のスタイル
            "
          >
            デモ薬局
          </Button>
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
        {/* 絶対位置で配置 */}
        <div className="
          absolute top-4 right-4
          flex items-center justify-center
          bg-gray-100 text-gray-800
          text-xs font-bold
          w-8 h-8 rounded-full
          cursor-pointer select-none
          border border-gray-300
          shadow-lg
          z-20
        ">
        <Menu>
          <MenuButton className="flex items-center justify-center 
            w-8 h-8 rounded-full 
            bg-gray-300 text-xs text-gray-800
            shadow-inner shadow-white/10
            focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white
            data-hover:bg-gray-400 data-open:bg-gray-400
            ">
              出口
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="-52 origin-top-right rounded-xl border border-gray-200 bg-white p-1 text-sm/6 text-gray-900 shadow-lg ring-none ring-black ring-opacity-5 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 z-[9999]"
          >
            <MenuItem>
              <p className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5"> 
                出口大靖
              </p>
            </MenuItem>
            <MenuItem>
              <p className="group flex w-full items-center rounded-lg px-3 text-gray-500"> 
                ideguchi@pharmacloud.jp
              </p>
            </MenuItem>
            <div className="my-1 h-px bg-gray-200" />
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-100"> 
                ホーム
              </button>
            </MenuItem> 
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-100"> 
                アカウントの管理
              </button>
            </MenuItem>
            <div className="my-1 h-px bg-gray-200" />
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-100">
                ログアウト
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
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
            space-x-2 px-4 py-3 rounded-lg w-full" 
            style={{ backgroundColor: "#cbfbf1" }}>
             <p className="
             text-black px-0.5 py-0.5 
             text-sm text-gray-800 pl-10 
             rounded font-[family-name:var(--font-geist-mono)]
             ">
             グループに共有されている在庫状況を検索します。対象グループを選択して、医薬品名を入力してください。
             </p>
              <div className="
              absolute left-5 top-6 -translate-y-1/2 text-cyan-500 rounded-full w-6 h-6 text-2xl
              ">
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

          <div className="flex-grow relative">
            <Input
              type="text"
              placeholder="search..."
              className="
              w-full py-2 pl-10 sm:text-sm
              border border-gray-500 rounded-md
              focus:outline-none
              text-gray-700"
              value={searchTerm} // ★追加：検索ボックスの値をStateと連携★
              onChange={(e) => setSearchTerm(e.target.value)} // ★追加：入力値の変更をStateに反映★
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <MagnifyingGlassIcon className = "h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
          <div className="mt-8 w-full overflow-x-visible border border-gray-200 rounded-lg shadow-sm"> 
          <table className="min-w-full divide-y divide-gray-200"> 
            <PharmacyTableHead /> 
            <tbody className="bg-white divide-y divide-gray-200"> 
              {loadingError ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-red-500">
                    {loadingError}
                  </td>
                </tr>
              ) : filteredPharmacyData.length === 0 && searchTerm === '' ? ( // ★修正：filteredPharmacyData を使用。searchTerm も見て、初回ロード中か検索結果なしかを区別★
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  <NoDataDisplay message="No Data" />
                  </td>
                </tr>
                ) : searchTerm === '' ? ( // ★追加：検索キーワードが入力されていない場合★
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    <NoDataDisplay message="No Data" />
                    </td>
                  </tr>
                ) : filteredPharmacyData.length === 0 && searchTerm !== '' ? ( // ★追加：検索結果がない場合のメッセージ★
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    <NoDataDisplay message="No Data" /> {/* 検索結果なし */}
                    </td>
                  </tr>
              ) : (
                filteredPharmacyData.map((pharmacy, index) => ( // ★修正：filteredPharmacyData を使用。key は仮にindexとしています★
                  <tr key={index}> 
                    <td className="px-4 py-4 text-sm font-bold text-gray-900 w-[10%]">
                      {pharmacy.drugName} 
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800 text-right w-[10%]">
                      {pharmacy.price}円
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800 w-[20%]">
                      {pharmacy.facilityName}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800 font-medium text-right w-[10%]"> 
                      {pharmacy.distance}km
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800 text-center text-right w-[10%]">
                      {pharmacy.dispenseCount}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800 text-center text-right w-[10%]">
                      {pharmacy.dispenseAmount} 
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800 text-right w-[10%]"> 
                      {pharmacy.lastDispenseDate} 
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Dialog open={isOpenDemoDialog} as="div" className="relative z-[9999] focus:outline-none" onClose={closeDemoDialog}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/60" aria-hidden="true" /> {/* 半透明の背景を追加 */}

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 text-left align-middle shadow-xl
                duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0" // アニメーションクラスをここに
            >
              <DialogTitle as="h3" className="text-lg text-center font-bold leading-6 text-[#00a63e]">
                サービスを利用する施設を選んでください
              </DialogTitle>
              <div className="flex items-start gap-2 mt-4 text-gray-800 text-lg hover:bg-gray-100 hover:rounded-lg">
               {/* アイコンは左に固定、上端に揃える */}
               <UserCircleIcon className="h-14 w-14 text-[#b8e6fe] shrink-0" /> {/* shrink-0 でアイコンが縮まないように調整、mt-1で少し下に */}
               <div className="flex flex-col"> {/* flex-col で子要素を縦並びにする */}
                 <span>テトラ薬局</span> {/* 施設名はspanで囲むか、pタグでも可 */}
                 <p className="mt-1 text-sm text-gray-500"> {/* 住所（注釈） */}
                   福岡県新宮市
                 </p>
               </div>
             </div>
             <div className="flex items-start gap-2 mt-4 text-gray-800 text-lg hover:bg-gray-100 hover:rounded-lg">
               {/* アイコンは左に固定、上端に揃える */}
               <UserCircleIcon className="h-14 w-14 text-[#b8e6fe] shrink-0" /> {/* shrink-0 でアイコンが縮まないように調整、mt-1で少し下に */}
               <div className="flex flex-col"> {/* flex-col で子要素を縦並びにする */}
                 <span>ベタ薬局</span> {/* 施設名はspanで囲むか、pタグでも可 */}
                 <p className="mt-1 text-sm text-gray-500"> {/* 住所（注釈） */}
                   福岡県北九州市
                 </p>
               </div>
             </div>
             <div className="flex items-start gap-2 mt-4 text-gray-800 text-lg hover:bg-gray-100 hover:rounded-lg">
               {/* アイコンは左に固定、上端に揃える */}
               <UserCircleIcon className="h-14 w-14 text-[#b8e6fe] shrink-0" /> {/* shrink-0 でアイコンが縮まないように調整、mt-1で少し下に */}
               <div className="flex flex-col"> {/* flex-col で子要素を縦並びにする */}
                 <span>サヨリ薬局</span> {/* 施設名はspanで囲むか、pタグでも可 */}
                 <p className="mt-1 text-sm text-gray-500"> {/* 住所（注釈） */}
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