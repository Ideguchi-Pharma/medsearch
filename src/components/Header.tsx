//全画面共通のヘッダー部分

'use client';

import { useState } from 'react';
import { Button } from '@headlessui/react';
import { UserMenu } from './UserMenu'; // ▼ 新しいコンポーネント
import { FacilitySelectDialog } from './FacilitySelectDialog'; // ▼ 新しいコンポーネント

// 表示するデータをコンポーネントの外に定義
const facilityData = [
  { name: 'テトラ薬局', location: '福岡県新宮市' },
  { name: 'ベタ薬局', location: '福岡県北九州市' },
  { name: 'サヨリ薬局', location: '福岡県糸島市' },
];

const userData = {
  name: 'ファーマ玄人',
  email: 'demosearch@pharmacloud.jp',
  menuItems: [
    { label: 'ホーム', action: () => {} },
    { label: 'アカウントの管理', action: () => {} },
    { label: 'ログアウト', action: () => {} },
  ],
};

interface HeaderProps {
    selectedFacility: string;
    setSelectedFacility: (name: string) => void;
  }

  export default function AppHeader({ selectedFacility, setSelectedFacility }: HeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleFacilitySelect = (facilityName: string) => {
        // 親から受け取った関数を使って状態を更新
        setSelectedFacility(facilityName);
 
    setIsDialogOpen(false); // ダイアログを閉じる
  };

  return (
    <>
      <header className="w-full bg-opacity-50 p-4 backdrop-blur-sm z-10 sticky top-0">
        <div className="flex flex-row items-center gap-2 w-full ml-10 sm:ml-0">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center justify-center px-1 py-1 border border-green-500 rounded-lg text-green-600 font-bold text-sm min-w-[60px] sm:min-w-[80px] cursor-pointer select-none hover-bg"
          >
            {selectedFacility}
          </Button>
          <span className="flex items-center justify-center bg-orange-300 text-xs font-bold px-1 py-1 rounded-lg uppercase min-w-[70px] sm:min-w-[70px] cursor-pointer select-none">
            PREVIEW
          </span>
          <div className="flex items-center justify-center ml-30 sm:ml-auto"> { /* モバイル環境での位置を一時的にml-30で調整 */ }
            {/* ▼ ユーザーメニューを別コンポーネントとして呼び出す */}
            <UserMenu user={userData} />
          </div>
        </div>
      </header>

      {/* ▼ 施設選択ダイアログを別コンポーネントとして呼び出す */}
      <FacilitySelectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        facilities={facilityData}
        onFacilitySelect={handleFacilitySelect}
      />
    </>
  );
}