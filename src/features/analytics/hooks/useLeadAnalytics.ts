import { useQuery } from "@tanstack/react-query";
import { getLeadAnalyticsApi } from "../api/analyticsApi";

export const useLeadAnalytics = () => {
  const {
    data: analytics,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["leadAnalytics"],
    queryFn: () => getLeadAnalyticsApi.getLeadAnalytics(),
    retry: false,
  });
  return {
    analytics,
    isLoading: isPending,
    isError,
  };
};
