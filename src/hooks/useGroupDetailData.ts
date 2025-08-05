'use client';

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

// グループ詳細データの型定義
export interface GroupDetail {
  groupId: string;
  groupName: string;
  postCode: string;
  address: string;
  contactAddress: string;
  explanation: string;
}

// URLのIDを引数として受け取るフック
export function useGroupDetailData(groupId: string | null) {
  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupId) {
      setIsLoading(false);
      return;
    }

    const fetchGroupData = async () => {
      try {
        const response = await fetch('/PharmacyData.xlsx');
        if (!response.ok) throw new Error('Excelファイルの読み込みに失敗しました');
        
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // "groupInformation"シート（5番目のシート）を読み込む
        const sheetName = workbook.SheetNames[4];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);
        
        // IDが一致するグループ情報を探す
        const foundGroup = jsonData.find(item => item.groupId === groupId);
        
        setGroup(foundGroup || null);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId]);

  return { group, isLoading, error };
}