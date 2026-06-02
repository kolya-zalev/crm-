import { useState, useEffect } from "react";
import { Lead } from "@/hooks/types";

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((data) => {
        setLeads(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const createLead = async (data: Omit<Lead, "id">) => {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const newLead = await response.json();
    setLeads((prev) => [...prev, newLead]);
    return newLead;
  };

  const deleteLead = async (id: string) => {
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLead = async (id: string, data: Partial<Lead>) => {
    const response = await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updatedLead = await response.json();
    setLeads((prev) => prev.map((l) => (l.id === id ? updatedLead : l)));
    return updatedLead;
  };

  return { leads, isLoading, createLead, deleteLead, updateLead };
}
