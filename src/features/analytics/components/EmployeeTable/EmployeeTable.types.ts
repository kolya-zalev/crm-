import type {
  EmployeeAnalytics,
  EmployeeAnalyticsRow,
  PeriodFilter,
} from "@/types/analytics";

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
