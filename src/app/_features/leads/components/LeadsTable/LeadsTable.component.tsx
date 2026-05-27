"use client";

import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeadViewModal } from "@/app/_features/leads/components/LeadsModal/LeadViewModal";
import { LeadsFilter } from "@/app/_features/leads/components/LeadsFilter";
import { Button } from "@/components/ui/button";
import { LeadsSearch } from "@/app/_features/leads/components/LeadsSearch";
import { LeadsTableComponentProps } from "./LeadsTable.types";
import { LeadsStatusBadge } from "../LeadsStatusBadge";
import { EmptyState } from "../EmptyState";

export default function LeadsTableComponent({
  leads,
  search,
  filter,
  isLoading,
  onSearchChange,
  onFilterChange,
  onDelete,
  selectedLead,
  onView,
  onCloseView,
  onAddClick,
  onEditClick
}: LeadsTableComponentProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 items-center">
        <LeadsSearch value={search} onChange={onSearchChange} />
        <LeadsFilter value={filter} onChange={onFilterChange} />
        <p className="p-2 ml-auto font-medium text-sm text-gray-600">
          Total Leads: {isLoading ? "..." : leads.length}
        </p>
        <Button
          className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-md cursor-pointer transition-colors"
          onClick={onAddClick}
        >
          Add Lead
        </Button>
      </div>

      <div className="rounded-xl border border-gray-300 overflow-hidden shadow-sm">
        <Table className="text-base border-collapse">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-center font-semibold text-gray-700">Name</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Email</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Phone</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Company</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Status</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Tags</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-300 bg-white">
            
           
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`} className="animate-pulse">
                  <TableCell className="p-3"><Skeleton className="h-4 w-24 mx-auto rounded" /></TableCell>
                  <TableCell className="p-3"><Skeleton className="h-4 w-36 mx-auto rounded" /></TableCell>
                  <TableCell className="p-3"><Skeleton className="h-4 w-28 mx-auto rounded" /></TableCell>
                  <TableCell className="p-3"><Skeleton className="h-4 w-20 mx-auto rounded" /></TableCell>
                  <TableCell className="p-3"><Skeleton className="h-6 w-16 mx-auto rounded-full" /></TableCell>
                  <TableCell className="p-3"><Skeleton className="h-4 w-8 mx-auto rounded" /></TableCell>
                  <TableCell className="p-3">
                    <div className="flex flex-row gap-1 justify-center">
                      <Skeleton className="h-8 w-8 rounded-xl" />
                      <Skeleton className="h-8 w-8 rounded-xl" />
                      <Skeleton className="h-8 w-8 rounded-xl" />
                    </div>
                  </TableCell>
                </TableRow>
              )) 
            ) : 
            
          
            leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center p-0">
                  <EmptyState />
                </TableCell>
              </TableRow>
            ) : (
              
             
              leads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell className="text-center font-medium text-gray-900">
                    {lead.name}
                  </TableCell>
                  <TableCell className="text-center text-gray-600">
                    {lead.email}
                  </TableCell>
                  <TableCell className="text-center text-gray-600">
                    {lead.phone}
                  </TableCell>
                  <TableCell className="text-center text-gray-600">
                    {lead.company}
                  </TableCell>
                  <TableCell className="text-center">
                    <LeadsStatusBadge status={lead.status} />
                  </TableCell>
                  <TableCell className="text-center text-gray-600">
                    {lead.tags && lead.tags.length > 0 ? lead.tags.join(", ") : "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-row gap-1 justify-center">
                      <Button
                        variant="ghost"
                        className="cursor-pointer rounded-xl hover:bg-gray-200 text-black h-8 w-8 p-0"
                        onClick={() => onEditClick()}
                      >
                        <AiFillEdit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        className="cursor-pointer rounded-xl hover:bg-gray-200 text-black h-8 w-8 p-0"
                        onClick={() => onView(lead.id)}
                      >
                        <GrView size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        className="cursor-pointer rounded-xl hover:bg-red-100 hover:text-red-600 text-black h-8 w-8 p-0"
                        onClick={() => onDelete(lead.id)}
                      >
                        <MdDelete size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <LeadViewModal lead={selectedLead} onClose={onCloseView} />
    </div>
  );
}