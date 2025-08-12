//表示するデータがない売場合にテーブル画面に表示する内容

'use client';

import Image from 'next/image';

// Propsの設計図
interface NoDataDisplayProps {
  message: string;
}

// これが独立した NoDataDisplay コンポーネントです
export const NoDataDisplay = ({ message }: NoDataDisplayProps) => (
  <div className="flex flex-col items-center justify-center py-8">
    <Image
      src="https://stage.pharmacloud.jp/assets/illustrations/illustration_empty_content.svg"
      alt="No Data"
      width={250}
      height={250}
      className="mb-4 opacity-50"
    />
    <p className="text-lg font-bold">{message}</p>
  </div>
);