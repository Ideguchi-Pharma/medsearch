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
}

export const GroupTable: React.FC<GroupTableProps> = ({ groups, error, searchTerm }) => {
  // 並び替えの状態管理（これは変更なし）
  const [sortColumn, setSortColumn] = useState<keyof allGroup | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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
    <div className="mt-6 w-full overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
      <table className="w-full min-w-[900px] divide-y divide-gray-200 dark:divide-gray-700">
        <GroupTableHead
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* ▼▼▼ ここからが、薬局テーブルのロジックを参考にした新しい表示部分 ▼▼▼ */}
          {error ? (
            <tr><td colSpan={7} className="px-4 py-8 text-center text-red-500">{error.message}</td></tr>
          ) : sortedGroups.length === 0 ? (
            <tr><td colSpan={7} className="px-4 py-8 text-center"><NoDataDisplay message={searchTerm ? "NoData" : "NoData"} /></td></tr>
          ) : (
            sortedGroups.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-4 text-sm font-semibold">
                  {/* グループ名をクリックすると詳細ページに飛ぶようにする */}
                  <Link href={`/medsearch/group/${group.id}`} className="text-blue-600 hover:underline">
                    {group.groupName}
                  </Link>
                </td>
                <td className="px-4 py-4 text-sm">{group.region}</td>
                <td className="px-4 py-4 text-sm text-right">{group.memberCount}</td>
                <td className="px-4 py-4 text-sm">
                    <FormattedDate date={group.updateDate} />
                </td>
                <td className="px-4 py-4 text-sm">{group.status}</td>
                <td className="px-4 py-4 text-sm">
                  <button className="btn btn-sm btn-outline">{group.button}</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};