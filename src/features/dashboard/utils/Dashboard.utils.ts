import { Lead } from "@/hooks/types";

export type LeadStats = Record<string, number>;

const InitialStats: LeadStats = {
  total: 0,
  new: 0,
  contacted: 0,
  qualified: 0,
  won: 0,
  lost: 0,
};

export const calculateLeadStats = (leads: Lead[]): LeadStats => {
  return leads.reduce(
    (acc, lead) => {
      acc.total += 1;
      acc[lead.status] = (acc[lead.status] ?? 0) + 1;
      return acc;
    },
    { ...InitialStats },
  );
};
