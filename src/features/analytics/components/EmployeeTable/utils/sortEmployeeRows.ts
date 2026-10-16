import type { EmployeeAnalyticsRow } from "@/types/analytics";
import type { EmployeeSortKey, SortDirection } from "../EmployeeTable.types";

export const sortEmployeeRows = (
  rows: EmployeeAnalyticsRow[],
  key: EmployeeSortKey,
  direction: SortDirection,
): EmployeeAnalyticsRow[] => {
  const factor = direction === "asc" ? 1 : -1;

  return [...rows].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return 1;
    if (bValue === null) return -1;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue) * factor;
    }
    return ((aValue as number) - (bValue as number)) * factor;
  });
};
