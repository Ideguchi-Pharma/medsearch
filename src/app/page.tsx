'use client';

import Link from 'next/link';
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import SearchControls from '@/components/SearchControls';
import PharmacyTable from '@/components/PharmacyTable';
import PaginationControls from '@/components/PaginationControls';
import { usePharmacySearch } from "@/hooks/usePharmacySearch";

export default function Home() {
  const {
    searchTerm,
    setSearchTerm,
    selectedGroup,
    setSelectedGroup,
    groups,
    loadingError,
    sortColumn,
    sortOrder,
    handleSort,
    isCompact,
    setIsCompact,
    paginatedData,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalRows,
  } = usePharmacySearch();

  return (
    <div className="p-8">
      <p className="
      tracking-[-.01em] text-2xl font-bold 
      ">
        メドサーチ
      </p>
      <div className="flex flex-row gap-3 pt-3">
        <Link href={"/mypage"} className="
        tracking-[-.01em] mb-8 hover:underline
        ">
          マイページ
        </Link>
        <p className="
        tracking-[-.01em] mb-8
        ">
          ・
        </p>
        <p className="
        tracking-[-.01em] mb-8
        ">
          メドサーチ
        </p>
      </div>

      <div className="w-full border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xs pb-4">

        <div className="
        relative flex items-start 
        space-x-2 px-4 py-3 rounded-t-2xl rounded-b-lg w-full info-bg
        ">
          <p className="
          px-0.5 py-0.5 
          text-sm  pl-10 
          rounded-2xl font-[family-name:var(--font-geist-mono)]
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
          groups={groups}
        />
        
        <PharmacyTable
          loadingError={loadingError}
          pharmacyData={paginatedData}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onSort={handleSort}
          isCompact={isCompact}
          searchTerm={searchTerm}
          totalRows={totalRows}
        />
        {searchTerm.length >= 2 && totalRows > 0 && (
          <PaginationControls
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalRows={totalRows}
            isCompact={isCompact}
            setIsCompact={setIsCompact} 
          />
        )}
      </div>
    </div>
  );
}