import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { PharmacyData } from './usePharmacyData';
import { Facility, Group } from '@/contexts/DataContext';
import { convertHiraganaToKatakana } from '@/utils/converters';

export function useFilteredPharmacies(
  pharmacyData: PharmacyData[],
  facilities: Facility[],
  searchTerm: string,
  selectedGroup: Group | null,
  sortColumn: keyof PharmacyData | null,
  sortOrder: 'asc' | 'desc'
) {
  const [filteredPharmacyData, setFilteredPharmacyData] = useState<PharmacyData[]>([]);

  useEffect(() => {
    // 1. 前提条件のチェック
    // データが未準備、またはグループが選択されていない場合は、何も表示しない
    if (!Array.isArray(facilities) || !Array.isArray(pharmacyData) || !selectedGroup) {
      setFilteredPharmacyData([]);
      return;
    }

    // --- ここから先は、データが準備完了 & グループが選択されている場合 ---

    // 2. グループに所属する施設のIDリストを作成
    const facilityIdsInGroup = facilities
      .filter(f => f.groupId === selectedGroup.id)
      .map(f => f.id);
    
    // 3. グループ内の医薬品データに絞り込む
    let results = pharmacyData.filter(pharmacy =>
      facilityIdsInGroup.includes(pharmacy.facilityId)
    );

    // 4. 検索キーワードでさらに絞り込む (キーワードが入力されている場合のみ)
    if (searchTerm.length >= 2) {
      const searchKeywords = searchTerm
        .toLowerCase()
        .split(/\s+/)
        .filter(term => term)
        .map(term => convertHiraganaToKatakana(term));

      if (searchKeywords.length > 0) {
        results = results.filter(pharmacy => {
          const normalizedDrugName = convertHiraganaToKatakana(pharmacy.drugName.toLowerCase());
          return searchKeywords.every(keyword => normalizedDrugName.includes(keyword));
        });
      }
    }

    // 5. 並び替え
    if (sortColumn) {
      results.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (sortColumn === 'lastDispenseDate') {
            const dateA = dayjs(aValue, 'YYYY/MM/DD');
            const dateB = dayjs(bValue, 'YYYY/MM/DD');
            if (dateA.isValid() && dateB.isValid()) {
              return sortOrder === 'asc' ? dateA.diff(dateB) : dateB.diff(dateA);
            }
          }
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        return 0;
      });
    }

    setFilteredPharmacyData(results);
  }, [searchTerm, pharmacyData, facilities, selectedGroup, sortColumn, sortOrder]);

  return filteredPharmacyData;
}