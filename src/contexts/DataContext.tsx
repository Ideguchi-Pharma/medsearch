// src/contexts/DataContext.tsx (真の最終解決版)

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

// --- 型定義 (FacilityにfacilityNumberを追加) ---
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
        if (process.env.NODE_ENV === 'development') {
          console.log("開発環境：APIからデータを取得します...");
          await loadDataFromApi();
        } else {
          console.log("本番環境：Excelからデータを取得します...");
          await loadDataFromExcel();
        }
      } catch (err: unknown) {
        console.error("データ読み込み失敗:", err);
        setError(err instanceof Error ? err.message : '不明なエラー');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const loadDataFromApi = async () => {
    // APIルートは分離した専門サーバー(server.js)を呼び出す
    const response = await fetch('http://localhost:3001/api/data');
    if (!response.ok) {
      throw new Error(`データサーバーからの応答エラー: ${response.statusText}`);
    }
    const data = await response.json();
    
    // APIから受け取ったデータをそのままstateにセット
    // サーバー側で整形済みなので、フロントでは何もしなくて良い
    setPharmacyData(data.pharmacyData);
    setFacilities(data.facilities);
    setGroups(data.groups);
    setAllGroups(data.allGroups);
    setGroupDetails(data.groupDetails);
  };
  
  // (Excelから読み込む関数は変更なし)
  const loadDataFromExcel = async () => {
    const response = await fetch('/PharmacyData.xlsx');
    if (!response.ok) throw new Error('Excel file not found');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const facilitySheetName = workbook.SheetNames[1];
    const facilityWorksheet = workbook.Sheets[facilitySheetName];
    const facilityJson: any[] = XLSX.utils.sheet_to_json(facilityWorksheet);
    const facilitiesWithId = facilityJson.map((facility) => ({ ...facility, id: facility.uniqueId, groupId: facility.groupId }));
    setFacilities(facilitiesWithId);
    const facilityMap = new Map(facilitiesWithId.map(f => [f.facilityName, f]));
    const pharmacySheetName = workbook.SheetNames[0];
    const pharmacyWorksheet = workbook.Sheets[pharmacySheetName];
    const pharmacyJsonData: any[] = XLSX.utils.sheet_to_json(pharmacyWorksheet);
    const processedPharmacyData = pharmacyJsonData.map((item) => {
        const facilityInfo = facilityMap.get(item.facilityName || '');
        return {
          drugName: (item.drugName as string) || '', price: Number(item.price) || 0, facilityName: item.facilityName || '', distance: Number(item.distance) || 0, dispenseCount: Number(item.dispenseCount) || 0, dispenseAmount: Number(item.dispenseAmount) || 0, lastDispenseDate: convertExcelDate(item.lastDispenseDate, 'YYYY/MM/DD'), facilityNumber: facilityInfo?.facilityNumber || '', facilityId: facilityInfo?.id || '',
        };
    });
    setPharmacyData(processedPharmacyData);
    const groupSheetName = workbook.SheetNames[2];
    const groupWorksheet = workbook.Sheets[groupSheetName];
    const groupJson: Group[] = XLSX.utils.sheet_to_json(groupWorksheet);
    setGroups(groupJson);
    const allGroupsSheetName = workbook.SheetNames[3];
    const allGroupsWorksheet = workbook.Sheets[allGroupsSheetName];
    const allGroupsJson: any[] = XLSX.utils.sheet_to_json(allGroupsWorksheet);
    const formattedAllGroups = allGroupsJson.map(row => ({
        id: String(row['id'] || ''), groupName: String(row['groupName'] || ''), region: String(row['region'] || ''), memberCount: Number(row['memberCount'] || 0), updateDate: convertExcelDate(row['updateDate']), status: String(row['status'] || ''), button: String(row['button'] || '')
    }));
    setAllGroups(formattedAllGroups);
    const groupDetailsSheetName = workbook.SheetNames[4];
    const groupDetailsWorksheet = workbook.Sheets[groupDetailsSheetName];
    const groupDetailsJson: GroupDetail[] = XLSX.utils.sheet_to_json(groupDetailsWorksheet);
    setGroupDetails(groupDetailsJson);
  };

  const value = { pharmacyData, facilities, groups, allGroups, groupDetails, isLoading, error };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) { throw new Error('useData must be used within a DataProvider'); }
  return context;
};

function convertExcelDate(serial: any, format: string = 'YYYY-MM-DD'): string {
    if (typeof serial !== 'number' || serial <= 0) { return ''; }
    const date = dayjs('1899-12-30').add(serial, 'day');
    return date.format(format);
}