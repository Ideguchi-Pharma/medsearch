'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/contexts/DataContext';
import type { GroupDetail } from '@/contexts/DataContext';

export default function GroupDetailPage() {
  const params = useParams();
  const groupId = params.id as string;

  const { groupDetails, isLoading, error } = useData();

  const group = isLoading ? null : groupDetails.find(g => g.groupId === groupId);

  if (isLoading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">エラー: {error}</div>;
  if (!group) return <div className="p-8 text-center">グループが見つかりませんでした。</div>;

  const labelMap: Record<keyof GroupDetail, string> = {
    groupId: 'グループID',
    groupName: 'グループ名',
    postCode: '郵便番号',
    address: '地域',
    contactAddress: '連絡先',
    explanation: 'グループの説明',
  };

  return (
    <div className="p-8 text-sm">
      <p className="tracking-[-.01em] text-2xl font-bold">グループの詳細</p>
      <div className="flex flex-row gap-[8px] items-start mb-4">
        <p><Link href="/mypage" className="hover:underline cursor-pointer">マイページ</Link></p>
        <p>・</p>
        <p><Link href="/medsearch/group" className="hover:underline cursor-pointer">グループを探す</Link></p>
        <p>・</p>
        <p className="secondaly-fg">グループの詳細</p>
      </div>

      <div className="mt-8 w-full border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
        <h1 className="font-bold text-lg mb-4">{group.groupName}</h1>
        <div className="space-y-3">
          {Object.keys(group).map((key) => {
            const typedKey = key as keyof GroupDetail;
            if (labelMap[typedKey] && typedKey !== 'groupName' && typedKey !== 'groupId') {
              return (
                <div key={key} className="flex">
                  <span className="min-w-[120px] secondaly-fg">{labelMap[typedKey]}：</span>
                  <span>{group[typedKey]}</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}