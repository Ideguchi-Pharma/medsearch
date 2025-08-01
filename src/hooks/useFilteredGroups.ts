//グループ検索の絞り込みフィルター部分

import { useMemo } from 'react';
import { allGroup } from './useGroupData';
import { convertHiraganaToKatakana } from '@/utils/converters'; 

export const useFilteredGroups = (allGroups: allGroup[], searchTerm: string, selectedRegion: string) => {
  const filteredGroups = useMemo(() => {
    const groupsFilteredByRegion = allGroups.filter(group => {
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
  }, [allGroups, searchTerm, selectedRegion]);

  return filteredGroups;
};
