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
    const regionOptions = ['全て', '近隣', '広域'];
    const [selectedRegion, setSelectedRegion] = useState(regionOptions[0]);
    const statusOptions = ['全て', '参加中', '参加申請中'];
    const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

    const { groups, loading, error } = useGroupContext();
    const filteredGroups = useFilteredGroups(groups, searchTerm, selectedRegion, selectedStatus);
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
        <div className="flex space-x-2 border-b mb-4 secondaly-bg">
            {statusOptions.map(status => (
                <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`
                        px-4 py-2 text-sm cursor-pointer
                        ${selectedStatus === status 
                            ? 'border-b-2 border-[#00AB55] font-semibold' 
                            : ''
                        }
                    `}
                >
                    {status}
                </button>
            ))}
        </div>

        <SimpleSearchControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder='Search...'
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        regionOptions={regionOptions}
        />
        <div className="divider"></div>
        <GroupTable 
        groups={filteredGroups} 
        error={error} 
        searchTerm={searchTerm}
        />
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
