'use client';

import React, { useState } from 'react';
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import SimpleSearchControls from '@/components/SimpleSearchControls';
import { GroupTable } from '@/components/GroupTable';
import { GroupDataProvider, useGroupContext } from '@/contexts/GroupDataContext';
import { useFilteredGroups } from '@/hooks/useFilteredGroups';

const GroupSearchContent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { groups, loading, error } = useGroupContext();
    const filteredGroups = useFilteredGroups(groups, searchTerm);

    if (loading) { return (
    <p className="text-center">
        データを読み込み中...
    </p>
    );
}
    

    if (error && error.message) { return (
    <p className="text-center text-error">
        エラーが発生しました: {error.message}
    </p>
    );
}

    return (
        <>
        <SimpleSearchControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder='Search...'
        />
        <div className="divider"></div>
        <GroupTable groups={filteredGroups} />
        </>
    );
};

export default function GroupPage() { 
    return (
        <GroupDataProvider>
        <div className="p-8">
            <p className="
            tracking-[-.01em] text-2xl font-bold 
            ">
                グループを探す
            </p>
            <div className="flex flex-row gap-3  pt-3">
                <Link href={"/mypage"} className="
                tracking-[-.01em] mb-8 hover:underline
                ">
                    マイページ
                </Link>
                <p className="
                tracking-[-.01em] mb-8
                ">
                    ・
                </p>
                <p className="
                tracking-[-.01em] mb-8
                ">
                    グループを探す
                </p>
            </div>
            <div className="
            flex flex-row items-center justify-start
            space-x-2 px-4 py-2 rounded-2xl w-full info-bg
            ">
                <InformationCircleIcon className="h-6 w-6 text-green-500 dark:text-white hidden sm:block"/>
                <p className="text-sm ">
                メドサーチでお互いに在庫状況を共有するグループを探します。
                </p>
            </div>
            <div className="divider my-6"></div>

            <GroupSearchContent />


        </div>
     </GroupDataProvider>
    )
}
