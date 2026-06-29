"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LeadsFilter } from "@/features/leads/components/LeadsFilter";
import { LeadsSearch } from "@/features/leads/components/LeadsSearch";
import { EmptyState } from "../EmptyState";
import { LeadsTableComponentProps } from "./LeadsTable.types";
import { LeadsTableRow } from "./components/LeadsTableRow/LeadsTableRow.component";
import { LeadsTableSkeleton } from "./components/LeadsTableSkeleton/LeadsTableSkeleton.component";

export function LeadsTableComponent({
  leads,
  search,
  filter,
  isLoading,
  onSearchChange,
  onFilterChange,
  onDelete,
  onAddClick,
  onEditClick,
}: LeadsTableComponentProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <LeadsSearch value={search} onChange={onSearchChange} />
        <LeadsFilter value={filter} onChange={onFilterChange} />
        <p className="ml-auto p-2 text-sm font-medium text-gray-600">
          Total Leads: {isLoading ? "..." : leads.length}
        </p>
        <Button
          className="cursor-pointer rounded-xl bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600"
          onClick={onAddClick}
        >
          Add Lead
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm">
        <Table className="border-collapse text-base">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-center font-semibold text-gray-700">
                Name
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-700">
                Email
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-700">
                Phone
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-700">
                Company
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-700">
                Status
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-700">
                Tags
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-700">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
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
}
