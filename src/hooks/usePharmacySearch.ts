'use client';

import { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { useData } from '@/contexts/DataContext';
import type { PharmacyData, Facility, Group } from '@/contexts/DataContext';
import { convertHiraganaToKatakana } from '@/utils/converters';

export function usePharmacySearch() {
  const { pharmacyData: rawPharmacyData, facilities, groups, isLoading: isDataLoading, error: loadingError } = useData();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof PharmacyData | null>('distance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isCompact, setIsCompact] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 2. Spannerから来た日付の「形式」をアプリが使える形に変換（翻訳）します
  const pharmacyData = useMemo(() => {
    // rawPharmacyData (Spannerからの元のデータ) がなければ、空の配列を返す
    if (!rawPharmacyData) return [];
    
    // 配列の各要素（item）に対して処理を実行
    return rawPharmacyData.map(item => {
      const dateObject = item.lastDispenseDate as any;
      // Spannerからのデータ（オブジェクト形式）か、Excelからのデータ（文字列）かを判断
      const dateValue = dateObject && typeof dateObject === 'object' && dateObject.value 
        ? dateObject.value // オブジェクトなら .value を取り出す
        : item.lastDispenseDate; // 文字列ならそのまま使う

      return {
        ...item, // 元のデータはそのままに
        // lastDispenseDateだけを、整形した文字列で上書きする
        lastDispenseDate: String(dateValue || 'N/A').replace(/-/g, '/'),
      };
    });
  }, [rawPharmacyData]); // この処理は rawPharmacyData が変わった時だけ実行される

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const savedSearchTerm = sessionStorage.getItem('searchTerm') || '';
      const savedGroup = sessionStorage.getItem('selectedGroup');
      setSearchTerm(savedSearchTerm);
      if (savedGroup && savedGroup !== 'null') {
        setSelectedGroup(JSON.parse(savedGroup));
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) sessionStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm, isMounted]);

  useEffect(() => {
    if (isMounted) sessionStorage.setItem('selectedGroup', JSON.stringify(selectedGroup));
  }, [selectedGroup, isMounted]);

  // 並び替えの操作
  const handleSort = (columnKey: keyof PharmacyData) => {
    if (sortColumn === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortOrder('asc');
    }
  };

  // 絞り込みと並び替えの計算（useFilteredPharmacies.tsの役割をここに統合）
  const filteredPharmacyData = useMemo(() => {
    if (isDataLoading || !selectedGroup) {
      return [];
    }

    const facilityIdsInGroup = facilities
      .filter(f => f.groupId === selectedGroup.id)
      .map(f => f.id);

    let results = pharmacyData.filter(p => facilityIdsInGroup.includes(p.facilityId));

    if (searchTerm.length >= 2) {
      const searchKeywords = searchTerm
        .toLowerCase()
        .split(/\s+/)
        .filter(term => term)
        .map(term => convertHiraganaToKatakana(term));
      
      if (searchKeywords.length > 0) {
        results = results.filter(pharmacy => {
          const normalizedDrugName = convertHiraganaToKatakana(pharmacy.drugName.toLowerCase());
          return searchKeywords.every(keyword => normalizedDrugName.includes(keyword));
        });
      }
    }

    if (sortColumn) {
      results.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (sortColumn === 'lastDispenseDate') {
            const dateA = dayjs(aValue, 'YYYY/MM/DD');
            const dateB = dayjs(bValue, 'YYYY/MM/DD');
            if (dateA.isValid() && dateB.isValid()) {
              return sortOrder === 'asc' ? dateA.diff(dateB) : dateB.diff(dateA);
            }
          }
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        return 0;
      });
    }

    return results;
  }, [searchTerm, pharmacyData, facilities, selectedGroup, sortColumn, sortOrder, isDataLoading]);

  // ページネーション用のデータ切り出し
  const paginatedData = useMemo(() => {
    return filteredPharmacyData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [filteredPharmacyData, currentPage, rowsPerPage]);


  // page.tsxで必要なものをまとめて返す
  return {
    searchTerm,
    setSearchTerm,
    selectedGroup,
    setSelectedGroup,
    groups,
    loadingError,
    sortColumn,
    sortOrder,
    handleSort,
    isCompact,
    setIsCompact,
    paginatedData,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalRows: filteredPharmacyData.length,
  };
}