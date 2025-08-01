//グループ検索の絞り込みフィルター部分

import { useMemo } from 'react';
import { allGroup } from './useGroupData';
import { convertHiraganaToKatakana } from '@/utils/converters'; 

export const useFilteredGroups = (
  allGroups: allGroup[], 
  searchTerm: string, 
  selectedRegion: string,
  selectedStatus
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
