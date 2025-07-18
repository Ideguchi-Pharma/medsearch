'use client';

import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Link from "next/link";
import { Button, Menu, MenuButton, MenuItems, MenuItem, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { InformationCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function FacilityInformationPage() {
  const [data, setData] = useState<any[]>([]);
  const [isOpenDemoDialog, setIsOpenDemoDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/PharmacyData.xlsx');
      const arrayBuffer = await res.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[1]; // 2シート目
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setData(json as any[]);
    };
    fetchData();
  }, []);

  if (!data.length) return <div>読み込み中...</div>;

  const columns = Object.keys(data[0]);
  return (
    <div className="w-full flex-col min-h-screen">
      <header className="w-full bg-opacity-50 p-4 shadow-sm fixed top-0 z-50 backdrop-blur-sm">
        <div className="flex flex-row items-center gap-2 w-full ml-10 sm:ml-0">
          <Button
            onClick={() => setIsOpenDemoDialog(true)}
            className="flex items-center justify-center px-1 py-1 border border-green-500 rounded-lg text-green-600 font-bold text-sm min-w-[60px] sm:min-w-[80px] cursor-pointer select-none hover-none"
          >
            デモ薬局
          </Button>
          <span className="flex items-center justify-center bg-orange-300 text-xs font-bold px-1 py-1 rounded-lg uppercase min-w-[70px] sm:min-w-[70px] cursor-pointer select-none">
            PREVIEW
          </span>
          <div className="flex items-center justify-center">
            <Menu>
              <MenuButton className="flex items-center justify-center w-8 h-8 rounded-full text-xs shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white secondaly-bg">
                出口
              </MenuButton>
              <MenuItems transition anchor="bottom end" className="origin-top-right rounded-xl border border-gray-200 p-1 text-sm/6 shadow-lg ring-none ring-black ring-opacity-5 transition duration-100 ease-out secondaly-bg [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 z-[9999]">
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
      <main className="w-full flex flex-col gap-[8px] row-start-1 items-start p-8 sm:items-start mt-[64px]">
        <p className="tracking-[-.01em] text-2xl font-bold">メドサーチ</p>
        <p className="tracking-[-.01em] mb-8">マイページ ・ メドサーチ</p>
        <div className="mt-8 w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full min-w-[900px] divide-y divide-gray-200">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col} className="border px-4 py-2 bg-gray-100">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {columns.map((col) => (
                    <td key={col} className="border px-4 py-2">{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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