// src/app/api/data/route.ts (真の最終解決版)

import { Spanner } from "@google-cloud/spanner";
import { NextResponse } from "next/server";
import type { Facility, PharmacyData } from "@/contexts/DataContext"; // 型定義をインポート

export async function GET() {
  try {
    const spanner = new Spanner({ projectId: "test-medsearch" });
    const instance = spanner.instance("test-instance");
    const database = instance.database("test-database");

    // 1. まず、すべてのテーブルから「生」のデータを並行して取得します
    const [
      rawPharmacyDataResults,
      facilityResults,
      groupResults,
      allGroupResults,
      groupDetailResults,
    ] = await Promise.all([
      database.run("SELECT * FROM PharmacyData"),
      database.run("SELECT * FROM Facilities"),
      database.run("SELECT * FROM SimpleGroups"),
      database.run("SELECT * FROM AllGroups"),
      database.run("SELECT * FROM `Groups`"),
    ]);

    // 2. 取得した生のデータを、一旦使いやすいJSON形式に変換します
    const rawPharmacyData = rawPharmacyDataResults[0].map((row) => row.toJSON());
    const facilities = facilityResults[0].map((row) => ({ ...row.toJSON(), id: row.toJSON().uniqueId }));
    const groups = groupResults[0].map((row) => row.toJSON());
    const allGroups = allGroupResults[0].map((row) => {
        const json = row.toJSON();
        json.updateDate = json.updateDate?.value || null;
        return json;
    });
    const groupDetails = groupDetailResults[0].map((row) => row.toJSON());

    // --- ▼▼▼ ここが、サーバー側で責任を持つ「調理」の工程です ▼▼▼ ---

    // 3. 施設名と施設情報の対応表（マップ）を作成します
    const facilityMap = new Map(facilities.map((f: Facility) => [f.facilityName, f]));

    // 4. 生の医薬品データ(pharmacyData)を元に、フロントエンドが求める完璧なデータ(processedPharmacyData)を生成します
    const processedPharmacyData = rawPharmacyData.map((item: any) => {
        const facilityInfo = facilityMap.get(item.facilityName || '');
        
        // 日付オブジェクトを、きれいな文字列に変換します
        const dateObject = item.lastDispenseDate as any;
        const dateValue = dateObject && typeof dateObject === 'object' && dateObject.value 
            ? dateObject.value 
            : item.lastDispenseDate;
        const formattedDate = String(dateValue || 'N/A').replace(/-/g, '/');

        return {
          ...item, // 元のデータはそのまま
          // 不足していた facilityId と facilityNumber を追加
          facilityId: facilityInfo?.id || '',
          facilityNumber: facilityInfo?.facilityNumber || '',
          // 日付を整形済みの文字列で上書き
          lastDispenseDate: formattedDate,
        };
    });
    
    // --- ▲▲▲ 「調理」完了 ▲▲▲ ---


    // 5. 調理済みの完璧なデータを、フロントエンドに返します
    return NextResponse.json({
      pharmacyData: processedPharmacyData, // ← 加工済みのデータを渡す
      facilities,
      groups,
      allGroups,
      groupDetails,
    });

  } catch (error) {
    console.error("APIルートでのデータ取得・加工に失敗:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}