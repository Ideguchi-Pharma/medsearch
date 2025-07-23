'use client';

import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Input } from '@headlessui/react';
import { MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/solid';

// この部品が必要とする道具（Props）の設計図
interface SearchControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedGroup: { id: string; name: string };
  setSelectedGroup: (group: { id: string; name: string }) => void;
  groups: { id: string; name: string }[];
}

// これが検索機能専門の部品です
export default function SearchControls({
  searchTerm,
  setSearchTerm,
  selectedGroup,
  setSelectedGroup,
  groups,
}: SearchControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full">
      {/* グループ選択のプルダウン */}
      <Listbox value={selectedGroup} onChange={setSelectedGroup} className="relative w-full sm:w-48 flex-grow-0 flex-shrink-0">
        <div>
          <ListboxButton className="relative w-full sm:w-48 cursor-default rounded-md border border-gray-500 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none sm:text-sm hover-none cursor-pointer">
            <span className="block truncate">{selectedGroup.name}</span>
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg py-1 text-base shadow-lg ring-black ring-opacity-5 focus:outline-none sm:text-sm secondaly-bg">
            {groups.map((group) => (
              <ListboxOption
                key={group.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-2 pr-2 hover-bg ${
                    active ? 'bg-opacity-80 rounded-lg' : ''
                  }`
                }
                value={group}
              >
                {({ selected }) => (
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    {group.name}
                  </span>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      {/* 検索バーとクリアボタン */}
      <div className="w-full flex-grow flex flex-col sm:flex-row relative">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="search..."
            className="w-full py-2 pl-10 sm:text-sm border border-gray-500 rounded-md focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4" />
          </div>
        </div>
        {searchTerm.length > 0 && (
          <>
            {/* PC用クリアボタン */}
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="sm:flex hidden items-center justify-center ml-2 w-28 h-8 px-2 rounded-md"
              aria-label="クリア"
            >
              <TrashIcon className="h-4 w-4 mr-1 align-middle" />
              <span className="align-middle">クリア</span>
            </button>
            {/* モバイル用クリアボタン */}
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="sm:hidden mt-2 flex items-center justify-center py-2 rounded"
              aria-label="クリア"
            >
              <TrashIcon className="h-5 w-5 mr-1" />
              クリア
            </button>
          </>
        )}
      </div>
    </div>
  );
}