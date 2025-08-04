'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useGroupContext } from '@/contexts/GroupDataContext';
import { allGroup } from '@/hooks/useGroupData';

export default function GroupDetailPage() {
  const params = useParams();
  const groupId = params.id as string;
  const { groups, loading } = useGroupContext();

  // URLのIDと一致するグループ情報を探す
  const group: allGroup | undefined = groups.find(g => g.id === groupId);

  if (loading) return <div>読み込み中...</div>;
  if (!group) return <div>グループが見つかりませんでした。</div>;

  // 表示したい項目を定義
  const labelMap: Record<keyof allGroup, string> = {
    id: 'グループID',
    groupName: 'グループ名',
    region: '地域',
    memberCount: '参加施設数',
    updateDate: '最終更新日',
    status: '参加ステータス',
    button: '', // ボタンは表示しない
  };

  return (
    <div className="p-8 text-sm">
      <p className="tracking-[-.01em] text-2xl font-bold">グループの詳細</p>
      <div className="flex flex-row gap-[8px] items-start mb-4">
        <p className="tracking-[-.01em]"><Link href="/mypage" className="hover:underline cursor-pointer">マイページ</Link></p>
        <p>・</p>
        <p><Link href="/medsearch/group" className="hover:underline cursor-pointer">グループを探す</Link></p>
        <p>・</p>
        <p className="secondaly-fg">グループの詳細</p>
      </div>

      <div className="mt-8 w-full border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
        <h1 className="font-bold text-lg mb-4">{group.groupName}</h1>
        <div className="space-y-3">
          {Object.keys(group).map((key) => {
            // allGroupのキーとして有効かチェック
            if (key in labelMap && labelMap[key as keyof allGroup]) {
              return (
                <div key={key} className="flex">
                  <span className="min-w-[120px] secondaly-fg">{labelMap[key as keyof allGroup]}：</span>
                  <span>{group[key as keyof allGroup]}</span>
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