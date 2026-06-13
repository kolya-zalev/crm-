import { Lead } from "@/hooks/types";

export const filterLostLeads = (leads: Lead[]): Lead[] => {
    return leads.filter(lead => lead.status === 'lost')
}