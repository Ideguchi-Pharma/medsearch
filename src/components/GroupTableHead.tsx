///グループを探すページ内のテーブルヘッド部分

import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { AllGroup } from '@/contexts/DataContext'; // データの型をインポート

// ヘッダーの各項目の「設計図」の型を定義
interface TableHeaderItem {
  key: keyof AllGroup; // どのデータ項目に対応するか
  label: string;       // 画面に表示する名前
  width: string;       // 列の幅
}

// ヘッダーに表示したい項目のリストを作成
const tableHeaders: TableHeaderItem[] = [
  { key: 'groupName',   label: 'グループ名',    width: 'w-[300px]' },
  { key: 'region',      label: '地域',         width: 'w-[230px]' },
  { key: 'memberCount', label: '参加数',    width: 'w-[90px]' },
  { key: 'updateDate',  label: '更新日',       width: 'w-[140px]' },
  { key: 'status',      label: 'ステータス',    width: 'w-[180px]' },
  { key: 'button',      label: '',         width: 'w-[110px]' },
];

// この部品が必要とする道具（Props）の型を定義
interface GroupTableHeadProps {
  sortColumn: keyof AllGroup | null;
  sortOrder: 'asc' | 'desc';
  onSort: (columnKey: keyof AllGroup) => void;
}

const GroupTableHead = ({ sortColumn, sortOrder, onSort }: GroupTableHeadProps) => {
  return (
    <thead className="secondaly-bg secondaly-fg">
      <tr>
        {tableHeaders.map((header) => (
          <th
            key={header.key}
            scope="col"
            className={`
                px-6 py-3 text-sm font-bold uppercase tracking-wider 
                ${header.width}
                relative group overflow-visible
                cursor-pointer transition-colors duration-200  
              `}
            onClick={() => onSort(header.key)}
          >
            <div className="flex items-center gap-1">
              {header.label}
              {/* ソート中の列に矢印を表示 */}
              {sortColumn === header.key && (
                <span className="ml-1">
                  {sortOrder === 'asc' 
                    ? <ArrowUpIcon className="h-3 w-3" strokeWidth={3} /> 
                    : <ArrowDownIcon className="h-3 w-3" strokeWidth={3} />}
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default GroupTableHead;