import {api} from "@/lib/api";
import {Activity} from "@/hooks/types";

const activitiesApi = {
    getActivitiesByLead: async(leadId: string) => {
        const response = await api.get<Activity[]>(`/api/leads/${leadId}/activities`);
        return response.data;
    },
}
export default activitiesApi;