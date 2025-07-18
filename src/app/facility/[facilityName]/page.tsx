'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import * as XLSX from 'xlsx';

export default function FacilityDetailPage() {
  const params = useParams();
  const facilityName = decodeURIComponent(params.facilityName as string);
  const [facility, setFacility] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/PharmacyData.xlsx');
      const arrayBuffer = await res.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[1]; // 2シート目
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const found = data.find((item: any) => item.facilityName === facilityName);
      setFacility(found);
    };
    fetchData();
  }, [facilityName]);

  if (!facility) return <div>読み込み中...</div>;

  // facilityName～permitNumberまでのカラムのみ抽出
  const keys = Object.keys(facility);
  const start = keys.indexOf('facilityName');
  const end = keys.indexOf('permitNumber');
  const displayKeys = (start !== -1 && end !== -1)
    ? keys.slice(start, end + 1)
    : keys;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{facility['facilityName']} の詳細</h1>
      <table className="min-w-full border border-gray-300">
        <tbody>
          {displayKeys.map((key) => (
            <tr key={key}>
              <th className="border px-4 py-2 bg-gray-100 text-left">{key}</th>
              <td className="border px-4 py-2">{facility[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 