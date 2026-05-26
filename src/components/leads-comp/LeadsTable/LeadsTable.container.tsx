"use client";

import { useEffect, useState } from "react";
import { Lead } from "@/lib/types/lead";
import LeadsTableComponent from "@/components/leads-comp/LeadsTable/LeadsTable.component";
import { LeadAddModal } from "../LeadsModal/LeadAddModal";
import { useCreateLead } from "@/hooks/useCreateLead";
import { FormStatus } from "@/components/leads-comp/LeadsModal/LeadAddModal";
import { LeadAddFormValues } from "../LeadsFormEditor/LeadsFormEditor.validation";

export default function LeadsTableContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [fakeLeads, setFakeLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((data) => {
        setFakeLeads(data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const { leads, createLead, updateLead, deleteLead, getFilteredLeads } = useCreateLead(fakeLeads);


  const filterLeads = getFilteredLeads(search);

  const handleDelete = async (id: string) => {
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    deleteLead(id);
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

    const newLead = await response.json();
    createLead(newLead);
    setIsAddOpen(false);
  };

  const handleUpdate = async (id: string, data: LeadAddFormValues) => {
    updateLead(id, data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        onEdit={handleUpdate}
        formStatus={FormStatus.NEW}
      />
    </>
  );
}
