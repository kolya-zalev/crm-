"use client";

import { useState } from "react";
import { Lead } from "@/hooks/types";
import { LeadAddFormValues } from "@/validators";
import { useLeads } from "./hooks/useLeads";
import { applyLeadsTableState } from "./components/LeadsTable/utils/applyLeadsTableState";
import { FormStatus } from "./components/LeadAddModal";
import { LeadsComponent } from "./Leads.component";
import { DefaultTableState } from "./components/LeadsTable/LeadsTable.constants";
import type { LeadsTableState } from "./components/LeadsTable/LeadsTable.types";
import {
  LeadColumn,
  LeadColumns,
} from "./components/LeadsTable/LeadsTable.constants";
import { useLeadsSavedViews } from "./components/LeadsTable/SavedView/hooks/useLeadsSavedViews";

export const LeadsContainer = () => {
  const { leads, isLoading, createLead, deleteLead, updateLead } = useLeads();
  const [tableState, setTableState] =
    useState<LeadsTableState>(DefaultTableState);
  const {
    allViews,
    activeViewId,
    applyView,
    saveCurrentView,
    deleteView,
    clearActiveView,
  } = useLeadsSavedViews({ tableState, setTableState });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const formStatus = editingLead ? FormStatus.EDIT : FormStatus.NEW;
  const isModalOpen = isAddOpen || editingLead !== null;
  const {
    rows: filteredLeads,
    total,
    pageCount,
  } = applyLeadsTableState(leads, tableState);

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

  const handleSortChange = (column: LeadColumn) => {
    clearActiveView();
    setTableState((prev) => {
      const isSameColumn = prev.sort.column === column;
      const direction = isSameColumn
        ? prev.sort.direction === "asc"
          ? "desc"
          : "asc"
        : "asc";
      return {
        ...prev,
        sort: { column, direction },
        page: 1,
      };
    });
  };

  const handleToggleColumn = (column: LeadColumn) => {
    if (column === "actions") return;

    clearActiveView();
    setTableState((prev) => {
      const withoutColumn = prev.visibleColumns.includes(column)
        ? prev.visibleColumns.filter((c) => c !== column)
        : [...prev.visibleColumns, column];

      const orderedColumns = LeadColumns.filter((c) =>
        withoutColumn.includes(c),
      );

      return { ...prev, visibleColumns: orderedColumns };
    });
  };

  const handleSearchChange = (value: string) => {
    clearActiveView();
    setTableState((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const handleFilterChange = (value: string) => {
    clearActiveView();
    setTableState((prev) => ({
      ...prev,
      statusFilter: value as LeadsTableState["statusFilter"],
      page: 1,
    }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    clearActiveView();
    setTableState((prev) => ({ ...prev, pageSize, page: 1 }));
  };

  const handleImportLeads = async (rows: LeadAddFormValues[]) => {
    if (rows.length === 0) return;
  
    for (const row of rows) {
      await createLead({
        name: row.name,
        email: row.email,
        company: row.company,
        status: row.status,
        tags: row.tags ?? [],
        phone: row.phone,
        notes: row.notes,
        source: row.source,
      });
    }
  };

  return (
    <LeadsComponent
      filteredLeads={filteredLeads}
      search={tableState.search}
      filter={tableState.statusFilter}
      isLoading={isLoading}
      total={total}
      page={tableState.page}
      pageCount={pageCount}
      pageSize={tableState.pageSize}
      allViews={allViews}
      activeViewId={activeViewId}
      applyView={applyView}
      saveCurrentView={saveCurrentView}
      deleteView={deleteView}
      visibleColumns={tableState.visibleColumns}
      onToggleColumn={handleToggleColumn}
      isModalOpen={isModalOpen}
      formStatus={formStatus}
      editingLead={editingLead}
      sort={tableState.sort}
      onSortChange={handleSortChange}
      onSearchChange={handleSearchChange}
      onFilterChange={handleFilterChange}
      onPageChange={(page) => setTableState((prev) => ({ ...prev, page }))}
      onPageSizeChange={handlePageSizeChange}
      onDelete={handleDelete}
      onAddClick={() => setIsAddOpen(true)}
      onEditClick={setEditingLead}
      onCloseModal={handleCloseModal}
      onCreate={handleCreate}
      onImportLeads={handleImportLeads}
      onUpdate={handleUpdate}
    />
  );
};
