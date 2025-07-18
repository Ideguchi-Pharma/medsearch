// medsearch/src/app/facility/[facilityName]/page.tsx
`use client`;

import { useParams } from "next/navigation";

export default function FacilityDetailPage() {
  const params = useParams();
  const facilityName = params?.facilityName as string;

  return (
    <div>
      <h1>{facilityName} の詳細ページ</h1>
      {/* ここに施設の詳細情報を表示する処理を追加 */}
    </div>
  );
}