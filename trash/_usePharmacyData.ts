'use client';

import { useData } from '@/contexts/DataContext'; // 作成したuseDataフックをインポート

// 外部で使えるように、PharmacyDataの設計図をエクスポート
export type { PharmacyData } from '@/contexts/DataContext';

// お薬データ準備専門のカスタムフック
export function usePharmacyData() {
  // fetchする代わりにContextからデータを取得
  const { pharmacyData, error: loadingError } = useData();
  
  // 準備ができたデータと、エラー情報を返す
  return { pharmacyData, loadingError };
}