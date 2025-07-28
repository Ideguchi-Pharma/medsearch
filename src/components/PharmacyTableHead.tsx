import React from 'react'; 
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'; 
import type { PharmacyData } from '@/hooks/usePharmacyData';

interface TableHeaderItem {
  key: string; 
  label: string; 
  align: 'left' | 'center' | 'right';
  width: string; 
  tooltip?: string; 
}

// Propsの型定義
interface PharmacyTableHeadProps {
  sortColumn: string | null;
  sortOrder: 'asc' | 'desc';
  onSort: (columnKey: keyof PharmacyData) => void;
}

const tableHeaders: TableHeaderItem[] = [
  { key: 'drugName', label: '医薬品名', align: 'left', width: 'min-w-[105px]' }, // 可変
  { key: 'price', label: '薬価', align: 'left', width: 'w-[80px]' }, 
  { key: 'facilityName', label: '施設名', align: 'left', width: 'min-w-[90px] max-w-[150px] sm:max-w-none' }, // 可変（上限あり・折り返し）
  { key: 'distance', label: '距離', align: 'left', width: 'w-[80px]', tooltip: '対象施設までの直線距離' },
  { key: 'dispenseCount', label: '調剤回数', align: 'left', width: 'w-[105px]', tooltip: '月当たりの平均調剤回数' },
  { key: 'dispenseAmount', label: '調剤量', align: 'left', width: 'w-[90px]', tooltip: '月当たりの平均調剤量' },
  { key: 'lastDispenseDate', label: '最終調剤日', align: 'left', width: 'w-[115px]' },
];

// Propsを受け取るように変更
const PharmacyTableHead = ({ sortColumn, sortOrder, onSort }: PharmacyTableHeadProps) => { 
  return (
    <thead className="secondaly-bg">
      <tr>
      {tableHeaders.map((header) => {
            const isSorted = sortColumn === header.key;
            return (
          <th 
            key={header.key} 
            scope="col" 
            className={`
              px-4 py-3 text-xs font-bold uppercase tracking-wider
              ${header.width}
              relative group overflow-visible
              cursor-pointer transition-colors duration-200  
            `}
            onClick={() => onSort(header.key as keyof PharmacyData)} 
          >
            <div className={`
              flex items-center 
              ${header.align === 'right' ? 'justify-end' : 
                header.align === 'center' ? 'justify-center' : 'justify-start'} 
                gap-1 relative w-full h-full
                `}>
              {header.label}
              {/* ソートインジケーター */}
              {isSorted && (
                <span className="ml-1">
                  {sortOrder === 'asc' ? (
                    <ArrowUpIcon className="h-3 w-3" strokeWidth={3} />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3" strokeWidth={3} />
                  )}
                </span>
              )}
              {header.tooltip && (
              <div className="
              absolute top-full left-1/2 -translate-x-1/2 mt-3
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              text-xs rounded-lg py-1 px-2
              whitespace-nowrap z-50
              pointer-events-none tooltip-custom-bg
              ">
            {header.tooltip}
            </div>
              )}
            </div>
          </th>
        );})}
      </tr>
    </thead>
  );
};

export default PharmacyTableHead;