//グループ検索の絞り込みフィルター部分

import { useMemo } from 'react';
import { allGroup } from './useGroupData'; //useGroupData.tsで定義した型を再利用

export const useFilteredGroups = (allGroups: allGroup[], searchTerm: string) => { //allGroups:絞り込みたいグループの一覧リスト、searchTerm:ユーザーが入力した検索キーワード
    const filteredGroups = useMemo(() => { //allGroupsかsearchTermが変更されたときだけ、中の絞り込み処理が行われる
        if (!searchTerm) {
            return allGroups; //検索キーワードが空の場合、全リストをそのまま返す
        }
        const lowercasedTerm = searchTerm.toLowerCase(); //キーワードを小文字に変換（大文字、小文字の区別しないようにするため）
        return allGroups.filter(group => 
            group.groupName.toLowerCase().includes(lowercasedTerm)
        );
    },[allGroups, searchTerm]);
    return filteredGroups;
};

