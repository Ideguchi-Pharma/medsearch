import React from 'react'; 

interface TableHeaderItem {
  key: string; 
  label: string; 
  align: 'left' | 'center' | 'right';
  width: string; 
  tooltip?: string; 
}

const tableHeaders: TableHeaderItem[] = [
  { key: 'drugName', label: '医薬品名', align: 'left', width: 'w-[20%]' },
  { key: 'price', label: '薬価', align: 'left', width: 'w-[10%]' },
  { key: 'facilityName', label: '施設名', align: 'left', width: 'w-[20%]' },
  { key: 'distance', label: '距離', align: 'center', width: 'w-[15%]', tooltip: '対象施設までの直線距離' },
  { key: 'dispenseCount', label: '調剤回数', align: 'center', width: 'w-[10%]', tooltip: '月当たりの平均調剤回数' },
  { key: 'dispenseAmount', label: '調剤量', align: 'center', width: 'w-[10%]', tooltip: '月当たりの平均調剤量' },
  { key: 'lastDispenseDate', label: '最終調剤日', align: 'right', width: 'w-[15%]' },
];


const PharmacyTableHead = () => { 
  return (
    <thead className="bg-gray-100">
      <tr>
      {tableHeaders.map((header) => {
            return (
          <th 
            key={header.key} 
            scope="col" 
            className={`
              px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider
              ${header.width}
              relative group overflow-visible
            `}
          >
            <div className={`flex items-center ${header.align === 'right' ? 'justify-end' : header.align === 'center' ? 'justify-center' : 'justify-start'} gap-1 relative w-full h-full`}>
              {header.label}
              {header.tooltip && (
              <div className="
              absolute top-full left-1/2 -translate-x-1/2 mt-3
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              bg-gray-800 text-white text-xs rounded-lg py-1 px-2
              whitespace-nowrap z-50
              pointer-events-none
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