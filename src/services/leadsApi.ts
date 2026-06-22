import {Lead} from "@/hooks/types";
import {api} from "@/lib/api";


const leadsApi = {
    getLeads: async () => {
        const response = await api.get<Lead[]>("/api/leads");
        return response.data;
    },
    getLeadById: async (id: string) => {
        const response = await api.get<Lead>(`/api/leads/${id}`);
        return response.data;
    },
    createLead: async (data: Omit<Lead, "id">) => {
        const response = await api.post<Lead>('/api/leads', data);
        return response.data;
    },
    updateLead: async (id: string, data: Partial<Lead>) => {
        const response = await api.put<Lead>(`/api/leads/${id}`, data);
        return response.data;
    },
    deleteLead: async (id: string) => {
        const response = await api.delete(`/api/leads/${id}`);
        return response.data;
    }
}

export default leadsApi;