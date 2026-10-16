import { api } from "@/lib/api";
import { Analytics, EmployeeAnalytics } from "@/types/analytics";

export const getLeadAnalyticsApi = {
  getLeadAnalytics: async () => {
    const response = await api.get<Analytics>("/api/analytics/leads");
    return response.data;
  },
  getEmployeeAnalytics: async (from: string, to: string) => {
    const response = await api.get<EmployeeAnalytics>(
      "/api/analytics/employees",
      { params: { from, to } },
    );
    return response.data;
  },
};
