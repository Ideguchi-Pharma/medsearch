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
function formatSpannerDate(dateObject: any): string {
    if (dateObject && typeof dateObject === 'object' && dateObject.value && typeof dateObject.value === 'string') {
        return dayjs(dateObject.value).format('YYYY/MM/DD');
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
            const facilitiesWithId = facilityJson.map((facility) => ({ ...facility, id: facility.uniqueId, groupId: facility.groupId }));
            const facilityMap = new Map(facilitiesWithId.map(f => [f.facilityName, f]));

            const pharmacySheetName = workbook.SheetNames[0];
            const pharmacyWorksheet = workbook.Sheets[pharmacySheetName];
            const pharmacyJsonData: any[] = XLSX.utils.sheet_to_json(pharmacyWorksheet);
            const processedPharmacyData = pharmacyJsonData.map((item) => {
                const facilityInfo = facilityMap.get(item.facilityName || '');
                return {
                    drugName: (item.drugName as string) || '', price: Number(item.price) || 0, facilityName: item.facilityName || '', distance: Number(item.distance) || 0, dispenseCount: Number(item.dispenseCount) || 0, dispenseAmount: Number(item.dispenseAmount) || 0, lastDispenseDate: convertExcelDate(item.lastDispenseDate, 'YYYY/MM/DD'), facilityNumber: facilityInfo?.facilityNumber || '', facilityId: facilityInfo?.id || '',
                };
            });

            const groupSheetName = workbook.SheetNames[2];
            const groupWorksheet = workbook.Sheets[groupSheetName];
            const groupJson: Group[] = XLSX.utils.sheet_to_json(groupWorksheet);

            const allGroupsSheetName = workbook.SheetNames[3];
            const allGroupsWorksheet = workbook.Sheets[allGroupsSheetName];
            const allGroupsJson: any[] = XLSX.utils.sheet_to_json(allGroupsWorksheet);
            const formattedAllGroups = allGroupsJson.map(row => ({
                id: String(row['id'] || ''), groupName: String(row['groupName'] || ''), region: String(row['region'] || ''), memberCount: Number(row['memberCount'] || 0), updateDate: convertExcelDate(row['updateDate']), status: String(row['status'] || ''), button: String(row['button'] || '')
            }));

            const groupDetailsSheetName = workbook.SheetNames[4];
            const groupDetailsWorksheet = workbook.Sheets[groupDetailsSheetName];
            const groupDetailsJson: GroupDetail[] = XLSX.utils.sheet_to_json(groupDetailsWorksheet);

            return NextResponse.json({
                pharmacyData: processedPharmacyData, facilities: facilitiesWithId, groups: groupJson, allGroups: formattedAllGroups, groupDetails: groupDetailsJson,
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
            const facilities = facilityResults[0].map((row) => ({ ...row.toJSON(), id: row.toJSON().uniqueId }));
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