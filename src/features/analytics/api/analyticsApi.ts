import { api } from "@/lib/api";
import { Analytics } from "@/types/analytics";

export const getLeadAnalyticsApi = {
  getLeadAnalytics: async () => {
    const response = await api.get<Analytics>("/api/analytics/leads");
    return response.data;
  },
};
