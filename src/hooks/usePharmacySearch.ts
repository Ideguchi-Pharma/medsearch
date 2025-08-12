// 施設データを取得する機能部分

'use client';

import { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { useData } from '@/contexts/DataContext';
import type { PharmacyData, Group } from '@/contexts/DataContext';
import { convertHiraganaToKatakana } from '@/utils/converters';

export function usePharmacySearch() {
  // DataContextから受け取るデータは、すでにサーバー側で完璧に整形されている
  const { pharmacyData, facilities, groups, isLoading: isDataLoading, error: loadingError } = useData();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof PharmacyData | null>('distance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isCompact, setIsCompact] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 日付の翻訳処理は、サーバーが担当するので、ここでは不要

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

  const handleSort = (columnKey: keyof PharmacyData) => {
    if (sortColumn === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortOrder('asc');
    }
  };

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

  const paginatedData = useMemo(() => {
    return filteredPharmacyData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [filteredPharmacyData, currentPage, rowsPerPage]);

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