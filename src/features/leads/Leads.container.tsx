"use client";

import { useState } from "react";
import { Lead, NewLead } from "@/types";
import { LeadAddFormValues } from "@/validators";
import { useLeads } from "./hooks/useLeads";
import { filterLeads } from "./utils/filterLeads";
import { FormStatus } from "./components/LeadAddModal";
import { LeadsComponent } from "./Leads.component";
import { useSession } from "@/lib/auth-client";
import { canMutateLeads } from "./utils/canMutate";
export const LeadsContainer = () => {
  const { leads, isLoading, createLead, deleteLead, updateLead } = useLeads();
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const canMutate = canMutateLeads(session?.user?.role);
  const formStatus = editingLead ? FormStatus.EDIT : FormStatus.NEW;
  const isModalOpen = isAddOpen || editingLead !== null;
  const filteredLeads = filterLeads(leads, search, filter, session?.user?.id);

  const handleCreate = async (data: NewLead) => {
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
      canMutate={canMutate}
      onImportClick={() => setIsImportOpen(true)}
      onImportClose={() => setIsImportOpen(false)}
      onSearchChange={setSearch}
      onFilterChange={setFilter}
      onDelete={handleDelete}
      onAddClick={() => setIsAddOpen(true)}
      onEditClick={canMutate ? setEditingLead : () => {}}
      onCloseModal={handleCloseModal}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
    />
  );
};
