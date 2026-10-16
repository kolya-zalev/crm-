import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PeriodFilter } from "@/types/analytics";
import { getLeadAnalyticsApi } from "../api/analyticsApi";
import { getPeriodRange } from "../components/EmployeeTable/utils/getPeriodRange";

export const useEmployeeAnalytics = (filter: PeriodFilter) => {
  const { from, to } = useMemo(() => getPeriodRange(filter), [filter]);
  const { data, isPending, isError } = useQuery({
    queryKey: ["employeeAnalytics", from, to],
    queryFn: () => getLeadAnalyticsApi.getEmployeeAnalytics(from, to),
    retry: false,
  });
  return { data, isLoading: isPending, isError };
};
