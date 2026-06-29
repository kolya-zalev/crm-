import type { Activity } from "@/types";
import { api } from "@/lib/api";

const activitiesApi = {
  getActivitiesByLead: async (leadId: string) => {
    const response = await api.get<Activity[]>(
      `/api/leads/${leadId}/activities`,
    );
    return response.data;
  },
};

export default activitiesApi;
