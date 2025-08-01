'use client';

import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface SimpleSearchControlsProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    placeholder?: string;
    selectedRegion: string;
    setSelectedRegion: (region: string) => void;
    regionOptions: string[];
}

const SimpleSearchControls: React.FC<SimpleSearchControlsProps> =({
    searchTerm,
    setSearchTerm,
    placeholder,
    selectedRegion,
    setSelectedRegion,
    regionOptions
}) => {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            {/* ★ STEP 2: リストボックス（プルダウン）のUIを追加 */}
            <div className="w-full sm:w-48">
                <Listbox value={selectedRegion} onChange={setSelectedRegion}>
                    <div className="relative">
                        <ListboxButton className="relative w-full cursor-default rounded-md border border-gray-600 py-2.5 pl-3 pr-10 text-left shadow-sm focus:outline-none sm:text-sm">
                            <span className="block truncate">{selectedRegion}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </ListboxButton>
                        <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {regionOptions.map((region, regionIdx) => (
                                <ListboxOption
                                    key={regionIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-4 pr-4 ${
                                        active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={region}
                                >
                                    {({ selected }) => (
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                            {region}
                                        </span>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </div>
                </Listbox>
            </div>

        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <MagnifyingGlassIcon className="w-4 h-4" />
            </div>
            <input
            type="text"
            className="
            w-full py-2 pl-11 pr-4 
            border border-gray-600 
            rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600
            "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder || 'Search...'}
            />
        </div>
    </div>
    );
};

export default SimpleSearchControls;