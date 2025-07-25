'use client';

import { useState, useEffect } from 'react';
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
  name: 'ファーマ次郎',
  email: 'demo@pharmacloud.jp',
  menuItems: [
    { label: 'ホーム', action: () => {} },
    { label: 'アカウントの管理', action: () => {} },
    { label: 'ログアウト', action: () => {} },
  ],
};

export default function AppHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState('デモ薬局');

  // 1. コンポーネントが最初に読み込まれた時に localStorage から値を取得する
  useEffect(() => {
    const savedFacility = localStorage.getItem('selectedFacility');
    if (savedFacility) {
      setSelectedFacility(savedFacility);
    }
  }, []); // 空の配列を渡すことで、最初の1回だけ実行されます

  // 2. selectedFacility の値が変わるたびに localStorage に保存する
  useEffect(() => {
    localStorage.setItem('selectedFacility', selectedFacility);
  }, [selectedFacility]);

  // 施設が選択されたときの処理
  const handleFacilitySelect = (facilityName: string) => {
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
          <div className="flex items-center justify-center ml-auto">
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