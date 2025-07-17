'use client';
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        <div className="w-full sm:flex-grow overflow-auto transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
} 