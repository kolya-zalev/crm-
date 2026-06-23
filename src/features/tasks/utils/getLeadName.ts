import { Lead } from "@/types";

export function getLeadName(leads: Lead[], leadId: string): string {
  return leads.find((l) => l.id === leadId)?.name || "No lead";
}
