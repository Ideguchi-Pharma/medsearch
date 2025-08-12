//日付をdayjs形式に変換する機能

import React from 'react';
import dayjs from 'dayjs';

// この部品が必要とする道具（Props）の設計図
interface FormattedDateProps {
  date: string | null | undefined; // 日付の文字列
  format?: string;                  // フォーマット形式（指定がなければ'YYYY/MM/DD'）
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date, format = 'YYYY/MM/DD' }) => {
  // もし日付データが空っぽなら、何も表示しない
  if (!date) {
    return null; 
  }

  // dayjsを使って、受け取った日付を指定のフォーマットに変換
  const formattedDate = dayjs(date).format(format);
  
  // もし変換に失敗したら（ありえない日付だった場合など）
  if (formattedDate === 'Invalid Date') {
    return <span className="text-gray-400">-</span>; // ハイフンを表示
  }

  // きれいにした日付を返す
  return <>{formattedDate}</>;
};

export default FormattedDate;