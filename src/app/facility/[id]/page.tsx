'use client';

import { useParams } from 'next/navigation';
import Link from "next/link";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useFacilityData } from '@/hooks/useFacilityData'; 

export default function FacilityDetailPage() {
  const params = useParams();
  const facilityId = params.id as string;

  const { facility, isLoading } = useFacilityData(facilityId);

  if (isLoading) return <div>読み込み中...</div>;
  if (!facility) return <div>施設が見つかりませんでした。</div>;

  const keys = Object.keys(facility);
  const start = keys.indexOf('facilityName');
  const end = keys.indexOf('permitNumber');
  const displayKeys = (start !== -1 && end !== -1) ? keys.slice(start, end + 1) : keys;

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
    <div className="p-8 text-sm">
      <p className="tracking-[-.01em] text-2xl font-bold">施設の詳細</p>
      <div className="flex flex-row gap-[8px] items-start mb-4">
        <p><Link href="/mypage" className="tracking-[-.01em] hover:underline cursor-pointer">マイページ</Link></p>
        <p>・</p>
        <p><Link href="/" className="hover:underline cursor-pointer">在庫状況を調べる</Link></p>
        <p>・</p>
        <p className="secondaly-fg">施設の詳細</p>
      </div>

      <div className="mt-8 w-full border border-gray-200 rounded-2xl shadow-sm p-6">
        <h1 className="font-bold mb-4">{facility['facilityName']}</h1>
        <div className="space-y-3">
        {displayKeys.filter(key => key !== 'facilityName' && key !== 'id' && key !== 'uniqueId').map((key) => (
            <div key={key} className="flex text-sm">
              <span className="min-w-[120px] secondaly-fg">{labelMap[key] || key}：</span>
              <span>{facility[key]}</span>
            </div>
          ))}
        </div>
        <div className="relative flex items-start space-x-2 px-4 py-3 rounded-lg w-full info-bg mt-4">
          <p className="px-0.5 py-0.5 text-sm pl-10 rounded-xl font-[family-name:var(--font-geist-mono)]">開設許可証が登録されていません</p>
          <div className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full w-6 h-6 text-2xl">
            <InformationCircleIcon className="text-cyan-500 dark:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}