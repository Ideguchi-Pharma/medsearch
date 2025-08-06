// medsearch/src/app/api/data/route.ts (修正後)
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 専門サーバー(localhost:3001)にデータを注文する
    const response = await fetch('http://localhost:3001/api/data');
    if (!response.ok) {
      throw new Error(`データサーバーからの応答エラー: ${response.statusText}`);
    }
    const data = await response.json();
    // 受け取ったデータをそのままブラウザに返す
    return NextResponse.json(data);

  } catch (error) {
    console.error("APIルートでのデータ中継に失敗:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}