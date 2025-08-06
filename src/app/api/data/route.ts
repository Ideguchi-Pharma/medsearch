// src/app/api/data/route.ts

import { Spanner } from "@google-cloud/spanner";
import { NextResponse } from "next/server";

// このファイルはサーバーサイドでのみ実行されます

export async function GET() {
  // GETリクエストが来たら、この関数が動く
  try {
    // Emulatorに接続するための設定
    const spanner = new Spanner({
      projectId: "test-medsearch",
    });
    const instance = spanner.instance("test-instance");
    const database = instance.database("test-database");

    // 各テーブルからデータを取得する処理を並行して実行
    const [
      pharmacyDataResults,
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

    // 取得したデータをJSON形式に変換
    const pharmacyData = pharmacyDataResults[0].map((row) => row.toJSON());
    const facilities = facilityResults[0].map((row) => ({...row.toJSON(), id: row.toJSON().uniqueId}));
    const groups = groupResults[0].map((row) => row.toJSON());
    const allGroups = allGroupResults[0].map((row) => {
        const json = row.toJSON();
        json.updateDate = json.updateDate?.value || null;
        return json;
    });
    const groupDetails = groupDetailResults[0].map((row) => row.toJSON());

    // 変換したデータをまとめてブラウザ（DataContext）に返す
    return NextResponse.json({
      pharmacyData,
      facilities,
      groups,
      allGroups,
      groupDetails,
    });

  } catch (error) {
    console.error("Spannerからのデータ取得に失敗しました:", error);
    // エラーが発生した場合は、エラーメッセージを返す
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}