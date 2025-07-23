'use client';
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    // 画面全体を横に並べる箱にします (サイドバー | メインエリア)
    <div className="flex h-screen">
    
      {/* 1. サイドバー */}
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      {/* 2. メインエリア (ヘッダーとコンテンツを縦に並べる箱) */}
      <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar">
        {/* 2-1. 先ほど作成したヘッダーをここに配置します */}
        <Header />
        {/* 2-2. ここに各ページの内容が表示されます */}
        {children}
      </div>
    </div>
  );
} 