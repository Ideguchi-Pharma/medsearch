//グループ検索の絞り込みフィルター部分

import { useMemo } from 'react';
import { allGroup } from './useGroupData';
// ★ STEP 1: converters.ts から、ひらがなをカタカナに変換する専門家をインポートする
import { convertHiraganaToKatakana } from '@/utils/converters'; 

export const useFilteredGroups = (allGroups: allGroup[], searchTerm: string) => {
  const filteredGroups = useMemo(() => {
    if (!searchTerm) {
      return allGroups;
    }
    
    // ★ STEP 2: ユーザーが入力したキーワードを、まずカタカナに変換する
    const katakanaSearchTerm = convertHiraganaToKatakana(searchTerm).toLowerCase();

    return allGroups.filter(group => {
      // ★ STEP 3: 比較対象のグループ名も、まずカタカナに変換する
      const katakanaGroupName = convertHiraganaToKatakana(group.groupName).toLowerCase();
      
      // ★ STEP 4: カタカナ同士で比較する
      return katakanaGroupName.includes(katakanaSearchTerm);
    });
  }, [allGroups, searchTerm]);

  return filteredGroups;
};
