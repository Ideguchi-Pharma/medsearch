import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { PharmacyData } from './usePharmacyData';
import { convertHiraganaToKatakana } from '@/utils/converters';

// このフックは、絞り込みと並び替えのロジックを専門に担当します
export function useFilteredPharmacies(
  pharmacyData: PharmacyData[],
  searchTerm: string,
  sortColumn: keyof PharmacyData | null,
  sortOrder: 'asc' | 'desc'
) {
  const [filteredPharmacyData, setFilteredPharmacyData] = useState<PharmacyData[]>([]);

  useEffect(() => {
    let results: PharmacyData[] = [];
    if (searchTerm.length < 2) {
      results = [];
    } else {
      const searchKeywords = searchTerm
        .toLowerCase()
        .split(/\s+/)
        .filter(term => term)
        .map(term => convertHiraganaToKatakana(term));

      if (searchKeywords.length > 0) {
        results = pharmacyData.filter(pharmacy => {
          const normalizedDrugName = convertHiraganaToKatakana(pharmacy.drugName.toLowerCase());
          return searchKeywords.every(keyword => normalizedDrugName.includes(keyword));
        });
      }
    }

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
  }, [searchTerm, pharmacyData, sortColumn, sortOrder]);

  return filteredPharmacyData;
}