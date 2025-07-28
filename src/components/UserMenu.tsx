'use client';

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';

// ユーザー情報の型定義
type UserData = {
  name: string;
  email: string;
  menuItems: { label: string; action: () => void; }[];
};

interface UserMenuProps {
  user: UserData;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  return (
    <Menu>
      <MenuButton className="
      flex items-center justify-center 
      w-8 h-8 rounded-full text-xs 
      shadow-inner shadow-white/10 
      focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white 
      secondaly-bg cursor-pointer hover-bg">
        デモ
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="origin-top-right rounded-xl border border-gray-200 p-1 text-sm/6 shadow-lg ring-none ring-black ring-opacity-5 transition duration-100 ease-out secondaly-bg [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 z-[9999]"
      >
        <MenuItem>
          <p className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5">{user.name}</p>
        </MenuItem>
        <MenuItem>
          <p className="group flex w-full items-center rounded-lg px-3">{user.email}</p>
        </MenuItem>
        <div className="my-1 h-px" />
        {user.menuItems.map((item) => (
          <MenuItem key={item.label}>
            <button
              onClick={item.action}
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10 hover-bg"
            >
              {item.label}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};