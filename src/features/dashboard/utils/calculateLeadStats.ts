import { Lead } from "@/hooks/types";

export type LeadStats = Record<string, number>;

export function calculateLeadStats(leads: Lead[]): LeadStats {
  return {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    won: leads.filter((l) => l.status === "won").length,
    lost: leads.filter((l) => l.status === "lost").length,
  };
}
