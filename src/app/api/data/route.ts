// 開発環境と本番環境でデータソースを切り替え、アプリにデータを提供するAPIエンドポイント

import { NextResponse } from 'next/server';
import { Spanner } from '@google-cloud/spanner';
import path from 'path';
import fs from 'fs/promises';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import type { Facility, PharmacyData, Group, AllGroup, GroupDetail } from '@/contexts/DataContext';

// Excelの日付を 'YYYY/MM/DD' 形式の文字列に変換する関数
function convertExcelDate(serial: any, format = 'YYYY/MM/DD'): string {
    if (typeof serial !== 'number' || serial <= 0) {
        return '';
    }
    const excelEpoch = new Date(1899, 11, 30);
    const date = new Date(excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formatted = `${year}-${month}-${day}`;
    return dayjs(formatted).format(format);
}

// Spannerの日付オブジェクトを 'YYYY/MM/DD' 形式の文字列に変換する関数
function formatSpannerDate(dateValue: any): string {
    // Spanner DATEオブジェクトは { value: 'YYYY-MM-DD' } という形式
    // POSTで文字列として保存したデータは、そのまま文字列として返ってくることがある
    const dateString = dateValue?.value || dateValue;

    if (typeof dateString === 'string' && dayjs(dateString).isValid()) {
        return dayjs(dateString).format('YYYY/MM/DD');
    }

    // 数値の場合（Excelの日付シリアル値）も処理
    if (typeof dateString === 'number' && dateString > 0) {
        return convertExcelDate(dateString);
    }

    // 日付オブジェクトの場合
    if (dateString instanceof Date && !isNaN(dateString.getTime())) {
        return dayjs(dateString).format('YYYY/MM/DD');
    }

    return '';
}

export async function GET() {
    // --- Vercelデプロイ時 (本番環境) の処理 ---
    if (process.env.NODE_ENV === 'production') {
        try {
            const filePath = path.join(process.cwd(), 'public', 'PharmacyData.xlsx');
            const fileBuffer = await fs.readFile(filePath);
            const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

            const facilitySheetName = workbook.SheetNames[1];
            const facilityWorksheet = workbook.Sheets[facilitySheetName];
            const facilityJson: any[] = XLSX.utils.sheet_to_json(facilityWorksheet);
            const facilitiesWithId = facilityJson.map((facility) => ({
                 ...facility, 
                 id: facility.facilityId, 
                 groupId: facility.groupId 
                }));
            const facilityMap = new Map(facilitiesWithId.map(f => [f.facilityName, f]));

            const pharmacySheetName = workbook.SheetNames[0];
            const pharmacyWorksheet = workbook.Sheets[pharmacySheetName];
            const pharmacyJsonData: any[] = XLSX.utils.sheet_to_json(pharmacyWorksheet);
            const processedPharmacyData = pharmacyJsonData.map((item) => {
                const facilityInfo = facilityMap.get(item.facilityName || '');
                return {
                    drugName: 
                    (item.drugName as string) || '',
                     price: Number(item.price) || 0,
                     facilityName: item.facilityName || '',
                     distance: Number(item.distance) || 0,
                     dispenseCount: Number(item.dispenseCount) || 0,
                     dispenseAmount: Number(item.dispenseAmount) || 0,
                     lastDispenseDate: convertExcelDate(item.lastDispenseDate, 'YYYY/MM/DD'),
                     facilityNumber: facilityInfo?.facilityNumber || '',
                     facilityId: facilityInfo?.id || '',
                };
            });

            const groupSheetName = workbook.SheetNames[2];
            const groupWorksheet = workbook.Sheets[groupSheetName];
            const groupJson: Group[] = XLSX.utils.sheet_to_json(groupWorksheet);

            const allGroupsSheetName = workbook.SheetNames[3];
            const allGroupsWorksheet = workbook.Sheets[allGroupsSheetName];
            const allGroupsJson: any[] = XLSX.utils.sheet_to_json(allGroupsWorksheet);
            const formattedAllGroups = allGroupsJson.map(row => ({
                id: String(row['id'] || ''),
                groupName: String(row['groupName'] || ''), 
                region: String(row['region'] || ''), 
                memberCount: Number(row['memberCount'] || 0), 
                updateDate: convertExcelDate(row['updateDate']), 
                status: String(row['status'] || ''), 
                button: String(row['button'] || '')
            }));

            const groupDetailsSheetName = workbook.SheetNames[4];
            const groupDetailsWorksheet = workbook.Sheets[groupDetailsSheetName];
            const groupDetailsJson: GroupDetail[] = XLSX.utils.sheet_to_json(groupDetailsWorksheet);

            return NextResponse.json({
                pharmacyData: processedPharmacyData,
                facilities: facilitiesWithId, 
                groups: groupJson, 
                allGroups: formattedAllGroups, 
                groupDetails: groupDetailsJson,
            });
        } catch (error) {
             console.error("Production (Excel) Error:", error);
             return new NextResponse("Internal Server Error in Production", { status: 500 });
        }
    } 
    // --- ローカル開発環境の処理 ---
    else {
        try {
            const spanner = new Spanner({
                projectId: 'test-medsearch',
                apiEndpoint: 'localhost:9010',
            });
            const instance = spanner.instance("test-instance");
            const database = instance.database("test-database");

            const [
                rawPharmacyDataResults, facilityResults, groupResults, allGroupResults, groupDetailResults,
            ] = await Promise.all([
                database.run("SELECT * FROM PharmacyData"),
                database.run("SELECT * FROM Facilities"),
                database.run("SELECT * FROM SimpleGroups"),
                database.run("SELECT * FROM AllGroups"),
                database.run("SELECT * FROM `Groups`"),
            ]);

            const rawPharmacyData = rawPharmacyDataResults[0].map((row) => row.toJSON());
            const facilities = facilityResults[0].map((row) => ({ ...row.toJSON(), id: row.toJSON().facilityId }));
            const groups = groupResults[0].map((row) => row.toJSON());
            const allGroups = allGroupResults[0].map((row) => {
                const json = row.toJSON();
                json.updateDate = formatSpannerDate(json.updateDate);
                return json;
            });
            const groupDetails = groupDetailResults[0].map((row) => row.toJSON());
            const facilityMap = new Map(facilities.map((f: Facility) => [f.facilityName, f]));

            const processedPharmacyData = rawPharmacyData.map((item: any) => {
                const facilityInfo = facilityMap.get(item.facilityName || '');
                return {
                    ...item,
                    facilityId: facilityInfo?.id || '',
                    facilityNumber: facilityInfo?.facilityNumber || '',
                    lastDispenseDate: formatSpannerDate(item.lastDispenseDate),
                };
            });
            
            return NextResponse.json({
                pharmacyData: processedPharmacyData, facilities, groups, allGroups, groupDetails,
            });
        } catch (error) {
            console.error("Development (Spanner) Error:", error);
            return NextResponse.json({ message: "Internal Server Error in Development", error: (error as Error).message }, { status: 500 });
        }
    }
}

// POSTリクエストを処理する関数 (データ追加)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, data } = body;

        // --- Vercelデプロイ時 (本番環境) の処理 ---
        if (process.env.NODE_ENV === 'production') {
            console.log('本番環境でのPOSTリクエスト受信 (書き込みなし):', data);
            return NextResponse.json({ message: `${type} created successfully (simulation)` }, { status: 201 });
        }
        
        // --- ローカル開発環境の処理 (Spannerへの書き込み) ---
        const spanner = new Spanner({
            projectId: 'test-medsearch',
            apiEndpoint: 'localhost:9010',
        });
        const instance = spanner.instance("test-instance");
        const database = instance.database("test-database");

        if (type === 'group') {
            // データベースに複数の変更を一度に書き込むトランザクションを開始
            await database.runTransaction(async (err, transaction) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if (!transaction) {
                    console.error('Transaction object is null');
                    return;
                }
                try {
                    // 1. Groupsテーブル (詳細情報) への書き込み
                    transaction.insert('Groups', {
                        groupId: data.groupId,
                        groupName: data.groupName,
                        postCode: data.postalCode,
                        prefecture: data.prefecture,
                        city: data.city,
                        addressLine1: data.addressLine1,
                        contactAddress: data.contact,
                        explanation: data.description,
                    });

                    // 2. AllGroupsテーブル (一覧表示用) への書き込み
                    const currentDateString = dayjs().format('YYYY-MM-DD');
                    console.log('Saving updateDate to AllGroups:', currentDateString);
                    transaction.insert('AllGroups', {
                        id: data.groupId,
                        groupName: data.groupName,
                        region: data.city,
                        memberCount: 0, 
                        updateDate: currentDateString, // SpannerのDATE型として保存（YYYY-MM-DD形式）
                        status: '',
                    });

                    // 3. SimpleGroupsテーブル (検索用) への書き込み ※いらないけど
                    transaction.insert('SimpleGroups', {
                        id: data.groupId,
                        name: data.groupName,
                    });

                    await transaction.commit();
                } catch (err) {
                    console.error('ERROR:', err);
                    await transaction.rollback();
                }
            });

        } else if (type === 'facility') {
            // TODO: 施設追加のロジックをここに追加
        } else {
            return NextResponse.json({ message: "無効なデータタイプです。" }, { status: 400 });
        }

        return NextResponse.json({ message: `${type} を作成しました。` }, { status: 201 });

    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({ message: "データの作成中にエラーが発生しました。", error: (error as Error).message }, { status: 500 });
    }
}