import { Lead } from "@/types";

export const createLeadNameLookup = (leads: Lead[]) => {
  const leadNameById = new Map(leads.map((lead) => [lead.id, lead.name]));

  return (leadId: string) => leadNameById.get(leadId) ?? "Unknown lead";
};
