import type { EmployeeAnalyticsRow } from "@/types/analytics";
import type { EmployeeSortKey, SortDirection } from "../EmployeeTable.types";

const collator = new Intl.Collator();

const compareValues = (a: string | number, b: string | number): number =>
  typeof a === "string" && typeof b === "string"
    ? collator.compare(a, b)
    : Number(a) - Number(b);

export const sortEmployeeRows = (
  rows: EmployeeAnalyticsRow[],
  key: EmployeeSortKey,
  direction: SortDirection,
): EmployeeAnalyticsRow[] => {
  const factor = direction === "asc" ? 1 : -1;

  return [...rows].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === null || bValue === null) {
      return Number(aValue === null) - Number(bValue === null);
    }
    return compareValues(aValue, bValue) * factor;
  });
};
