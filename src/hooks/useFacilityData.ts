'use client';

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

// 施設のデータ形式を定義
export interface Facility {
  facilityName: string;
  [key: string]: any; // 他にも色々なデータがあるため
}

export function useFacilityData(facilityName: string | null) {
  const [facility, setFacility] = useState<Facility | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!facilityName) {
        setIsLoading(false);
        return;
    };

    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch('/PharmacyData.xlsx');
      const arrayBuffer = await res.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[1]; // 2シート目
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const found = data.find((item: any) => item.facilityName === facilityName);
      setFacility(found || null);
      setIsLoading(false);
    };
    fetchData();
  }, [facilityName]);

  return { facility, isLoading };
}