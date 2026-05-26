import { useState } from "react";
import { Lead } from "@/lib/types/lead";

type UseCreateLeadResult = {
  leads: Lead[];
  createLead: (lead: Omit<Lead, "id">) => Lead;
  updateLead: (id: string, patch: Partial<Lead>) => Lead | undefined;
  deleteLead: (id: string) => Lead | undefined;
  getFilteredLeads: (filter: string) => Lead[];
};
const createTempId = () => {
  return crypto.randomUUID();
};

export const useCreateLead = (defaultLeads: Lead[]): UseCreateLeadResult => {
  const [leads, setLeads] = useState<Lead[]>(() =>
    defaultLeads.map((lead) => ({ ...lead })),
  );

  const createLead = (lead: Omit<Lead, "id">) => {
    const newLead = { ...lead, id: createTempId()};
    setLeads((prev) => [...prev, newLead]);
    return newLead;
  };
  const deleteLead = (id: string) => {
    if (!leads.find((l) => l.id === id)) {
      return undefined;
    }
    const deletedLead = leads.find((l) => l.id === id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    return deletedLead;
  };
  const updateLead = (id: string, patch: Partial<Lead>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    return leads.find((l) => l.id === id);
  };
  const getFilteredLeads = (filter: string) => {
    return leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(filter.toLowerCase()) ||
        l.email.toLowerCase().includes(filter.toLowerCase()) ||
        l.company.toLowerCase().includes(filter.toLowerCase());
      const matchesFilter =
        filter === "all" || filter === "" ? true : l.status === filter;
      return matchesSearch && matchesFilter;
    });
  };
  return {
    leads,
    createLead,
    updateLead,
    deleteLead,
    getFilteredLeads,
  };
};
