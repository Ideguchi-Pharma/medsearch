'use client';

import { useState, useEffect } from 'react';
import { useData } from '@/contexts/DataContext'; // 作成したuseDataフックをインポート

// 施設のデータ形式をエクスポート
export type { Facility } from '@/contexts/DataContext';

export function useFacilityData(facilityName: string | null) {
  // Contextから全施設データとローディング状態を取得
  const { facilities, isLoading: isDataLoading } = useData(); 
  const [facility, setFacility] = useState<any | null>(null);

  useEffect(() => {
    // Contextのデータ読み込みが完了してから、施設を探す
    if (!isDataLoading && facilityName) {
      const found = facilities.find((item: any) => item.facilityName === facilityName);
      setFacility(found || null);
    }
  }, [facilityName, facilities, isDataLoading]);

  // ローディング状態はContextのものをそのまま返す
  return { facility, isLoading: isDataLoading };
}