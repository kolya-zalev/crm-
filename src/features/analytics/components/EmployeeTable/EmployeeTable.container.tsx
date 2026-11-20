"use client";

import { useState } from "react";
import type { PeriodFilter } from "@/types/analytics";
import { useEmployeeAnalytics } from "../../hooks/useEmployeeAnalytics";
import { EmployeeTableComponent } from "./EmployeeTable.component";
import type { EmployeeSortKey, SortDirection } from "./EmployeeTable.types";
import { searchEmployees } from "./utils/searchEmpoyees";
import { sortEmployeeRows } from "./utils/sortEmployeeRows";
import { getTableStatus } from "./utils/getTableStatus";
import { TableStatus } from "./EmployeeTable.types";
export const EmployeeTableContainer = () => {
  const [period, setPeriod] = useState<PeriodFilter>("this_month");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<EmployeeSortKey>("open");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const { data, isLoading, isError } = useEmployeeAnalytics(period);
  const columnCount = 12;

  const rows = sortEmployeeRows(
    searchEmployees(data?.rows ?? [], search),
    sortKey,
    sortDirection,
  );
  const tableStatus = getTableStatus({
    isLoading,
    isError,
    hasData: Boolean(data),
    rowsCount: rows.length,
  });
  const isLoaded =
    tableStatus === TableStatus.Ready || tableStatus === TableStatus.Empty;
  const visibleRows = tableStatus === TableStatus.Ready ? rows : [];
  const unassignedRow = isLoaded ? data?.unassigned : undefined;
  const emptyText = search.trim() ? "No matches" : "No employees yet";
  const overdueText = data
    ? ` Overdue threshold: ${data.overdueThresholdDays} days.`
    : "";

  const onSort = (key: EmployeeSortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection(key === "userName" ? "asc" : "desc");
  };

  return (
    <EmployeeTableComponent
      tableStatus={tableStatus}
      data={data}
      rows={visibleRows}
      unassignedRow={unassignedRow}
      emptyText={emptyText}
      overdueText={overdueText}
      isLoading={isLoading}
      isError={isError}
      period={period}
      onPeriodChange={setPeriod}
      search={search}
      onSearchChange={setSearch}
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={onSort}
      columnCount={columnCount}
    />
  );
};
