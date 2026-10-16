import type { EmployeeAnalyticsRow } from "@/types/analytics";

export const searchEmployees = (
  rows: EmployeeAnalyticsRow[],
  search: string,
) => {
  const searchLower = search.trim().toLowerCase();
  if (!searchLower) return rows;
  return rows.filter((row) => row.userName.toLowerCase().includes(searchLower));
};
