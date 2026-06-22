import { LeadsTable } from "./components/LeadsTable";
import { LeadAddModal } from "./components/LeadAddModal";
import { LeadsComponentProps } from "./Leads.types";

export function LeadsComponent({
  filteredLeads,
  search,
  filter,
  isLoading,
  isModalOpen,
  formStatus,
  editingLead,
  onSearchChange,
  onFilterChange,
  onDelete,
  onAddClick,
  onEditClick,
  onCloseModal,
  onCreate,
  onUpdate,
}: LeadsComponentProps) {
  return (
    <>
      <LeadsTable
        leads={filteredLeads}
        search={search}
        filter={filter}
        isLoading={isLoading}
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
        onDelete={onDelete}
        onAddClick={onAddClick}
        onEditClick={onEditClick}
      />
      <LeadAddModal
        key={editingLead?.id ?? "new"}
        open={isModalOpen}
        onClose={onCloseModal}
        onSubmit={onCreate}
        onEdit={onUpdate}
        formStatus={formStatus}
        lead={editingLead}
      />
    </>
  );
}
