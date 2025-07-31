import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

export interface allGroup {
    id: string;
    groupName: string;
    region: string;
    memberCount: number;
    updateDate: string; // Day.jsが読める 'YYYY-MM-DD' 形式の文字列が入る
    status: string;
    button: string;
}

// ★★★ STEP 1: Excelの日付番号を、'YYYY-MM-DD'形式の文字列に変換する専門家（関数）を用意する
function convertExcelDate(serial: any): string {
    // データが数字でなかったり、0以下だったりしたら、空文字を返す
    if (typeof serial !== 'number' || serial <= 0) {
        return '';
    }
    // Excelの基準日(1900/1/1)からの日数を、JavaScriptが分かる日付の形に変換
    const excelEpoch = new Date(1899, 11, 30);
    const date = new Date(excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000);
    
    // YYYY-MM-DD形式の文字列に整形する
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

export const useGroupData = () => {
    const [groups, setGroups] = useState<allGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/PharmacyData.xlsx');
                if (!response.ok) {
                    throw new Error(`ファイルの取得に失敗しました: ${response.statusText}`);
                }
                const arrayBuffer = await response.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
                const sheetName = workbook.SheetNames[3];
                const worksheet = workbook.Sheets[sheetName];

                // エラーの原因となっていた { cellDates: true } は使わない
                const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

                const formattedGroups = jsonData.map(row => ({
                    id: String(row['id'] || ''),
                    groupName: String(row['groupName'] || ''),
                    region: String(row['region'] || ''),
                    memberCount: Number(row['memberCount'] || 0),
                    // ★★★ STEP 2: 'updateDate'の値を、上で用意した専門家に渡して変換してもらう
                    updateDate: convertExcelDate(row['updateDate']),
                    status: String(row['status'] || ''),
                    button: String(row['button'] || '')
                }));

                setGroups(formattedGroups);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error('不明なエラーが発生しました。'));
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[]);
    
    return { groups, loading, error };
};