//Excelからデータを読み込んでプログラムで扱えるようにする心臓部//

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'

export interface allGroup {
    id: string;
    groupName: string;
    region: string;
    memberCount: number;
    updateDate: string;
    status: string;
    button: string;
}

export const useGroupData = () => {
    const [groups, setGroups] = useState<allGroup[]>([]); //取得データの保存場所
    const [loading, setLoading] = useState<boolean>(true); //データ読み込み中かを表す
    const [error, setError] = useState<Error | null>(null); //エラー発生時の情報保存場所

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/PharmacyData.xlsx'); //Excelデータを取りに行く
                if (!response.ok) {
                    throw new Error(`ファイルの取得に失敗しました: ${response.statusText}`);
                }

                const arrayBuffer = await response.arrayBuffer(); //Excelデータをプログラムで取り扱える形式に変換
                const workbook = XLSX.read(arrayBuffer, { type: 'buffer' }); 
                const sheetName = workbook.SheetNames[2]; //Excelの3番目のシートを選ぶ
                const worksheet = workbook.Sheets[sheetName];
                const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet); //シートの中身をJSON形式に変換（オブジェクトの配列）
                const formattedGroups = jsonData.map(row => ({
                    id: String(row['id'] || ''),
                    groupName: String(row['groupName'] || ''),
                    region: String(row['region'] || ''),
                    memberCount: Number(row['memberCount'] || ''),
                    updateDate: String(row['updateDate'] || ''),
                    status: String(row['status'] || ''),
                    button: String(row['button'] || '')
                })); //JSON形式のデータを、最初に定義したallGroup型に整形する

                setGroups(formattedGroups); //整形したデータを保存
            } catch (err) {
                setError(err instanceof Error ? err : new Error('不明なエラーが発生しました')); //もし途中でエラーが起きたら、エラー情報を保存する
            } finally {
                setLoading(false); //成功しても失敗しても、最後に「読み込み中」の旗をおろす
            }
        };

        fetchData();
    },[]);
    return { groups, loading, error};
};

