'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Switch } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
 
interface PaginationControlsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  totalRows: number;
  // スイッチの状態とセッター関数をPropsとして受け取る
  isCompact: boolean;
  setIsCompact: (value: boolean) => void;
}

export default function PaginationControls({
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalRows,
  isCompact, 
  setIsCompact, 
}: PaginationControlsProps) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);
  const rowsPerPageOptions = [5, 10, 25];

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1); // ページあたりの件数を変えたら1ページ目に戻す
  };

  // スイッチのonChangeイベントハンドラ
  const handleSwitchChange = () => {
    setIsCompact(!isCompact); // 親から受け取ったセッター関数で状態を更新
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-y-4 sm:gap-x-6 mt-4 mr-4 text-sm">
      <div className="flex items-center justify-center ml-4 ">
      <Switch
      checked={isCompact}
      onChange={handleSwitchChange}
      className="
      group flex h-6 w-10
      cursor-pointer rounded-full p-1 ease-in-out 
      focus:not-data-focus:outline-none 
      bg-(--secondaly-bg)
      data-checked:bg-green-500 data-focus:outline 
      data-focus:outline-white
      ">
      <span
        aria-hidden="true"
        className="
        pointer-events-none inline-block 
        size-4 translate-x-0 rounded-full 
        bg-white shadow-lg ring-0 transition 
        duration-200 ease-in-out
        group-data-checked:translate-x-4
        "/>
    </Switch>
    <div className="flex items-center ml-2">
        <span>
            狭く表示
        </span>
    </div>
    </div>

    <div className="flex items-center gap-6">
      {/* 表示件数のドロップダウン */}
      <div className="flex items-center gap-2">
        <span>
            表示件数
        </span>
        <Listbox value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <div className="relative">
            <ListboxButton className="
            relative w-20 cursor-default 
            py-1.5 pl-3 pr-8 text-left 
            focus:outline-none sm:text-sm
            hover-none cursor-pointer
            ">
              <span className="block truncate">{rowsPerPage}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpIcon className="h-3 w-3" />
                <ChevronDownIcon className="h-3 w-3" />
              </span>
            </ListboxButton>
            <ListboxOptions className="
            absolute bottom-full mb-1 
            max-h-60 w-full overflow-auto py-1 text-base 
            shadow-lg rounded-lg 
            focus:outline-none sm:text-sm secondaly-bg
            ">
              {rowsPerPageOptions.map((option) => (
                <ListboxOption
                  key={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-10 ${
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
    </div>
  );
}