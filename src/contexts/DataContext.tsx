//アプリ内共通のデータ保管庫

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

// --- 型定義 (変更なし) ---
export interface PharmacyData {
  drugName: string; price: number; facilityName: string; distance: number; dispenseCount: number; dispenseAmount: number; lastDispenseDate: string; facilityNumber: string; facilityId: string;
}
export interface Facility {
  id: string; facilityName: string; groupId: string; facilityNumber: string; [key: string]: any;
}
export interface Group {
  id: string; name: string;
}
export interface AllGroup {
  id: string; groupName: string; region: string; memberCount: number; updateDate: string; status: string; button: string;
}
export interface GroupDetail {
  groupId: string; groupName: string; postCode: string; address: string; contactAddress: string; explanation: string;
}
interface DataContextType {
  pharmacyData: PharmacyData[]; facilities: Facility[]; groups: Group[]; allGroups: AllGroup[]; groupDetails: GroupDetail[]; isLoading: boolean; error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [pharmacyData, setPharmacyData] = useState<PharmacyData[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [allGroups, setAllGroups] = useState<AllGroup[]>([]);
  const [groupDetails, setGroupDetails] = useState<GroupDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 環境に関わらず、常にAPIルートからデータを取得する
        const response = await fetch('/api/data');
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData?.message || response.statusText;
          throw new Error(`データサーバーからの応答エラー: ${errorMessage}`);
        }
        const data = await response.json();
        
        if(data.message) {
            throw new Error(data.message);
        }

        setPharmacyData(data.pharmacyData);
        setFacilities(data.facilities);
        setGroups(data.groups);
        setAllGroups(data.allGroups);
        setGroupDetails(data.groupDetails);
      } catch (err: unknown) {
        console.error("DataContext fetch error:", err);
        setError(err instanceof Error ? err.message : 'データの読み込み中に不明なエラーが発生しました。');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const value = { pharmacyData, facilities, groups, allGroups, groupDetails, isLoading, error };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) { throw new Error('useData must be used within a DataProvider'); }
  return context;
};