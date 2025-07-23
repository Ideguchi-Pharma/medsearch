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
    </div>
  );
} 