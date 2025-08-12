'use client';

import { useState } from 'react';
import Link from 'next/link';

const useFormState = () => {
    const [facilityName, setFacilityName] = useState('');
    const [facilityNumber, setFacilityNumber] =useState('');
    const [telNumber, setTelNumber] =useState('');
    const [faxNumber, setFaxNumber] =useState('');
    const [homePage, setHomePage] =useState('');
    const [postalCode, setPostalCode] = useState('');
    const [prefecture, setPrefecture] = useState('');
    const [city, setCity] = useState('');
    const [contact, setContact] = useState('');
    const [description, setDescription] = useState('');
  
    // フォーム送信時の処理（今はコンソールに出力するだけ）
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = { facilityName, facilityNumber, telNumber, faxNumber, homePage, postalCode, prefecture, city, contact, description };
      console.log("作成されたグループ情報:", formData);
      // ここにAPIへデータを送信する処理を記述します
    };
  
    return {
      facilityName, setFacilityName,
      facilityNumber, setFacilityNumber,
      telNumber, setTelNumber,
      faxNumber, setFaxNumber,
      homePage, setHomePage,
      postalCode, setPostalCode,
      prefecture, setPrefecture,
      city, setCity,
      contact, setContact,
      description, setDescription,
      handleSubmit,
    };
  };

export default function FacilityCreatePage() {
    const form = useFormState();
    return (
      <div className="p-8">
        {/* ページタイトルとパンくずリスト */}
        <p className="tracking-[-.01em] text-2xl font-bold">
          施設の登録
        </p>
        <div className="flex flex-row gap-3 pt-3 mb-8">
          <Link href={"/mypage"} className="tracking-[-.01em] hover:underline">
            マイページ
          </Link>
          <p>・</p>
          <Link href={""} className="tracking-[-.01em] hover:underline">
            施設の管理
          </Link>
          <p>・</p>
          <p className="secondaly-fg">施設の登録</p>
        </div>

        <div className="w-full p-6 space-y-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 施設名 */}
            <div>
              <label htmlFor="prefecture" className="block text-sm font-medium mb-1"></label>
              <input
                id="prefecture"
                type="text"
                placeholder="施設名"
                value={form.facilityName}
                onChange={(e) => form.setFacilityNumber(e.target.value)}
                className="w-full p-4 border rounded-md focus:outline-none"
              />
            </div>
            {/* 医療機関番号 */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1"></label>
              <input
                id="city"
                type="text"
                placeholder="医療機関番号(10桁)"
                value={form.facilityNumber}
                onChange={(e) => form.setFacilityNumber(e.target.value)}
                className="w-full p-4 border rounded-md focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 電話番号 */}
            <div>
              <label htmlFor="telNumber" className="block text-sm font-medium mb-1"></label>
              <input
                id="telNumber"
                type="text"
                placeholder="電話番号"
                value={form.telNumber}
                onChange={(e) => form.setTelNumber(e.target.value)}
                className="w-full p-4 border rounded-md focus:outline-none"
              />
            </div>
            {/* FAX番号 */}
            <div>
              <label htmlFor="faxNumber" className="block text-sm font-medium mb-1"></label>
              <input
                id="faxNumber"
                type="text"
                placeholder="FAX番号"
                value={form.faxNumber}
                onChange={(e) => form.setFaxNumber(e.target.value)}
                className="w-full p-4 border rounded-md focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ホームページ */}
            <div>
              <label htmlFor="homePage" className="block text-sm font-medium mb-1"></label>
              <input
                id="homePage"
                type="text"
                placeholder="ホームページ"
                value={form.homePage}
                onChange={(e) => form.setHomePage(e.target.value)}
                className="w-full p-4 border rounded-md focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="w-full p-6 space-y-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:col-span-2 gap-4">
            {/* 郵便番号 */}
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
          </div>
        </div>
        <div className="w-full p-6 space-y-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">

        </div>

      </div>
    );
  }