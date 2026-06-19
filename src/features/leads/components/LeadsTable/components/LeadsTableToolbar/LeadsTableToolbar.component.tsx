"use client";
import { LeadsTableComponentProps } from "../../LeadsTable.types";
import { LeadsSearch } from "@/features/leads/components/LeadsSearch";
import { LeadsFilter } from "@/features/leads/components/LeadsFilter";
import { Button } from "@/components/ui/button";
import { LeadsTableColumnToggle } from "./components/LeadsTableColumnToggle/LeadsTableColumnToggle.components";
import { LeadsTableViewsSelect } from "./components/LeadsTableViewsSelect";
import { SaveViewDialog } from "./components/SaveViewDialog";
import { LeadImportDialog } from "@/features/leads/components/LeadImport/LeadImportDialog";
import { usePermission } from "@/features/auth/permissions/hooks/usePermission";
type LeadsTableToolbarProps = Pick<
  LeadsTableComponentProps,
  | "search"
  | "filter"
  | "isLoading"
  | "total"
  | "onSearchChange"
  | "onFilterChange"
  | "onAddClick"
  | "visibleColumns"
  | "onToggleColumn"
  | "allViews"
  | "activeViewId"
  | "applyView"
  | "onImportLeads"
  | "saveCurrentView"
  | "deleteView"
>;

export const LeadsTableToolbar = ({
  search,
  filter,
  isLoading,
  total,
  onSearchChange,
  onFilterChange,
  onAddClick,
  visibleColumns,
  onToggleColumn,
  allViews,
  activeViewId,
  applyView,
  saveCurrentView,
  deleteView,
  onImportLeads,
}: LeadsTableToolbarProps) => {
  const activeView = allViews.find((view) => view.id === activeViewId);
  const canDeleteView = Boolean(activeView && !activeView.isBuiltIn);
  const canImportLeads = usePermission("leads:import");
  const canAddLead = usePermission("leads:create");
  const handleDeleteView = () => {
    if (!activeViewId || !canDeleteView) {
      return;
    }

    deleteView(activeViewId);
  };

  return (
    <div className="flex flex-row flex-wrap items-center gap-2">
      <LeadsTableViewsSelect
        allViews={allViews}
        activeViewId={activeViewId}
        onApplyView={applyView}
      />
      <SaveViewDialog onSaveView={saveCurrentView} />
      {canDeleteView && (
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={handleDeleteView}
        >
          Delete view
        </Button>
      )}
      <LeadsSearch value={search} onChange={onSearchChange} />
      <LeadsFilter value={filter} onChange={onFilterChange} />
      <LeadsTableColumnToggle
        visibleColumns={visibleColumns}
        onToggleColumn={onToggleColumn}
      />
      <p className="ml-auto p-2 text-sm font-medium text-gray-600">
        Total Leads: {isLoading ? "..." : total}
      </p>
      {canImportLeads && <LeadImportDialog onImportLeads={onImportLeads} />}
      {canAddLead && (
        <Button
          className="cursor-pointer rounded-xl bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600"
          onClick={onAddClick}
        >
          Add Lead
        </Button>
      )}
    </div>
  );
};
