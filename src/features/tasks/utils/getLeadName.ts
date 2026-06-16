import { Lead } from "@/hooks/types";

export const getLeadName = (leads: Lead[], leadId: string): string => {
  return leads.find((l) => l.id === leadId)?.name || "No lead";
}
