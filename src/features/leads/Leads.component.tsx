import { LeadsTable } from "./components/LeadsTable";
import { LeadAddModal } from "./components/LeadAddModal";
import { LeadsComponentProps } from "./Leads.types";

export const LeadsComponent = ({
  filteredLeads,
  search,
  filter,
  isLoading,
  total,
  page,
  pageCount,
  pageSize,
  isModalOpen,
  formStatus,
  editingLead,
  sort,
  visibleColumns,
  allViews,
  activeViewId,
  applyView,
  saveCurrentView,
  deleteView,
  onToggleColumn,
  onSortChange,
  onSearchChange,
  onFilterChange,
  onPageChange,
  onPageSizeChange,
  onDelete,
  onAddClick,
  onEditClick,
  onCloseModal,
  onCreate,
  onUpdate,
}: LeadsComponentProps) => {
  return (
    <>
      <LeadsTable
        leads={filteredLeads}
        search={search}
        filter={filter}
        isLoading={isLoading}
        total={total}
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        sort={sort}
        visibleColumns={visibleColumns}
        allViews={allViews}
        activeViewId={activeViewId}
        applyView={applyView}
        saveCurrentView={saveCurrentView}
        deleteView={deleteView}
        onToggleColumn={onToggleColumn}
        onSortChange={onSortChange}
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
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
