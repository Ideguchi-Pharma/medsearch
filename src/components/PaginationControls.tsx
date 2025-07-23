'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

interface PaginationControlsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  totalRows: number;
}

export default function PaginationControls({
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalRows,
}: PaginationControlsProps) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);
  const rowsPerPageOptions = [5, 10, 25];

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1); // ページあたりの件数を変えたら1ページ目に戻す
  };

  return (
    <div className="flex items-center justify-end gap-6 mt-4 text-sm secondaly-fg">
      {/* 表示件数のドロップダウン */}
      <div className="flex items-center gap-2">
        <span>
            表示件数
        </span>
        <Listbox value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <div className="relative">
            <ListboxButton className="
            relative w-20 cursor-default rounded-md 
            border border-gray-500 
            py-1.5 pl-3 pr-8 text-left 
            shadow-sm focus:outline-none sm:text-sm
            ">
              <span className="block truncate">{rowsPerPage}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpIcon className="h-3 w-3" />
                <ChevronDownIcon className="h-3 w-3" />
              </span>
            </ListboxButton>
            <ListboxOptions className="
            absolute bottom-full mb-1 
            max-h-60 w-full overflow-auto 
            rounded-md bg-white py-1 text-base 
            shadow-lg ring-1 ring-black ring-opacity-5 
            focus:outline-none sm:text-sm secondaly-bg
            ">
              {rowsPerPageOptions.map((option) => (
                <ListboxOption
                  key={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'hover-bg' : ''
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>

      {/* ページ情報とナビゲーション */}
      <div className="flex items-center gap-4">
        <span>
          {startRow}-{endRow} / {totalRows}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded p-1 hover-bg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous Page"
          >
            &lt;
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalRows === 0}
            className="rounded p-1 hover-bg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next Page"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}