'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import * as XLSX from 'xlsx';
import Link from "next/link";
import { Button, Menu, MenuButton, MenuItems, MenuItem, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { InformationCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function FacilityDetailPage() {
  const params = useParams();
  const facilityName = decodeURIComponent(params.facilityName as string);
  const [facility, setFacility] = useState<any>(null);
  const [isOpenDemoDialog, setIsOpenDemoDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/PharmacyData.xlsx');
      const arrayBuffer = await res.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[1];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const found = data.find((item: any) => item.facilityName === facilityName);
      setFacility(found);
    };
    fetchData();
  }, [facilityName]);

  if (!facility) return <div>読み込み中...</div>;

  // facilityName～permitNumberまでのカラムのみ抽出
  const keys = Object.keys(facility);
  const start = keys.indexOf('facilityName');
  const end = keys.indexOf('permitNumber');
  const displayKeys = (start !== -1 && end !== -1)
    ? keys.slice(start, end + 1)
    : keys;

  // カラム名と表示名のマッピング
  const labelMap: Record<string, string> = {
    facilityNumber: '医療機関番号',
    postCode: '郵便番号',
    address: '住所',
    telNumber: '電話番号',
    faxNumber: 'FAX番号',
    hpAddress: 'ホームページ',
    permitNumber: '開設許可番号',
  };

  return (
    <div className="w-full flex-col min-h-screen">
      <header className="
      w-full bg-opacity-50 p-4 
      fixed top-0 z-50 
      backdrop-blur-sm
      ">
        <div className="flex flex-row items-center gap-2 w-full ml-10 sm:ml-0">
          <Button
            onClick={() => setIsOpenDemoDialog(true)}
            className="
            flex items-center justify-center 
            px-1 py-1 border border-green-500 
            rounded-lg text-green-600 font-bold 
            text-sm min-w-[60px] sm:min-w-[80px] 
            cursor-pointer select-none hover-none
            ">
            デモ薬局
          </Button>
          <span className="
          flex items-center justify-center 
          bg-orange-300 text-xs 
          font-bold px-1 py-1 rounded-lg 
          uppercase min-w-[70px] sm:min-w-[70px] 
          cursor-pointer select-none
          ">
            PREVIEW
          </span>
          <div className="flex items-center justify-center">
            <Menu>
              <MenuButton className="
              flex items-center justify-center 
              w-8 h-8 rounded-full text-xs 
              shadow-inner shadow-white/10 
              focus:not-data-focus:outline-none 
              data-focus:outline data-focus:outline-white 
              secondaly-bg cursor-pointer
              ">
                出口
              </MenuButton>
              <MenuItems transition anchor="bottom end" 
               className="
               origin-top-right rounded-xl 
               border border-gray-200 
               p-1 text-sm/6 shadow-lg 
               ring-none ring-black ring-opacity-5 
               transition duration-100 ease-out 
               secondaly-bg [--anchor-gap:--spacing(1)] 
               focus:outline-none data-closed:scale-95 
               data-closed:opacity-0 z-[9999]
               ">
                <MenuItem>
                  <p className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5">出口大靖</p>
                </MenuItem>
                <MenuItem>
                  <p className="group flex w-full items-center rounded-lg px-3">ideguchi@pharmacloud.jp</p>
                </MenuItem>
                <div className="my-1 h-px" />
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5">ホーム</button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5">アカウントの管理</button>
                </MenuItem>
                <div className="my-1 h-px" />
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5">ログアウト</button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </header>
      <main className="
      w-full flex flex-col gap-[8px] 
      row-start-1 items-start p-8 
      sm:items-start mt-[64px] text-sm
      ">
        <p className="
        tracking-[-.01em] text-2xl font-bold
        ">
            施設の詳細
        </p>
        <div className="
        w-full flex flex-row gap-[8px] 
        row-start-1 items-start 
        sm:items-start
        ">
        <p className="
        tracking-[-.01em] mb-4
        ">
            マイページ
        </p>
        <p className="mb-4">
            ・
        </p>
        <p>
            <Link href="/" className="mb-4 hover:underline cursor-pointer">
            在庫状況を調べる
            </Link>
        </p>
        <p className="mb-4">
            ・
        </p>
        <p className="mb-4 secondaly-fg">
            施設の詳細
        </p>
        </div>
        {/* 施設情報ページ */}
        <div className="mt-8 w-full border border-gray-200 rounded-lg shadow-sm p-6">
          {/* facilityName */}
          <h1 className="
          font-bold mb-4
          ">
            {facility['facilityName']}
          </h1>
          <div className="space-y-3">
            {displayKeys
              .filter(key => key !== 'facilityName')
              .map((key) => (
                <div key={key} className="flex text-sm">
                  <span className="
                  min-w-[120px] secondaly-fg
                  ">
                    {labelMap[key] || key}：
                  </span>
                  <span>
                    {facility[key]}
                  </span>
                </div>
            ))}
          </div>
          <div className="
            relative flex items-start 
            space-x-2 px-4 py-3 rounded-lg w-full info-bg mt-4
            ">
             <p className="
             px-0.5 py-0.5 
             text-sm  pl-10 
             rounded font-[family-name:var(--font-geist-mono)]
             ">
             開設許可証が登録されていません
             </p>
              <div className="
              absolute left-5 top-6 -translate-y-1/2 
              rounded-full w-6 h-6 text-2xl
              ">
              <InformationCircleIcon className="text-cyan-500 dark:text-white" />
              </div>
            </div>
        </div>
      </main>
      <Dialog open={isOpenDemoDialog} as="div" className="relative z-[9999] focus:outline-none" onClose={() => setIsOpenDemoDialog(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel transition className="w-full max-w-md rounded-xl p-6 text-left align-middle shadow-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 secondaly-bg">
              <DialogTitle as="h3" className="text-lg text-center font-bold leading-6">サービスを利用する施設を選んでください</DialogTitle>
              <div className="flex items-start gap-2 mt-4 text-lg hover:rounded-lg hover-bg">
                <UserCircleIcon className="h-14 w-14 shrink-0" />
                <div className="flex flex-col">
                  <span>テトラ薬局</span>
                  <p className="mt-1 text-sm">福岡県新宮市</p>
                </div>
              </div>
              <div className="flex items-start gap-2 mt-4 text-lg hover: hover:rounded-lg hover-bg">
                <UserCircleIcon className="h-14 w-14 shrink-0" />
                <div className="flex flex-col">
                  <span>ベタ薬局</span>
                  <p className="mt-1 text-sm">福岡県北九州市</p>
                </div>
              </div>
              <div className="flex items-start gap-2 mt-4 text-lg hover: hover:rounded-lg hover-bg">
                <UserCircleIcon className="h-14 w-14 shrink-0" />
                <div className="flex flex-col">
                  <span>サヨリ薬局</span>
                  <p className="mt-1 text-sm">福岡県糸島市</p>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
} 