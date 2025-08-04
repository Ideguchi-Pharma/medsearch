'use client';

import React, { useState } from 'react';
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import SimpleSearchControls from '@/components/SimpleSearchControls';
import { GroupTable } from '@/components/GroupTable';
import { GroupDataProvider, useGroupContext } from '@/contexts/GroupDataContext';
import { useFilteredGroups } from '@/hooks/useFilteredGroups';
import PaginationControls from '@/components/PaginationControls';

const GroupSearchContent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const regionOptions = ['全て', '近隣', '広域'];
    const [selectedRegion, setSelectedRegion] = useState(regionOptions[0]);
    
    const statusOptions = [
        { display: '全て', value: '全て' },
        { display: '参加中', value: '参加中' },
        { display: '参加申請中', value: '申請中' },
    ];
    const [selectedStatus, setSelectedStatus] = useState(statusOptions[0].value);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isCompact, setIsCompact] = useState(false);

    const { groups, loading, error } = useGroupContext();
    const filteredGroups = useFilteredGroups(groups, searchTerm, selectedRegion, selectedStatus);

    const paginatedData = filteredGroups.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

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
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 mb-6 secondaly-bg rounded-t-2xl">
            {statusOptions.map(status => (
                <button
                    key={status.value}
                    onClick={() => setSelectedStatus(status.value)}
                    className={`
                        relative px-4 py-4 text-sm cursor-pointer transition-colors duration-200
                        focus:outline-none
                        ${selectedStatus === status.value
                            ? 'font-semibold'
                            : 'secondaly-fg hover:text-[var(--foreground)]'
                        }
                    `}
                >
                    {status.display}
                    <span
                        className={`
                            absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#00AB55]
                            transition-transform duration-300 ease-in-out
                            origin-center
                            ${selectedStatus === status.value ? 'scale-x-100' : 'scale-x-0'}
                        `}
                    />
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
        groups={paginatedData} 
        error={error} 
        searchTerm={searchTerm}
        isCompact={isCompact}
        />
        {filteredGroups.length > 0 && (
            <PaginationControls
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalRows={filteredGroups.length}
            isCompact={isCompact}
            setIsCompact={setIsCompact}
            />
        )}
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

            <div className="w-full border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xs pb-4">
            <GroupSearchContent />
            </div>

        </div>
     </GroupDataProvider>
    )
}