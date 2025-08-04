'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { allGroup } from '@/hooks/useGroupData';
import GroupTableHead from './GroupTableHead'; // ヘッダー部品
import FormattedDate from './FormattedDate';

// データがない時に表示する専用の部品
const NoDataDisplay = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-8">
    <Image
      src="https://stage.pharmacloud.jp/assets/illustrations/illustration_empty_content.svg"
      alt="No Data"
      width={200}
      height={200}
      className="mb-4 opacity-50"
    />
    <p className="text-lg font-bold text-gray-500">{message}</p>
  </div>
);

// この部品が必要とする道具（Props）の型を定義
interface GroupTableProps {
  groups: allGroup[];
  error: Error | null;
  searchTerm: string;
  isCompact: boolean;
}

export const GroupTable: React.FC<GroupTableProps> = ({ groups, error, searchTerm, isCompact }) => {
  // 並び替えの状態管理（これは変更なし）
  const [sortColumn, setSortColumn] = useState<keyof allGroup | null>('status');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // 並び替えの操作（これも変更なし）
  const handleSort = (columnKey: keyof allGroup) => {
    if (sortColumn === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortOrder('asc');
    }
  };

  // データの並び替え（これも変更なし）
  const sortedGroups = useMemo(() => {
    if (!sortColumn) return groups;
    return [...groups].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [groups, sortColumn, sortOrder]);

  return (
    <div className="mt-6 w-full overflow-x-auto border border-gray-200 dark:border-gray-700">
      <table className="w-full min-w-[900px] divide-y divide-gray-200 dark:divide-gray-700">
        <GroupTableHead
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
        <tbody>
          {error ? (
            <tr><td colSpan={7} className="px-4 py-8 text-center text-red-500">{error.message}</td></tr>
          ) : sortedGroups.length === 0 ? (
            <tr><td colSpan={7} className="px-4 py-8 text-center"><NoDataDisplay message={searchTerm ? "NoData" : "NoData"} /></td></tr>
          ) : (
            sortedGroups.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className={`px-4 text-sm font-semibold ${isCompact ? 'py-1.5' : 'py-3'}`}>
                  <Link href={`/medsearch/group/${group.id}`} className="button-fg">
                    {group.groupName}
                  </Link>
                </td>
                <td className={`px-4 text-sm ${isCompact ? 'py-1.5' : 'py-3'}`}>{group.region}</td>
                <td className={`px-4 text-center ${isCompact ? 'py-1.5' : 'py-3'}`}>
                    <span className={`
                    inline-flex items-center justify-center 
                    rounded-full bg-[#3366FF] text-white text-sm
                    ${group.memberCount >= 10 ? 'h-8 px-3.5' : 'h-8 w-8'}
                    `}>
                        {group.memberCount}
                    </span>
                </td>
                <td className={`px-4 text-sm ${isCompact ? 'py-1.5' : 'py-3'}`}>
                    <FormattedDate date={group.updateDate} />
                </td>
                <td className={`pl-6 ${isCompact ? 'py-1.5' : 'py-3'}`}>
                    {group.status && (
                        <span className={`
                            text-sm px-4 py-3 rounded-full
                            ${group.status === "申請中" ? 'bg-orange-400' : ''}
                            ${group.status === "参加中" ? 'bg-[#00B8D9] text-white' : ''}
                            `}>
                                {group.status}
                        </span>
                    )}
                </td>
                <td className={`text-sm ${isCompact ? 'py-1.5' : 'py-3'}`}>
                    {!group.status && (
                        <button className="px-4 py-2 rounded-xl border-1 border-green-500 button-fg font-semibold cursor-pointer">
                            参加
                        </button>
                    )}
                    {(group.status === '申請中' || group.status === '参加中') && (
                        <button className="px-4 py-2 rounded-xl border-1 border-gray-500 font-semibold cursor-pointer">
                            解除
                        </button>
                    )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};