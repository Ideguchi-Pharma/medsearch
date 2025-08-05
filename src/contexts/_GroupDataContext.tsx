//アプリケーション内のどこからでもアクセスできる「共有の保管庫」を作成//

'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useGroupData, allGroup } from '@/hooks/useGroupData'; //useGroupData.tsxで作成したフックをインポート//

interface GroupDataContextType { //これから作る保管庫に何が入っているかの型を定義
    groups: allGroup[];
    loading: boolean;
    error: Error | null; 
} 

const GroupDataContext = createContext<GroupDataContextType | undefined>(undefined) //保管庫を空の状態で作成

export const GroupDataProvider = ({ children }: { children: ReactNode }) => { //この保管庫にデータを入れて、子のコンポーネントに提供する役割を持つ「Provider」コンポーネントを作成
    const { groups, loading, error } = useGroupData(); //useGroupData.tsxで作成したフックを呼び出してデータを取得

    return ( //取得したデータを、保管庫の"value"として設定
        <GroupDataContext.Provider value={{ groups, loading, error }}>
            {children}
        </GroupDataContext.Provider>
    );
}; 

export const useGroupContext = () => { //他のファイルが簡単に保管庫のデータを扱えるようにするためのショートカット関数
    const context = useContext(GroupDataContext);
    if (context === undefined) {
        throw new Error('useGroupContext must be used within a GroupDataProvider'); //もしProviderの外で使おうとしたらエラーを返す//
    }
    return context;
};