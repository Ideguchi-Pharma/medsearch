'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // useRouterをインポート

// 各入力フィールドの状態を管理するためのカスタムフック
const useFormState = () => {
  const [groupName, setGroupName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [prefecture, setPrefecture] = useState('');
  const [city, setCity] = useState('');
  const [addressLine1, setAddressLine1] = useState(''); // addressLine1を追加
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter(); // useRouterフックを使用

  // フォーム送信時の処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 新しいグループのIDをランダムに生成
    const groupId = crypto.randomUUID();

    const formData = { 
      groupId,
      groupName, 
      postalCode, 
      prefecture, 
      city, 
      addressLine1,
      contact, 
      description 
    };

    try {
      // APIエンドポイントにPOSTリクエストを送信
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // typeとdataをオブジェクトで囲んで送信
        body: JSON.stringify({ type: 'group', data: formData }),
      });

      if (!response.ok) {
        // エラーレスポンスの場合は例外をスロー
        throw new Error('グループの作成に失敗しました。');
      }

      // 成功した場合の処理
      const result = await response.json();
      console.log("作成成功:", result);
      alert('グループが正常に作成されました！');
      // グループ一覧ページにリダイレクト
      window.location.href = '/medsearch/group';

    } catch (error) {
      console.error("作成失敗:", error);
      alert((error as Error).message);
    }
  };

  return {
    groupName, setGroupName,
    postalCode, setPostalCode,
    prefecture, setPrefecture,
    city, setCity,
    addressLine1, setAddressLine1,
    contact, setContact,
    description, setDescription,
    handleSubmit,
  };
};

export default function GroupCreatePage() {
  const form = useFormState();

  return (
    <div className="p-8">
      {/* ページタイトルとパンくずリスト */}
      <p className="tracking-[-.01em] text-2xl font-bold">
        グループの登録
      </p>
      <div className="flex flex-row gap-3 pt-3 mb-8">
        <Link href={"/mypage"} className="tracking-[-.01em] hover:underline">
          マイページ
        </Link>
        <p>・</p>
        <p className="secondaly-fg">グループの登録</p>
      </div>

      {/* フォーム全体 */}
      <form onSubmit={form.handleSubmit}>
        {/* 上段の入力エリア */}
        <div className="w-full p-6 space-y-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* グループ名 */}
            <div className="md:col-span-2">
              <label htmlFor="groupName" className="block text-sm font-medium mb-1"></label>
              <input
                id="groupName"
                type="text"
                placeholder="グループ名"
                value={form.groupName}
                onChange={(e) => form.setGroupName(e.target.value)}
                className="w-full p-4 border rounded-md focus:outline-none"
                required // 入力必須にする
              />
            </div>
            {/* 郵便番号 */}
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium mb-1"></label>
              <div className="flex items-center gap-2">
                <input
                  id="postalCode"
                  type="text"
                  placeholder="郵便番号"
                  value={form.postalCode}
                  onChange={(e) => form.setPostalCode(e.target.value)}
                  className="w-full p-4 border rounded-md focus:outline-none"
                />
                <button type="button" className="p-4 font-semibold border button-fg rounded-md hover-bg whitespace-nowrap">
                  反映
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 都道府県 */}
            <div>
              <label htmlFor="prefecture" className="block text-sm font-medium mb-1"></label>
              <input
                id="prefecture"
                type="text"
                placeholder="都道府県"
                value={form.prefecture}
                onChange={(e) => form.setPrefecture(e.target.value)}
                className="w-full p-4 border rounded-md focus:outline-none"
              />
            </div>
            {/* 市区町村 */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1"></label>
              <input
                id="city"
                type="text"
                placeholder="市区町村"
                value={form.city}
                onChange={(e) => form.setCity(e.target.value)}
                className="w-full p-4 border rounded-md focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="addressLine1" className="block text-sm font-medium mb-1"></label>
            <input
              id="addressLine1"
              type="text"
              placeholder="住所(町名・番地等)"
              value={form.addressLine1}
              onChange={(e) => form.setAddressLine1(e.target.value)}
              className="w-full p-4 border rounded-md focus:outline-none"
            />
          </div>
          {/* 連絡先 */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium mb-1"></label>
            <input
              id="contact"
              type="text"
              placeholder="連絡先"
              value={form.contact}
              onChange={(e) => form.setContact(e.target.value)}
              className="w-full p-4 border rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* 下段の入力エリア */}
        <div className="w-full p-6 mt-6 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
          <label htmlFor="description" className="block text-sm font-medium mb-1"></label>
          <input
            id="description"
            type="text"
            placeholder="グループの説明"
            value={form.description}
            onChange={(e) => form.setDescription(e.target.value)}
            className="w-full p-4 border rounded-md focus:outline-none"
          />
        </div>

        {/* 作成ボタン */}
        <div className="mt-6 flex justify-end">
          <button type="submit" className="px-6 py-2 text-white font-semibold bg-[#00AB55] rounded-lg hover:bg-green-700">
            作成
          </button>
        </div>
      </form>
    </div>
  );
}