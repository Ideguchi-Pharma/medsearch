// src/components/PharmacyTableHead.tsx

import React from 'react';

import { FiArrowUp } from "react-icons/fi"; // ソートアイコン用

// 必要であれば、ヘッダー項目の型定義もここに
interface TableHeaderItem {
  key: string; // データのキー (例: 'pharmacyName')
  label: string; // 表示名 (例: '医薬品名')
  align: 'left' | 'center' | 'right'; // テキストの配置
  width: string; // Tailwindの幅クラス (例: 'w-[20%]')
  sortable?: boolean; // ソート可能かどうか
}

const tableHeaders: TableHeaderItem[] = [
  { key: 'pharmacyName', label: '医薬品名', align: 'left', width: 'w-[20%]' },
  { key: 'price', label: '薬価', align: 'left', width: 'w-[10%]' },
  { key: 'facilityName', label: '施設名', align: 'left', width: 'w-[20%]' },
  { key: 'distance', label: '距離', align: 'left', width: 'w-[15%]', sortable: true }, // ソート可能
  { key: 'dispenseCount', label: '調剤回数', align: 'center', width: 'w-[10%]' },
  { key: 'dispenseVolume', label: '調剤量', align: 'center', width: 'w-[10%]' },
  { key: 'lastDispenseDate', label: '最終調剤日', align: 'right', width: 'w-[15%]' },
];

const PharmacyTableHead = () => { 
  return (
    <thead className="bg-gray-100">
      <tr>
        {tableHeaders.map((header) => (
          <th 
            key={header.key} 
            scope="col" 
            className={`
              px-4 py-3 text-${header.align} text-xs font-bold text-gray-600 uppercase tracking-wider 
              ${header.width} 
              ${header.sortable ? 'flex items-center gap-1 cursor-pointer' : ''}
            `}
            // onClick={header.sortable ? () => onSort(header.key) : undefined} // ソート機能の実装
          >
            {header.label}
            {header.sortable && (
              <div className="flex flex-col text-xs">
                {/* ソート方向に応じてFiArrowUp / FiArrowDown を切り替える */}
                <FiArrowUp /> 
              </div>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default PharmacyTableHead;