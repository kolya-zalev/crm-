"use client";

import { useState } from "react";
import type { PeriodFilter } from "@/types/analytics";
import { useEmployeeAnalytics } from "../../hooks/useEmployeeAnalytics";
import { EmployeeTableComponent } from "./EmployeeTable.component";
import type { EmployeeSortKey, SortDirection } from "./EmployeeTable.types";
import { searchEmployees } from "./utils/searchEmpoyees";
import { sortEmployeeRows } from "./utils/sortEmployeeRows";

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
      data={data}
      rows={rows}
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
