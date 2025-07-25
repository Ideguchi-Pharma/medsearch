'use client';
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import  Image  from "next/image"
import PharmaCloudLogo from "../../public/pharmacloud_mark.svg"

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen w-screen ">
    <Image
      className="animate-blink"
      src={PharmaCloudLogo}
      alt="ファーマクラウド"
      width={160}
      height={160}
    />
  </div>
  );

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [selectedFacility, setSelectedFacility] = useState('デモ薬局');
  const [isLoading, setIsLoading] = useState(true);

  // localStorageからの読み込み
  useEffect(() => {
    // 500ミリ秒待つPromiseを作成
    const timer = new Promise(resolve => setTimeout(resolve, 500));

    // localStorageからデータを読み込むPromiseを作成
    const loadData = new Promise<string | null>(resolve => {
      resolve(localStorage.getItem('selectedFacility'));
    });

    // データ読み込みとタイマーの両方が完了するのを待つ
    Promise.all([loadData, timer]).then(([savedFacility]) => {
      if (savedFacility) {
        setSelectedFacility(savedFacility);
      }
      setIsLoading(false);
    });
  }, []); // 初回マウント時のみ実行

  // localStorageへの保存
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('selectedFacility', selectedFacility);
    }
  }, [selectedFacility, isLoading]);

  // isLoadingがtrueの間はローディング画面を表示
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    // 画面全体を横に並べる箱にします (サイドバー | メインエリア)
    <div className="flex h-screen">
    
      {/* 1. サイドバー */}
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      {/* 2. メインエリア (ヘッダーとコンテンツを縦に並べる箱) */}
      <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
        {/* 2-1. 先ほど作成したヘッダーをここに配置します */}
        <Header 
          selectedFacility={selectedFacility} 
          setSelectedFacility={setSelectedFacility} 
        />
        {/* 2-2. ここに各ページの内容が表示されます */}
        {children}
      </div>
    </div>
  );
} 