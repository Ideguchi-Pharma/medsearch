'use client';

import { useState, useEffect } from 'react';
import { useData } from '@/contexts/DataContext';

export type { Facility } from '@/contexts/DataContext';

// ▼ 引数を facilityId: string | null に変更
export function useFacilityData(facilityId: string | null) {
  const { facilities, isLoading: isDataLoading } = useData(); 
  const [facility, setFacility] = useState<any | null>(null);

  useEffect(() => {
    if (!isDataLoading && facilityId) {
      // ▼ item.id と facilityId を比較するように変更
      const found = facilities.find((item: any) => item.id === facilityId);
      setFacility(found || null);
    }
  }, [facilityId, facilities, isDataLoading]);

  return { facility, isLoading: isDataLoading };
}