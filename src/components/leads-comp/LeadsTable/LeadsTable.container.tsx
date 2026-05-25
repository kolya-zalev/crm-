"use client";

import { useEffect, useState } from "react";
import { Lead } from "@/lib/types/lead";
import LeadsTableComponent from "@/components/leads-comp/LeadsTable/LeadsTable.component";
import { LeadAddModal } from "../LeadsModal/LeadAddModal";
export default function LeadsTableContainer() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((data) => {
        setLeads(data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const filterLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" || filter === "" ? true : lead.status === filter;

    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id: string) => {
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    setLeads(leads.filter((item) => item.id !== id));
  };
  const handleView = (id: string) => {
    const found = leads.find((item) => item.id === id);
    if (found) {
      setSelectedLead(found);
    }
  };

  const handleCreate = async (data: Omit<Lead, "id">) => {
    const response = await fetch("/api/leads/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const newLead =  await response.json();
    setLeads(prev => [...prev, newLead]);
    setIsAddOpen(false);
  };
  return (
    <>
      <LeadsTableComponent
        leads={filterLeads}
        search={search}
        filter={filter}
        selectedLead={selectedLead}
        isLoading={isLoading}
        onSearchChange={setSearch}
        onFilterChange={setFilter}
        onDelete={handleDelete}
        onView={handleView}
        onCloseView={() => setSelectedLead(null)}
        onAddClick={() => setIsAddOpen(true)}
      />
      <LeadAddModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreate}
      />
    </>
  );
}
