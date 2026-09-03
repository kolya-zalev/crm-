"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Lead } from "@/types";
import { LeadsTableRowActions } from "../../LeadsTable/components/LeadsTableRowActions";
import { GetLeadsDataTableColumnsParams } from "../LeadsDataTable.types";
import { formatLeadTags } from "../../LeadsTable/utils/LeadsTable.utils";
import { LeadsStatusBadge } from "../../LeadsStatusBadge/LeadsStatusBadge.component";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const getLeadsDataTableColumns = ({
  onEditClick,
  onDelete,
}: GetLeadsDataTableColumnsParams): ColumnDef<Lead>[] => [
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{row.original.name}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div className="text-sm text-gray-500">{row.original.email}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "phone",
    id: "phone",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div className="text-sm text-gray-500">{row.original.phone}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "company",
    id: "company",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Company
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm text-gray-500">{row.original.company}</div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    id: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm text-gray-500">
          <LeadsStatusBadge status={row.original.status} />
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "tags",
    id: "tags",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tags
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm text-gray-500">
          {formatLeadTags(row.original.tags)}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "assigned",
    id: "assigned",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Assigned
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm text-gray-500">
          {row.original.assignedTo?.name ?? "Unassigned"}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return (
        <LeadsTableRowActions
          lead={row.original}
          onEditClick={onEditClick}
          onDelete={onDelete}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
