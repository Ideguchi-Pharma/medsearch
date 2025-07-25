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
}

// 施設データの型定義
export interface Facility {
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

        // 1シート目：医薬品データ
        const pharmacySheetName = workbook.SheetNames[0];
        const pharmacyWorksheet = workbook.Sheets[pharmacySheetName];
        const pharmacyJson: Record<string, unknown>[] = XLSX.utils.sheet_to_json(pharmacyWorksheet);
        const processedPharmacyData = pharmacyJson.map((item: Record<string, unknown>) => {
            let formattedDateString = '';
            const rawDateValue = item.lastDispenseDate;
            if (rawDateValue instanceof Date) {
              formattedDateString = dayjs(rawDateValue).format('YYYY/MM/DD');
            }
            return {
              drugName: (item.drugName as string) || '',
              price: Number(item.price),
              facilityName: (item.facilityName as string) || '',
              distance: Number(item.distance),
              dispenseCount: Number(item.dispenseCount),
              dispenseAmount: Number(item.dispenseAmount),
              lastDispenseDate: formattedDateString,
            };
        });
        setPharmacyData(processedPharmacyData);

        // 2シート目：施設データ
        const facilitySheetName = workbook.SheetNames[1];
        const facilityWorksheet = workbook.Sheets[facilitySheetName];
        const facilityJson: Facility[] = XLSX.utils.sheet_to_json(facilityWorksheet);
        setFacilities(facilityJson);

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