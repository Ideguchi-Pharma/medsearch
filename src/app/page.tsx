'use client';

import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; 
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { usePharmacyData, PharmacyData } from "@/hooks/usePharmacyData"; // 作成したカスタムフックを読み込む
import SearchControls from '@/components/SearchControls';
import PharmacyTable from '@/components/PharmacyTable';
import { GROUPS } from '@/data/constants';
import { useFilteredPharmacies } from '@/hooks/useFilteredPharmacies';
import PaginationControls from '@/components/PaginationControls';

dayjs.locale('ja'); 
dayjs.extend(customParseFormat);

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>(''); // デフォルト値を設定
  const [selectedGroup, setSelectedGroup] = useState({ id: '', name: 'Group' });
  const [isMounted, setIsMounted] = useState(false); // マウント状態を管理するフラグ
  const [sortColumn, setSortColumn] = useState<keyof PharmacyData | null>(null); // ソート状態のState
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { pharmacyData, loadingError } = usePharmacyData();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // デフォルトは5件

 // マウント時に一度だけ実行し、isMountedフラグをtrueに設定します
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // マウント後にsessionStorageから値を復元
  useEffect(() => {
        if (isMounted) {
      const savedSearchTerm = sessionStorage.getItem('searchTerm') || '';
      const savedGroup = sessionStorage.getItem('selectedGroup');
      setSearchTerm(savedSearchTerm);
      if (savedGroup) {
        setSelectedGroup(JSON.parse(savedGroup));
      }
        }
        }, [isMounted]);
  useEffect(() => {
          if (isMounted) sessionStorage.setItem('searchTerm', searchTerm);
        }, [searchTerm, isMounted]);
  useEffect(() => {
          if (isMounted) sessionStorage.setItem('selectedGroup', JSON.stringify(selectedGroup));
        }, [selectedGroup, isMounted]);
        const filteredPharmacyData = useFilteredPharmacies(pharmacyData, searchTerm, sortColumn, sortOrder);
        // 表示するデータを現在のページに合わせて切り出す
        const paginatedData = filteredPharmacyData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
        );
  // ソートハンドラ
  const handleSort = (columnKey: keyof PharmacyData) => {
    if (sortColumn === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortOrder('asc');
    }
  };

  return (
           <div className="p-8">
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

            <div className="w-full border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm pb-4">

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
             <div className="w-full h-px bg-gray-100 dark:bg-gray-700 my-3"></div>

        <SearchControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        groups={GROUPS}
        />
        <PharmacyTable
        loadingError={loadingError}
        searchTerm={searchTerm}
        filteredPharmacyData={paginatedData}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        onSort={handleSort}
        />
        {filteredPharmacyData.length > 0 && (
        <PaginationControls
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalRows={filteredPharmacyData.length}
        />
      )}
       </div>
    </div>
  );
}