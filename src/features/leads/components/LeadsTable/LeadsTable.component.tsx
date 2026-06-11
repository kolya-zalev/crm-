"use client";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeadsFilter } from "@/features/leads/components/LeadsFilter";
import { Button } from "@/components/ui/button";
import { LeadsSearch } from "@/features/leads/components/LeadsSearch";
import { LeadsTableComponentProps } from "./LeadsTable.types";
import { LeadsStatusBadge } from "../LeadsStatusBadge";
import { EmptyState } from "../EmptyState";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

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
      <div className="flex flex-row items-center gap-2">
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
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`} className="animate-pulse">
                  <TableCell className="p-3">
                    <Skeleton className="mx-auto h-4 w-24 rounded" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="mx-auto h-4 w-36 rounded" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="mx-auto h-4 w-28 rounded" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="mx-auto h-4 w-20 rounded" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="mx-auto h-6 w-16 rounded-full" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="mx-auto h-4 w-8 rounded" />
                  </TableCell>
                  <TableCell className="p-3">
                    <div className="flex flex-row justify-center gap-1">
                      <Skeleton className="h-8 w-8 rounded-xl" />
                      <Skeleton className="h-8 w-8 rounded-xl" />
                      <Skeleton className="h-8 w-8 rounded-xl" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="p-0 text-center">
                  <EmptyState />
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="transition-colors hover:bg-gray-50/50"
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
                    {lead.tags && lead.tags.length > 0
                      ? lead.tags.join(", ")
                      : "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-row justify-center gap-1">
                      <Button
                        variant="ghost"
                        className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-gray-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditClick(lead);
                        }}
                      >
                        <AiFillEdit size={16} />
                      </Button>
                      <Link href={`/lead/${lead.id}`}>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-gray-200"
                        >
                          <GrView size={16} />
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-red-100 hover:text-red-600"
                          >
                            <MdDelete size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Lead?</AlertDialogTitle>
                            <AlertDialogDescription>
                              {lead.name} will be permanently removed.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async () => {
                                await onDelete(lead.id);
                                toast.success(
                                  "Lead has been deleted successfully",
                                );
                              }}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
