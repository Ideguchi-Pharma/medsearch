'use client';

import Link from 'next/link';
import Image from 'next/image';
import PharmacyTableHead from './PharmacyTableHead';
import type { PharmacyData } from '@/hooks/usePharmacyData'; // 型定義をインポート

// NoDataDisplayコンポーネントをこちらに移動
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

// この部品が必要とする道具（Props）の設計図
interface PharmacyTableProps {
  loadingError: string | null;
  searchTerm: string;
  filteredPharmacyData: PharmacyData[];
  sortColumn: keyof PharmacyData | null;
  sortOrder: 'asc' | 'desc';
  onSort: (columnKey: keyof PharmacyData) => void;
  isCompact: boolean; // isCompact プロパティ
}

// これが検索結果の表専門の部品です
export default function PharmacyTable({
  loadingError,
  searchTerm,
  filteredPharmacyData,
  sortColumn,
  sortOrder,
  onSort,
  isCompact, // isCompact を受け取る
}: PharmacyTableProps) {
  return (
    <div className="mt-6 w-full overflow-x-auto border border-gray-200 dark:border-gray-700">
      <table className="w-full min-w-[900px] divide-y divide-gray-200 dark:divide-gray-700">
        <PharmacyTableHead
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onSort={onSort}
        />
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {loadingError ? (
            <tr><td colSpan={7} className="px-4 py-8 text-center">{loadingError}</td></tr>
          ) : searchTerm.length < 2 ? (
            <tr><td colSpan={7} className="px-4 py-8 text-center"><NoDataDisplay message="No Data" /></td></tr>
          ) : filteredPharmacyData.length === 0 ? (
            <tr><td colSpan={7} className="px-4 py-8 text-center"><NoDataDisplay message="No Data" /></td></tr>
          ) : (
            filteredPharmacyData.map((pharmacy, index) => (
              <tr key={index}>
                <td className={`px-4 text-sm font-bold min-w-[105px] ${isCompact ? 'py-3' : 'py-6'}`}>{pharmacy.drugName}</td>
                <td className={`px-4 text-sm w-[80px] ${isCompact ? 'py-3' : 'py-6'} text-right`}>{pharmacy.price}円</td>
                <td className={`px-4 text-sm min-w-[90px] max-w-[150px] ${isCompact ? 'py-3' : 'py-6'} sm:max-w-none`}>
                  <Link href={`/facility/${encodeURIComponent(pharmacy.facilityName)}`} className="text-green-600 font-bold hover-bg rounded-md py-1">
                    {pharmacy.facilityName}
                  </Link>
                </td>
                <td className={`px-4 text-sm font-medium text-right w-[80px] ${isCompact ? 'py-3' : 'py-6'}`}>{pharmacy.distance}km</td>
                <td className={`px-4 text-sm text-right w-[105px] ${isCompact ? 'py-3' : 'py-6'}`}>{pharmacy.dispenseCount}</td>
                <td className={`px-4 text-sm text-right w-[90px] ${isCompact ? 'py-3' : 'py-6'}`}>{pharmacy.dispenseAmount}</td>
                <td className={`px-4 text-sm text-right w-[115px] ${isCompact ? 'py-3' : 'py-6'}`}>{pharmacy.lastDispenseDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}