'use client';

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

// 外部で使えるように、PharmacyDataの設計図をここにも定義します
export interface PharmacyData {
  drugName: string;
  price: number;
  facilityName: string;
  distance: number;
  dispenseCount: number;
  dispenseAmount: number;
  lastDispenseDate: string;
}

// これが「お薬データ準備」専門のカスタムフックです
export function usePharmacyData() {
  const [pharmacyData, setPharmacyData] = useState<PharmacyData[]>([]);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExcelData = async () => {
      setLoadingError(null);
      const filePath = '/PharmacyData.xlsx';
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`ファイルが見つからないか、読み込めませんでした: ${response.status} - ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: Record<string, unknown>[] = XLSX.utils.sheet_to_json(worksheet);

        const processedData: PharmacyData[] = jsonData.map((item: Record<string, unknown>) => {
            let formattedDateString = '';
            const rawDateValue = item.lastDispenseDate;
  
            if (rawDateValue instanceof Date) {
              formattedDateString = dayjs(rawDateValue).format('YYYY/MM/DD');
            } else if (typeof rawDateValue === 'number') {
              if (!isNaN(rawDateValue)) {
                const date = new Date(Math.round((rawDateValue - 25569) * 86400 * 1000));
                if (!isNaN(date.getTime())) {
                  formattedDateString = dayjs(date).format('YYYY/MM/DD');
                }
              }
            } else if (typeof rawDateValue === 'string' && rawDateValue !== '') {
              const parsedDay = dayjs(rawDateValue, 'YYYY-MM-DD');
              if (parsedDay.isValid()) {
                formattedDateString = parsedDay.format('YYYY/MM/DD');
              }
            }
  
            const processedItem: PharmacyData = {
              drugName: (item.drugName as string) || '', 
              price: Number(item.price), 
              facilityName: (item.facilityName as string) || '',
              distance: Number(item.distance), 
              dispenseCount: Number(item.dispenseCount), 
              dispenseAmount: Number(item.dispenseAmount), 
              lastDispenseDate: formattedDateString,
            };
            return processedItem;
        });
        setPharmacyData(processedData);
      } catch (error: unknown) {
        console.error("Excelファイルの読み込み中にエラーが発生しました:", error);
        const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました';
        setLoadingError(`データの読み込みに失敗しました: ${errorMessage}`);
      }
    };
    fetchExcelData();
  }, []);

  // 準備ができたデータと、エラー情報を返します
  return { pharmacyData, loadingError };
}