'use client';

import Link from 'next/link';
import PharmacyTableHead from './PharmacyTableHead';
import type { PharmacyData } from '@/contexts/DataContext';
import { NoDataDisplay } from '@/components/NoDataDisplay'; 
import dayjs from 'dayjs';

interface PharmacyTableProps {
  loadingError: string | null;
  pharmacyData: PharmacyData[];
  sortColumn: keyof PharmacyData | null;
  sortOrder: 'asc' | 'desc';
  onSort: (columnKey: keyof PharmacyData) => void;
  isCompact: boolean;
  searchTerm: string; 
  totalRows: number;   
}

export default function PharmacyTable({
  loadingError,
  pharmacyData,
  sortColumn,
  sortOrder,
  onSort,
  isCompact,
  searchTerm, 
  totalRows,    
}: PharmacyTableProps) {
  return (
    <div className="mt-6 w-full overflow-x-auto border border-gray-200 dark:border-gray-700">
      <table className="w-full min-w-[900px] divide-y divide-gray-200 dark:divide-gray-700">
        <PharmacyTableHead
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onSort={onSort}
        />
        <tbody>
          {loadingError ? (
            <tr><td colSpan={7} className="text-center py-8 text-red-500">データの読み込み中にエラーが発生しました。</td></tr>
          ) : searchTerm.length < 2 ? (
            <tr><td colSpan={7}><NoDataDisplay message="NoData" /></td></tr>
          ) : totalRows === 0 ? (
            <tr><td colSpan={7}><NoDataDisplay message="NoData" /></td></tr>
          ) : (
            pharmacyData.map((pharmacy, index) => (
              <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className={`px-4 text-sm font-bold min-w-[105px] ${isCompact ? 'py-3' : 'py-6'}`}>{pharmacy.drugName}</td>
                <td className={`px-4 text-sm w-[80px] ${isCompact ? 'py-3' : 'py-6'} text-right`}>{pharmacy.price}円</td>
                <td className={`px-4 text-sm min-w-[90px] max-w-[150px] ${isCompact ? 'py-3' : 'py-6'} sm:max-w-none`}>
                  <Link href={`/facility/${pharmacy.facilityId}`} className="button-fg font-semibold rounded-md py-2 sm:px-1">
                    {pharmacy.facilityName}
                  </Link>
                </td>
                <td className={`px-4 text-sm font-medium text-right w-[80px] ${isCompact ? 'py-3' : 'py-6'}`}>{pharmacy.distance}km</td>
                <td className={`px-4 text-sm text-right w-[105px] ${isCompact ? 'py-3' : 'py-6'}`}>{pharmacy.dispenseCount}</td>
                <td className={`px-4 text-sm text-right w-[90px] ${isCompact ? 'py-3' : 'py-6'}`}>{pharmacy.dispenseAmount}</td>
                <td className={`px-4 text-sm text-right w-[115px] ${isCompact ? 'py-3' : 'py-6'}`}>
                {dayjs(pharmacy.lastDispenseDate).format('YYYY/MM/DD')}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}