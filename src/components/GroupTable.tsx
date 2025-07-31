//グループ検索テーブルの表示部分

import React from 'react';
import { allGroup } from '@/hooks/useGroupData'; //型を再利用

interface GroupTableProps { //このコンポーネントが受け取る型の再定義
    groups: allGroup[]; //表示したいグループのリスト
}

export const GroupTable: React.FC<GroupTableProps> = ({ groups }) => {
    return (
        <div className="mt-6 w-full overflow-x-auto border border-gray-200 dark:border-gray-700">
            <table className="mt-6 w-full overflow-x-auto border border-gray-200 dark:border-gray-700">
                <thead>
                    <tr className="px-4 py-8 text-left">
                        <th>グループ名</th>
                        <th>地域</th>
                        <th>メンバー数</th>
                        <th>更新日</th>
                        <th>ステータス</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                        <tr key={group.id}>
                            <td>{group.groupName}</td>
                            <td>{group.region}</td>
                            <td>{group.memberCount}</td>
                            <td>{group.updateDate}</td>
                            <td>{group.status}</td>
                            <td>
                                <button className="btn btn-sm">
                                    {group.button}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};