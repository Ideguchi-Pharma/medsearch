'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

// 医薬品データの型定義
export interface PharmacyData {
  drugName: string;
  price: number;
  facilityName: string;
  distance: number;
  dispenseCount: number;
  dispenseAmount: number;
  lastDispenseDate: string;
  facilityNumber: string;
  facilityId: string; // IDの型はstring
}

// 施設データの型定義
export interface Facility {
  id: string; // IDの型はstring
  facilityName: string;
  [key: string]: any;
}

// Contextが持つデータの型定義
interface DataContextType {
  pharmacyData: PharmacyData[];
  facilities: Facility[];
  isLoading: boolean;
  error: string | null;
}

// Contextの作成
const DataContext = createContext<DataContextType | undefined>(undefined);

// Contextを他のコンポーネントに提供するProviderコンポーネント
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [pharmacyData, setPharmacyData] = useState<PharmacyData[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch('/PharmacyData.xlsx');
        if (!response.ok) throw new Error('Excel file not found');
        
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });

        // --- ▼ここからが大きな修正ポイントです ---

        // 1. 先に施設情報（2シート目）を読み込む
        const facilitySheetName = workbook.SheetNames[1];
        const facilityWorksheet = workbook.Sheets[facilitySheetName];
        const facilityJson: any[] = XLSX.utils.sheet_to_json(facilityWorksheet);
        
        // 2. ExcelのuniqueId列を'id'として扱い、各施設情報にIDを持たせる
        const facilitiesWithId = facilityJson.map((facility) => ({
          ...facility,
          id: facility.uniqueId, 
        }));
        setFacilities(facilitiesWithId);
        
        // 3. 「施設名」をキーにして、すぐに施設情報を取り出せる対応表（Map）を作成
        const facilityMap = new Map(facilitiesWithId.map(f => [f.facilityName, f]));

        // 4. 医薬品情報（1シート目）を読み込み、対応表を使ってIDなどを追加する
        const pharmacySheetName = workbook.SheetNames[0];
        const pharmacyWorksheet = workbook.Sheets[pharmacySheetName];
        const pharmacyJsonData: Record<string, unknown>[] = XLSX.utils.sheet_to_json(pharmacyWorksheet);
        const processedPharmacyData = pharmacyJsonData.map((item: Record<string, unknown>) => {
            const facilityName = (item.facilityName as string) || '';
            const facilityInfo = facilityMap.get(facilityName); // 対応表から施設情報を取得

            let formattedDateString = '';
            const rawDateValue = item.lastDispenseDate;
            if (rawDateValue instanceof Date) {
              formattedDateString = dayjs(rawDateValue).format('YYYY/MM/DD');
            }
            return {
              drugName: (item.drugName as string) || '',
              price: Number(item.price),
              facilityName: facilityName,
              distance: Number(item.distance),
              dispenseCount: Number(item.dispenseCount),
              dispenseAmount: Number(item.dispenseAmount),
              lastDispenseDate: formattedDateString,
              // 対応表から取得した情報を追加
              facilityNumber: facilityInfo?.facilityNumber || '',
              facilityId: facilityInfo?.id || '',
            };
        });
        setPharmacyData(processedPharmacyData);

        // --- ▲ここまでが大きな修正ポイントです ---

      } catch (err: unknown) {
        console.error("Failed to load data:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchExcelData();
  }, []);

  const value = { pharmacyData, facilities, isLoading, error };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Contextを簡単に使うためのカスタムフック
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};