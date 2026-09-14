"use client";

import { useState } from "react";
import { Lead } from "@/types";
import { LeadAddFormValues } from "@/validators";
import { useLeads } from "./hooks/useLeads";
import { filterLeads } from "./utils/filterLeads";
import { FormStatus } from "./components/LeadAddModal";
import { LeadsComponent } from "./Leads.component";
import { useSession } from "next-auth/react";

export function LeadsContainer() {
  const { leads, isLoading, createLead, deleteLead, updateLead } = useLeads();
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const formStatus = editingLead ? FormStatus.EDIT : FormStatus.NEW;
  const isModalOpen = isAddOpen || editingLead !== null;
  const filteredLeads = filterLeads(leads, search, filter, session?.user?.id);

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

  const handleCloseModal = () => {
    setIsAddOpen(false);
    setEditingLead(null);
  };

  return (
    <LeadsComponent
      filteredLeads={filteredLeads}
      search={search}
      filter={filter}
      isLoading={isLoading}
      isModalOpen={isModalOpen}
      formStatus={formStatus}
      editingLead={editingLead}
      isImportOpen={isImportOpen}
      onImportClick={() => setIsImportOpen(true)}
      onImportClose={() => setIsImportOpen(false)}
      onSearchChange={setSearch}
      onFilterChange={setFilter}
      onDelete={handleDelete}
      onAddClick={() => setIsAddOpen(true)}
      onEditClick={setEditingLead}
      onCloseModal={handleCloseModal}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
    />
  );
}
