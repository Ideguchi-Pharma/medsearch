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
    // ▼▼▼ この部分を修正 ▼▼▼
    // facilities が配列として準備できていない場合は、処理を中断する
    if (!Array.isArray(facilities) || !Array.isArray(pharmacyData)) {
      setFilteredPharmacyData([]);
      return;
    }
    // ▲▲▲ ここまで修正 ▲▲▲

    // フィルタリングの条件があるかを確認
    if (!selectedGroup && searchTerm.length < 2) {
      setFilteredPharmacyData([]);
      return;
    }

    let results = pharmacyData;

    // 手順1: グループで絞り込む
    if (selectedGroup) {
      const facilityIdsInGroup = facilities
        .filter(f => f.groupId === selectedGroup.id)
        .map(f => f.id);
      
      results = results.filter(pharmacy =>
        facilityIdsInGroup.includes(pharmacy.facilityId)
      );
    }

    // 手順2: 検索キーワードで絞り込む
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

    // 手順3: 並び替え
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