import { EmployeeAnalyticsRow } from "@/types/analytics";

export type EmployeeTableRowProps = {
  row: EmployeeAnalyticsRow;
  isSummary?: boolean;
  hidePeriodMetrics?: boolean;
};
