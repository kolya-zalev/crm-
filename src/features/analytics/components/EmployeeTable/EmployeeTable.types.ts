import type {
  EmployeeAnalytics,
  EmployeeAnalyticsRow,
  PeriodFilter,
} from "@/types/analytics";
export enum TableStatus {
  Loading = "loading",
  Error = "error",
  Empty = "empty",
  Ready = "ready",
}
export type EmployeeSortKey =
  | "userName"
  | "open"
  | "overdue"
  | "created"
  | "won"
  | "lost"
  | "winRate"
  | "medianTimeToWinDays"
  | "avgTimeToWinDays";

export type SortDirection = "asc" | "desc";

export type EmployeeTableComponentProps = {
  tableStatus: TableStatus;
  unassignedRow: EmployeeAnalyticsRow | undefined;
  emptyText: string;
  overdueText: string;
  data: EmployeeAnalytics | undefined;
  rows: EmployeeAnalyticsRow[];
  isLoading: boolean;
  isError: boolean;
  period: PeriodFilter;
  onPeriodChange: (period: PeriodFilter) => void;
  search: string;
  onSearchChange: (search: string) => void;
  sortKey: EmployeeSortKey;
  sortDirection: SortDirection;
  onSort: (key: EmployeeSortKey) => void;
  columnCount: number;
};
