"use client";

import { useState } from "react";
import { Lead } from "@/hooks/types";
import LeadsTableComponent from "./LeadsTable.component";
import { LeadAddModal, FormStatus } from "../LeadsModal/LeadAddModal";
import { useLeads } from "@/features/hooks/UseLeads";
import { LeadAddFormValues } from "@/hooks/validation";

export default function LeadsTableContainer() {
  const { leads, isLoading, createLead, deleteLead, updateLead } = useLeads();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const formStatus = editingLead ? FormStatus.EDIT : FormStatus.NEW;

  const isModal = isAddOpen || editingLead !== null;

  const filteredLeads = leads.filter((lead: any) => {
    const q = search.toLowerCase();
    const matchesSearch =
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.company.toLowerCase().includes(q);
    const matchesFilter =
      filter === "all" || filter === "" ? true : lead.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleCreate = async (data: Omit<Lead, "id">) => {
    await createLead(data);
    setIsAddOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteLead(id);
  };

  const handleUpdate = async (id: string, data: LeadAddFormValues) => {
    await updateLead(id, data);
    setEditingLead(null);
  };

  const handleView = (id: string) => {
    const found = leads.find((item) => item.id === id);
    if (found) setSelectedLead(found);
  };

  const handleCloseModal = () => {
    setIsAddOpen(false);
    setEditingLead(null);
  };

  return (
    <>
      <LeadsTableComponent
        leads={filteredLeads}
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
        onEditClick={setEditingLead}
      />
      <LeadAddModal
        key={editingLead?.id ?? "new"}
        open={isModal}
        onClose={handleCloseModal}
        onSubmit={handleCreate}
        onEdit={handleUpdate}
        formStatus={formStatus}
        lead={editingLead}
      />
    </>
  );
}
