"use client";

import { LeadsTableComponentProps } from "./LeadsTable.types";
import { EmptyState } from "../EmptyState";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { LeadsTableSkeleton } from "./components/LeadsTableSkeleton";
import { LeadsTableRow } from "./components/LeadsTableRow";
import { LeadsTableHeader } from "./components/LeadsTableHeader/LeadsTableHeader.component";
import { LeadsTableToolbar } from "./components/LeadsTableToolbar/LeadsTableToolbar.component";

export const LeadsTableComponent = ({
  leads,
  search,
  filter,
  isLoading,
  onSearchChange,
  onFilterChange,
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
        leads={leads}
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
        onAddClick={onAddClick}
      />

      <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm">
        <Table className="border-collapse text-base">
          <LeadsTableHeader />
          <TableBody className="divide-y divide-gray-300 bg-white">
            {isLoading ? (
              <LeadsTableSkeleton />
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="p-0 text-center">
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
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
