"use client";

import { Table, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LeadsFilter } from "@/features/leads/components/LeadsFilter/LeadsFilter";
import { LeadsSearch } from "@/features/leads/components/LeadsSearch/LeadsSearch";
import { LeadsTableComponentProps } from "./LeadsTable.types";
import { LeadsTableSkeleton } from "./components/LeadsTableSkeleton/LeadsTableSkeleton.component";
import {
  getLeadsDataTableColumns,
  LeadsDataTableContainer,
} from "../LeadsDataTable";
import { useMemo } from "react";
import { leadsLoading } from "./utils/LeadsLoading.utils";

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
  const columns = useMemo(
    () => getLeadsDataTableColumns({ onEditClick, onDelete }),
    [onEditClick, onDelete],
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <LeadsSearch value={search} onChange={onSearchChange} />
        <LeadsFilter value={filter} onChange={onFilterChange} />
        <p className="ml-auto p-2 text-sm font-medium text-gray-600">
          Total Leads: {leadsLoading(isLoading, leads)}
        </p>
        <Button
          className="cursor-pointer rounded-xl bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600"
          onClick={onAddClick}
        >
          Add Lead
        </Button>
      </div>

      {isLoading ? (
        <Table>
          <TableBody>
            <LeadsTableSkeleton />
          </TableBody>
        </Table>
      ) : (
        <LeadsDataTableContainer data={leads} columns={columns} />
      )}
    </div>
  );
}
