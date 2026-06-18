"use client";

import { LeadsTableComponentProps } from "./LeadsTable.types";
import { EmptyState } from "../EmptyState";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { LeadsTableSkeleton } from "./components/LeadsTableSkeleton";
import { LeadsTableRow } from "./components/LeadsTableRow";
import { LeadsTableHeader } from "./components/LeadsTableHeader/LeadsTableHeader.component";
import { LeadsTableToolbar } from "./components/LeadsTableToolbar/LeadsTableToolbar.component";
import { LeadsTablePagination } from "./components/LeadsTablePagination/LeadsTablePagination.component";
export const LeadsTableComponent = ({
  leads,
  search,
  filter,
  isLoading,
  total,
  page,
  pageCount,
  pageSize,
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
}: LeadsTableComponentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <LeadsTableToolbar
        search={search}
        filter={filter}
        isLoading={isLoading}
        total={total}
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
        onAddClick={onAddClick}
        visibleColumns={visibleColumns}
        onToggleColumn={onToggleColumn}
        allViews={allViews}
        activeViewId={activeViewId}
        applyView={applyView}
        saveCurrentView={saveCurrentView}
        deleteView={deleteView}
      />

      <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm">
        <Table className="border-collapse text-base">
          <LeadsTableHeader sort={sort} onSortChange={onSortChange} visibleColumns={visibleColumns} />
          <TableBody className="divide-y divide-gray-300 bg-white">
            {isLoading ? (
              <LeadsTableSkeleton columnCount={visibleColumns.length} />
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length} className="p-0 text-center">
                  <EmptyState />
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <LeadsTableRow
                  key={lead.id}
                  lead={lead}
                  onEditClick={onEditClick}
                  onDelete={onDelete}
                  visibleColumns={visibleColumns}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <LeadsTablePagination
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        total={total}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};
