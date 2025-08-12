//ヘッダーで使用してる施設選択機能

'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

// 施設のデータ形式の型定義
type Facility = {
  name: string;
  location: string;
};

interface FacilitySelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  facilities: Facility[];
  onFacilitySelect: (name: string) => void;
}

export const FacilitySelectDialog: React.FC<FacilitySelectDialogProps> = ({ isOpen, onClose, facilities, onFacilitySelect }) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-[9999] focus:outline-none" onClose={onClose}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="
            w-full max-w-md rounded-xl p-6 text-left 
            align-middle shadow-xl duration-300 ease-out 
            data-closed:transform-[scale(95%)] data-closed:opacity-0 
            secondaly-bg
            ">
            <DialogTitle as="h3" 
            className="text-lg text-center font-bold leading-6
            ">
              サービスを利用する施設を選んでください
            </DialogTitle>
            {facilities.map((facility) => (
              <div key={facility.name} 
              onClick={() => onFacilitySelect(facility.name)}
              className="flex items-start gap-2 mt-4 text-lg hover:rounded-lg hover-bg p-2 cursor-pointer
              ">
                <UserCircleIcon className="h-14 w-14 shrink-0" />
                <div className="flex flex-col">
                  <span>{facility.name}</span>
                  <p className="mt-1 text-sm">{facility.location}</p>
                </div>
              </div>
            ))}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};