//グループ管理ページ

'use client';

import React, { useState } from 'react';
import Link from "next/link";

export default function SettingGroupPage() { 
    return (
        <div className="p-8">
            <div className="flex flex-row items-center justify-between">
            <div>
            <p className="
            tracking-[-.01em] text-2xl font-bold
            ">
                グループの管理
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
                    グループの管理
                </p>
            </div>
            </div>
                <Link href={"group/create"} className="p-2 button-fg rounded-lg text-sm font-bold">
                    ＋ グループの作成
                </Link>
            </div>
            <div className="divider my-6"></div>

            <div className="w-full border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xs pb-4">
            </div>
        </div>
    )
}