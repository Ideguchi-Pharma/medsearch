//グループ検索、絞り込み、並び替えの機能部分

import { useMemo } from 'react';
import { AllGroup } from '@/contexts/DataContext';
import { convertHiraganaToKatakana } from '@/utils/converters'; 

export const useFilteredGroups = (
  allGroups: AllGroup[], 
  searchTerm: string, 
  selectedRegion: string,
  selectedStatus: string
) => {
  const filteredGroups = useMemo(() => {
    const groupsFilteredByStatus = allGroups.filter(group => {
      if (selectedStatus === '全て')
        return true;
      return group.status === selectedStatus;
    });

    const groupsFilteredByRegion = groupsFilteredByStatus.filter(group => {
      if (selectedRegion === '全て') {
        return true;
      }
      return group.region === selectedRegion;
    });

    if (!searchTerm) {
      return groupsFilteredByRegion;
    }

    const katakanaSearchTerm = convertHiraganaToKatakana(searchTerm).toLowerCase();

    return groupsFilteredByRegion.filter(group => {
      const katakanaGroupName = convertHiraganaToKatakana(group.groupName).toLowerCase();
      return katakanaGroupName.includes(katakanaSearchTerm);
    });
  }, [allGroups, searchTerm, selectedRegion, selectedStatus]);

  return filteredGroups;
};
