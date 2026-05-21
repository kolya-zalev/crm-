"use client";

import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeadsTableComponentProps } from "./LeadsTable.types";
import { LeadsStatusBadge } from "../LeadsStatusBadge";


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
}: LeadsTableComponentProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 items-center">
        <Input
          className="rounded-xl w-64 max-w-xs border border-black"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
        />
        <Select value={filter} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full max-w-48 rounded-xl border border-black">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="won">Won</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="p-2 ml-auto font-medium">Total Leads: {leads.length}</p>
        <Button
          className="rounded-xl bg-blue-300 hover:bg-blue-500 shadow-xl cursor-pointer"
          onClick={() => console.log("Add Lead")}
        >
          Add Lead
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-gray-500">
          <Badge className="text-xs" variant="secondary">
            <Spinner data-icon="inline-start" />
            Loading leads...
          </Badge>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-300 overflow-hidden shadow-sm">
          <Table className="text-base border-collapse">
            <TableHeader className="bg-gray-200">
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
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-8 text-center text-gray-500 font-medium"
                  >
                    No leads found
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
                      {lead.tags.length > 0 ? lead.tags.join(", ") : "—"}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-row gap-1 justify-center">
                        <Button
                          className="cursor-pointer rounded-xl bg-white-700 hover:bg-gray-300 text-black h-6 p-1"
                          onClick={() => console.log("edit", lead.id)}
                        >
                          <AiFillEdit />
                        </Button>
                        <Button
                          className="cursor-pointer rounded-xl bg-white-700 hover:bg-gray-300 text-black h-6 p-1"
                          onClick={() => onView(lead.id)}
                        >
                          <GrView />
                        </Button>
                        <Button
                          className="cursor-pointer rounded-xl bg-white-700 hover:bg-gray-300 text-black h-6 p-1"
                          onClick={() => onDelete(lead.id)}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog onOpenChange={onCloseView} open={selectedLead !== null}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>
              <div className="flex flex-col ">
                Name: {selectedLead?.name}
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4 text-base">
            <span>Email: {selectedLead?.email}</span>
            <span>Phone: {selectedLead?.phone}</span>
            <span>Company: {selectedLead?.company}</span>
            <span>
              <Badge variant="outline">Status: {selectedLead?.status}</Badge>
            </span>
            <span> Tags: {selectedLead?.tags.join(", ")}</span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
